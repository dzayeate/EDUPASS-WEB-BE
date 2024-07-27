const { StatusCodes } = require('http-status-codes');
const schema = require('../../schemas/validations/competition/competitionSubmission');
const BaseError = require('../../schemas/responses/BaseError');
const { CompetitionSubmission, CompetitionRegistration } = require('../../models');

const SubmissionCompetition = async (body) => {
  // Validate the request body
  const { error, value } = schema.validate(body);
  if (error) {
    throw new BaseError({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }

  const { registrationId, url } = value;

  // Check if the registration exists
  const registration = await CompetitionRegistration.findByPk(registrationId);
  if (!registration) {
    throw new BaseError({
      status: StatusCodes.NOT_FOUND,
      message: 'Registration not found',
    });
  }

  // Create a new CompetitionSubmission
  const submission = await CompetitionSubmission.create({
    registrationId,
    url,
  });

  return {
    id: submission.id,
    registrationId: submission.registrationId,
    url: submission.url,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
  };
};

module.exports = SubmissionCompetition;
