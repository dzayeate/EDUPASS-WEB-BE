class BaseError extends Error {
  constructor(param) {
    super(param?.message);
    this.status = param?.status || 500;
  }
}

module.exports = BaseError;
