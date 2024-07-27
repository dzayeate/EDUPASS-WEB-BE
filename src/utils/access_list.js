const ROLE = require("../schemas/enums/role");

module.exports = [
  // GET
  {
    path: '/user/mahasiswa',
    method: 'GET',
    allowed_role: [ROLE.Siswa]
  },
  // POST
  {
    path: '/user/change-role',
    method: 'POST',
    allowed_role: [ROLE.Admin]
  },
  {
    path: '/competition/registerCompetition',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/register/peserta',
    method: 'POST',
    allowed_role: [ROLE.Siswa, ROLE.Umum, ROLE.Mahasiswa]
  },
  {
    path: '/competition/schedule',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/submission',
    method: 'POST',
    allowed_role: [ROLE.Umum]
  },
  // PUT/PATCH
  {
    path: '/competition/updateScheduleCompetition/:id',
    method: 'PUT',
    allowed_role: [ROLE.EO]
  },
  // DELETE
  {
    path: '/user/delete-user/:userId',
    method: 'DELETE',
    allowed_role: [ROLE.Admin]
  },
  {
    path: '/competition/deleteScheduleCompetition/:id',
    method: 'DELETE',
    allowed_role: [ROLE.EO]
  }
]
