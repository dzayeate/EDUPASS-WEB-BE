const { Role, User } = require('../../models');
const schema = require('../../schemas/validations/user/change-role');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');

const ChangeRole = async (userId, body) => {
    const { error, value } = schema.validate(body);
    if (error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: error.message,
        });
    }

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: 'User not found',
            });
        }

        const newRole = await Role.findOne({ where: { name: value.roleName } });
        if (!newRole) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: 'Role not found',
            });
        }

        user.roleId = newRole.id;
        user.isVerified = false;
        user.requestedRole = value.roleName;
        await user.save();

        return user;
    } catch (error) {
        throw new BaseError({
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message || 'Internal Server Error',
        });
    }
};

module.exports = ChangeRole;
