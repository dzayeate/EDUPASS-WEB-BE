const { Role, User } = require('../../models');
const schema = require('../../schemas/validations/user/change-role');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../../schemas/responses/BaseError');

const ChangeRole = async(body) => {
    const validateBody = schema.validate(body);
    if(validateBody.error) {
        throw new BaseError({
            status: StatusCodes.BAD_REQUEST,
            message: validateBody.error.message,
        });
    }

    try {
        const user = await User.findByPk(body.userId);
        if (!user) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: 'User not found',
            });
        }

        const newRole = await Role.getIdByName(body.roleName);
        if (!newRole) {
            throw new BaseError({
                status: StatusCodes.NOT_FOUND,
                message: 'Role not found',
            });
        }

        user.roleId = newRole.id;
        await user.save();
        return user;
    } catch (error) {
        const status = error?.status || StatusCodes.INTERNAL_SERVER_ERROR;
        throw new BaseError({
            status: status,
            message: error.message,
        });
    }
}

module.exports = ChangeRole;
