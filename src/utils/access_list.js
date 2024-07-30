const ROLE = require("../schemas/enums/role");

module.exports = [
  // GET
  // POST
  {
    path: '/competition/registerCompetition',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/register/peserta',
    method: 'POST',
    allowed_role: [ROLE.Siswa, ROLE.Mahasiswa]
  },
  {
    path: '/competition/schedule',
    method: 'POST',
    allowed_role: [ROLE.EO]
  },
  {
    path: '/competition/submission',
    method: 'POST',
    allowed_role: [ROLE.Siswa, ROLE.Mahasiswa]
  },
  {
    path: '/user/verify-user',
    method: 'POST',
    allowed_role: [ROLE.Admin]
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
