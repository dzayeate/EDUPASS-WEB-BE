class BaseResponse {
  status;
  message;
  data;

  constructor(param) {
      this.status = param?.status;
      this.message = param?.message;
      this.data = param?.data;
  }
}

module.exports = BaseResponse;
