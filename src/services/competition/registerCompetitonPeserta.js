const fs = require('fs');
const path = require('path');
const schema = require('../../schemas/validations/competition/registerCompetitonPeserta');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');
const { User, Competition, CompetitionRegistration, CompetitionTeam, sequelize } = require('../../models');

const registerCompetitionPeserta = async (userId, body, files) => {
    const validateBody = schema.validate(body, { abortEarly: false });

    if (validateBody.error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: validateBody.error.details.map(detail => detail.message).join(', '),
        });
    }

    const {
        competitionId,
        nameTeam,
        domicile,
        phoneNumber,
        isTeam,
        teamSize,
        teamMembers
    } = validateBody.value;


    if (isTeam && teamMembers && teamMembers.length !== teamSize) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: `Team size (${teamSize}) does not match the number of team members (${teamMembers.length})`,
        });
    }

    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: "User tidak ditemukan",
            });
        }

        const competition = await Competition.findByPk(competitionId);
        if (!competition) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: "Kompetisi tidak ditemukan",
            });
        }

        let validUsers = [];

        if (isTeam && teamMembers && teamMembers.length > 0) {
            const emails = teamMembers.map(member => member.email);
            validUsers = await User.findAll({
                where: {
                    email: emails
                }
            });

            if (validUsers.length !== emails.length) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: "One or more team members do not exist",
                });
            }
        }

        const supportingDocumentFile = files && files['supportingDocuments'] ? files['supportingDocuments'][0] : null;
        const supportingDocumentFileName = supportingDocumentFile ? supportingDocumentFile.filename : null;

        const competitionRegistration = await CompetitionRegistration.create({
            userId,
            competitionId,
            nameTeam,
            domicile,
            phoneNumber,
            supportingDocuments: supportingDocumentFileName,
            isTeam,
            teamSize
        }, { transaction });

        if (isTeam && teamMembers && teamMembers.length > 0) {
            const teamData = teamMembers.map(member => {
                const validUser = validUsers.find(user => user.email === member.email);
                return {
                    registrationId: competitionRegistration.id,
                    userId: validUser.id
                };
            });
            await CompetitionTeam.bulkCreate(teamData, { transaction });
        }

        await transaction.commit();

        return {
            status: StatusCodes.CREATED,
            message: "Pendaftaran berhasil",
            data: competitionRegistration,
        };
    } catch (error) {
        await transaction.rollback();

        if (files && files['supportingDocuments']) {
            const supportingDocumentFileName = files['supportingDocuments'][0].filename;
            if (supportingDocumentFileName) {
                const filePath = path.join(__dirname, '../../../documents/competitions', supportingDocumentFileName);
                fs.unlinkSync(filePath);
            }
        }

        throw new BaseError({
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

module.exports = registerCompetitionPeserta;
