/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create new user
 *     tags: [Auth]
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: user email 
 *                              type: string
 *                              example: test@gmail.com
 *                          password:
 *                              description: user password 
 *                              type: string
 *                              example: test123
 *                          confirmPassword:
 *                              description: confirm password user 
 *                              type: string
 *                              example: test123
 *                          roleName:
 *                              description: name of the role to be assigned to the user
 *                              type: string 
 *                              example: "Siswa"
 *                          firstName:
 *                              description: your first name
 *                              type: string 
 *                              example: "John"
 *                          lastName:
 *                              description: your last name
 *                              type: string 
 *                              example: "Doe"
 *                          nik:
 *                              description: your unique ID number
 *                              type: string 
 *                              example: "3220223332221145"
 *                          institutionName:
 *                              description: your institution where you study or work
 *                              type: string 
 *                              example: "Universitas Pasundan"
 *                          institutionLevel:
 *                              description: your level of study or position at your institution
 *                              type: string 
 *                              example: "3rd semester"
 *                          province:
 *                              description: province where your city is located
 *                              type: string 
 *                              example: "Jawa Barat"
 *                          regencies:
 *                              description: city where you live
 *                              type: string 
 *                              example: "Bandung"
 *                          studyField:
 *                              description: your focus on the study field
 *                              type: string 
 *                              example: "Teknik Informatika"
 *                          reason:
 *                              description: reason why you registered in this application
 *                              type: string 
 *                              example: "Saya ingin belajar lebih banyak tentang pemrograman"
 *                          image:
 *                              description: file to upload
 *                              type: file
 *     responses:
 *       200:
 *         description: User baru berhasil dibuat
 *
 *       500:
 *         description: Internal Server Error
 *
 * /auth/login:
 *   post:
 *      summary: login for user
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: username user or user phone number
 *                              type: string
 *                              example: test@gmail.com
 *                          password:
 *                              description: user password
 *                              type: string
 *                              example: test123
 *      responses:
 *          200:
 *              description: login token
 *
 *          500:
 *              description: Some server error
 *
 */
