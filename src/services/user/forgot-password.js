const jwt = require('jsonwebtoken');
const BaseError = require('../../schemas/responses/BaseError');
const { StatusCodes } = require('http-status-codes');
const schema = require('../../schemas/validations/user/forgot-password');
const { User, forgotPassword } = require('../../models');
const transporter = require('../../utils/mailer');

const forgotPass = async (body) => {
    const { error, value } = schema.validate(body);
    if (error) {
        throw new BaseError('Validation error', StatusCodes.BAD_REQUEST, error.details[0].message);
    }

    const { email } = value;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new BaseError('User not found', StatusCodes.NOT_FOUND);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: '10m'
        });

        await forgotPassword.create({
            userId: user.id,
            email: user.email,
            token: token,
            expiredAt: new Date(Date.now() + 600000)
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: 'Reset Password',
            html: `
            <h1>Reset Password</h1>
            <p>Klik link berikut untuk reset password, link ini hanya berlaku untuk 10 menit sebelum kadaluarsa</p>
            <a href="http://localhost:3000/user/reset-password/${token}">Reset Password</a>
            `
        });

        return {
            status: 200,
            message: 'Email sent'
        }
    } catch (error) {
        throw new BaseError({
            status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        });
    }
};

module.exports = forgotPass;
