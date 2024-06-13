const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const resetPassword = async (token) => {
    //verify token 
    const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
    //check if token expired
    if (tokenVerified.expiredAt < Date.now()) {
        throw new BaseError({
          status: StatusCodes.BAD_REQUEST,
          message: 'Token expired'
        });
      }
    //get user data by id
    const user = await User.findOne({
      where: {
        id: tokenVerified.id
      }
    });
    
    //check if user exist
    if (!user) {
      throw new BaseError({
        status: StatusCodes.NOT_FOUND,
        message: 'User not found'
      });
    }
    
    //return data user dan data forgotPassword token
    return {
      user,
      token
    }
  };
  module.exports = resetPassword;
  