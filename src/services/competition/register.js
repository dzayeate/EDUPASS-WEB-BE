const { Competition, CompetitionMentor, CompetitionOrganizer, sequelize, User, Sponsor, CompetitionSponsor } = require("../../models");
const schema = require("../../schemas/validations/competition/register");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const RegisterCompetition = async (body, user, files) => {
    const { error, value } = schema.validate(body);
    if (error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: error.details[0].message,
        });
    }

    const {
        name,
        description,
        date,
        category,
        time,
        location,
        platform,
        mentors = [],
        sponsors = [],
    } = value;

    const bannerFile = files && files['banner'] ? files['banner'][0] : null;

    const transaction = await sequelize.transaction();

    try {
        const organizer = user;

        let bannerFileName;
        if (bannerFile) {
            bannerFileName = bannerFile.filename;
        }

        const competition = await Competition.create({
            banner: bannerFileName,
            name,
            description,
            date,
            category,
            time,
            location,
            platform,
        }, { transaction });

        await CompetitionOrganizer.create({
            competitionId: competition.id,
            userId: organizer.id,
        }, { transaction });

        if (Array.isArray(mentors) && mentors.length > 0) {
            const mentorUsers = await User.findAll({
                where: {
                    email: {
                        [Op.in]: mentors
                    }
                },
                transaction
            });

            if (mentorUsers.length !== mentors.length) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Some mentors were not found.',
                });
            }

            const mentorRecords = mentorUsers.map(mentor => ({
                competitionId: competition.id,
                userId: mentor.id,
            }));
            await CompetitionMentor.bulkCreate(mentorRecords, { transaction });
        }

        if (Array.isArray(sponsors) && sponsors.length > 0) {
            const sponsorUsers = await User.findAll({
                where: {
                    email: {
                        [Op.in]: sponsors
                    }
                },
                transaction
            });

            if (sponsorUsers.length !== sponsors.length) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Some sponsors were not found.',
                });
            }

            const sponsorRecords = sponsorUsers.map(sponsor => ({
                competitionId: competition.id,
                userId: sponsor.id,
            }));
            await Sponsor.bulkCreate(sponsorRecords, { transaction });
        }

        await transaction.commit();
        return competition;
    } catch (error) {
        await transaction.rollback();

        if (bannerFile && bannerFile.filename) {
            const bannerFilePath = path.join(__dirname, '../../../public/images/banners', bannerFile.filename);
            if (fs.existsSync(bannerFilePath)) {
                fs.unlinkSync(bannerFilePath);
            }
        }

        throw error;
    }
};

module.exports = RegisterCompetition;
