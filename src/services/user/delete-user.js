const { User } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../schemas/responses/BaseError");

const DeleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new BaseError({
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
      });
    }

    const biodata = await user.getBiodate();
    await user.destroy({
      where: {
        user,
      }
    });

    await biodata.destroy({
      where: {
        biodata,
      }
    });

    return { message: "User deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = DeleteUser;
