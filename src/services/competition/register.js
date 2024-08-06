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
        console.log("Validation error: ", error.details[0].message); // Log validation error
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: error.details[0].message,
        });
    }

    const {
        name,
        description,
        startDate,
        endDate,
        category,
        startTime,
        endTime,
        location,
        platform,
        mentors = [],
        sponsors = [],
    } = value;

    const bannerFile = files && files['banner'] ? files['banner'][0] : null;
    const thumbnailFile = files && files['thumbnail'] ? files['thumbnail'][0] : null;

    const transaction = await sequelize.transaction();

    try {
        const organizer = user;

        console.log("Organizer: ", organizer); // Log organizer

        let bannerFileName;
        if (bannerFile) {
            bannerFileName = bannerFile.filename;
            console.log("Banner file name: ", bannerFileName); // Log banner file name
        }

        let thumbnailFileName;
        if (thumbnailFile) {
            thumbnailFileName = thumbnailFile.filename;
            console.log("Thumbnail file name: ", thumbnailFileName); // Log thumbnail file name
        }

        const competition = await Competition.create({
            banner: bannerFileName,
            thumbnail: thumbnailFileName,
            name,
            description,
            startDate,
            endDate,
            category,
            startTime,
            endTime,
            location,
            platform,
        }, { transaction });

        console.log("Competition created: ", competition); // Log competition

        await CompetitionOrganizer.create({
            competitionId: competition.id,
            userId: organizer.id,
        }, { transaction });

        console.log("Competition organizer created"); // Log competition organizer

        if (Array.isArray(mentors) && mentors.length > 0) {
            const mentorUsers = await User.findAll({
                where: {
                    email: {
                        [Op.in]: mentors
                    }
                },
                transaction
            });

            console.log("Mentor users: ", mentorUsers); // Log mentor users

            if (mentorUsers.length !== mentors.length) {
                console.log("Some mentors were not found."); // Log missing mentors
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

            console.log("Competition mentors created"); // Log competition mentors
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

            console.log("Sponsor users: ", sponsorUsers); // Log sponsor users

            if (sponsorUsers.length !== sponsors.length) {
                console.log("Some sponsors were not found."); // Log missing sponsors
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

            console.log("Competition sponsors created"); // Log competition sponsors
        }

        await transaction.commit();
        return competition;
    } catch (error) {
        await transaction.rollback();

        console.log("Error occurred, rolling back transaction: ", error); // Log error

        if (bannerFile && bannerFile.filename) {
            const bannerFilePath = path.join(__dirname, '../../../public/images/banners', bannerFile.filename);
            if (fs.existsSync(bannerFilePath)) {
                fs.unlinkSync(bannerFilePath);
                console.log("Banner file removed: ", bannerFilePath); // Log banner file removal
            }
        }

        if (thumbnailFile && thumbnailFile.filename) {
            const thumbnailFilePath = path.join(__dirname, '../../../public/images/thumbnails', thumbnailFile.filename);
            if (fs.existsSync(thumbnailFilePath)) {
                fs.unlinkSync(thumbnailFilePath);
                console.log("Thumbnail file removed: ", thumbnailFilePath); // Log thumbnail file removal
            }
        }

        throw error;
    }
};

module.exports = RegisterCompetition;
