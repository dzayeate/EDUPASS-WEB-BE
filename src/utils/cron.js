const cron = require('node-cron');
const { Op } = require('sequelize');
const { forgotPassword } = require('../models');

const forgotPasswordJob = cron.schedule('*/10 * * * *', async () => {
    const now = Date.now();
    try {
        const result = await forgotPassword.destroy({
            where: {
                expiredAt: {
                    [Op.lt]: now
                }
            }
        });
        if (result > 0) {
            console.log('Expired token deleted');
        }else {
            console.log('No expired token found');
        };
    } catch (error) {
        console.error(error);
    }
});

module.exports = {forgotPasswordJob};