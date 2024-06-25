// utils/blacklist.js
const blacklist = new Set();

const addToBlacklist = (token) => {
    blacklist.add(token);
};

const isBlacklisted = (token) => {
    return blacklist.has(token);
};

module.exports = {
    addToBlacklist,
    isBlacklisted,
};
