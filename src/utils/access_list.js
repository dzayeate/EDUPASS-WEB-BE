const ROLE = require("../schemas/enums/role");

module.exports = [
  {
    path: '/user/sponsor',
    method: 'GET',
    allowed_role: [ROLE.Sponsor]
  },
  {
    path: '/user/mahasiswa',
    method: 'GET',
    allowed_role: [ROLE.Siswa]
  },
  {
    path: '/user/delete-user/:userId',
    method: 'DELETE',
    allowed_role: [ROLE.Admin]
  }
]
