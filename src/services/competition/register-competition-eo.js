const fs = require('fs');
const path = require('path');
const schema = require('../../schemas/validations/competition/register-competiton-eo');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');
const { User, Competition, CompetitionRegistration, sequelize} = require('../../models')

const registerCompetitionEO = async (userId, body, files) => {
    console.log("Validating request body:", body);
    const validateBody = schema.validate(body, { abortEarly: false });

    if (validateBody.error) {
        console.error("Validation error:", validateBody.error.details);
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: validateBody.error.details.map(detail => detail.message).join(', '),
        });
    }

    const {
        competitionId,
        domicile,
        phoneNumber,
        supportingDocuments,
        isTeam,
        teamSize,
        teamMembers
    } = validateBody.value;

    const transaction = await sequelize.transaction();

    try {
        console.log("Checking user and competition existence");
        const user = await User.findByPk(userId);
        if (!user) {
            console.error("User not found");
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: "User tidak ditemukan",
            });
        }

        const competition = await Competition.findByPk(competitionId);
        if (!competition) {
            console.error("Competition not found");
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: "Kompetisi tidak ditemukan",
            });
        }

        // Validate team members user IDs
        if (isTeam && teamMembers && teamMembers.length > 0) {
            const userIds = teamMembers.map(member => member.userId);
            const validUsers = await User.findAll({
                where: {
                    id: userIds
                }
            });

            if (validUsers.length !== userIds.length) {
                throw new BaseError({
                    status: StatusCodes.BAD_REQUEST,
                    message: "One or more team members do not exist",
                });
            }
        }

        const supportingDocumentFile = files && files['supportingDocuments'] ? files['supportingDocuments'][0] : null;
        const supportingDocumentFileName = supportingDocumentFile ? supportingDocumentFile.filename : null;

        console.log("Creating competition registration");
        const competitionRegistration = await CompetitionRegistration.create({
            userId,
            competitionId,
            domicile,
            phoneNumber,
            supportingDocuments: supportingDocumentFileName,
            isTeam,
            teamSize
        }, { transaction });

        if (isTeam && teamMembers && teamMembers.length > 0) {
            console.log("Adding team members");
            const teamData = teamMembers.map(member => ({
                registrationId: competitionRegistration.id,
                userId: member.userId
            }));
            await CompetitionTeam.bulkCreate(teamData, { transaction });
        }

        await transaction.commit();
        console.log("Competition registration successful");

        return {
            status: StatusCodes.CREATED,
            message: "Pendaftaran berhasil",
            data: competitionRegistration,
        };
    } catch (error) {
        await transaction.rollback();
        console.error("Error during competition registration:", error);

        if (files && files['supportingDocuments']) {
            const supportingDocumentFileName = files['supportingDocuments'][0].filename;
            if (supportingDocumentFileName) {
                const filePath = path.join(__dirname, '../../public/documents', supportingDocumentFileName);
                fs.unlinkSync(filePath);
            }
        }

        throw new BaseError({
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};

module.exports = registerCompetitionEO;
