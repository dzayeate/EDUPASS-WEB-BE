const ROLE = require("../schemas/enums/role");

module.exports = [
  {
    path: '/user/mahasiswa',
    method: 'GET',
    allowed_role: [ROLE.Siswa]
  },
  {
    path: '/user/delete-user/:userId',
    method: 'DELETE',
    allowed_role: [ROLE.Admin]
  },
  {
    path: '/user/change-role',
    method: 'POST',
    allowed_role: [ROLE.Admin]
  },
  {
    path: '/competition/register',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/register/peserta',
    method: 'POST',
    allowed_role: [ROLE.Siswa, ROLE.Mahasiswa, ROLE.Umum]
  },
  {
    path: '/competition/schedule',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/updateScheduleCompetition/:id',
    method: 'PUT',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/deleteScheduleCompetition/:id',
    method: 'DELETE',
    allowed_role: [ROLE.EO]
  }
]
