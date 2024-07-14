const { ScheduleCompetition, sequelize } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");

const DeleteScheduleCompetition = async (id) => {
  const scheduleCompetition = await ScheduleCompetition.findByPk(id);
  if (!scheduleCompetition) {
    throw new BaseError({
      status: StatusCodes.NOT_FOUND,
      message: 'Schedule competition tidak ditemukan'
    });
  }

  const transaction = await sequelize.transaction();

  try {
    await scheduleCompetition.destroy({ transaction });
    await transaction.commit();
    return { message: 'Schedule competition berhasil di hapus' };
  } catch (error) {
    await transaction.rollback();
    throw new BaseError({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Gagal menghapus schedule competition'
    });
  }
};

module.exports = DeleteScheduleCompetition;
