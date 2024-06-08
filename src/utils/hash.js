const bcrypt = require('bcrypt');

const encryptPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const resultHash = await bcrypt.hash(plainPassword, salt);

  return resultHash;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  const compareResult = await bcrypt.compare(plainPassword, hashedPassword);
  return compareResult;
};

module.exports = {
  encryptPassword,
  comparePassword,
};
