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
 *                              description: confirm password user 
 *                              type: string
 *                              example: Admin
 *                          firstName:
 *                              description: your first name
 *                              type: string 
 *                              example: "John"
 *                          lastName:
 *                              description: your last name
 *                              type: string 
 *                              example: "Doe"
 *                          birthDate:
 *                              description: your birth date
 *                              type: Date
 *                              example: "2000-01-01"
 *                          gender:
 *                              description: your gender
 *                              type: string 
 *                              example: "Laki_laki"
 *                          phone:
 *                             description: your phone number
 *                             type: string
 *                             example: "08123456789"
 *                          address:
 *                             description: your address
 *                             type: string
 *                             example: "Jalan Jendral Sudirman No 1"
 *                          province:
 *                              description: province where your city is located
 *                              type: string 
 *                              example: "Jawa Barat"
 *                          regencies:
 *                              description: city where you live
 *                              type: string 
 *                              example: "Bandung"
 *                          image:
 *                              description: file to upload
 *                              type: file
 *                          institutionName:
 *                              description: your institution where you study or work
 *                              type: string 
 *                              example: "Universitas Pasundan"
 *                          field:
 *                              description: your focus on the study field
 *                              type: string 
 *                              example: "Teknik Informatika"
 *                          pupils:
 *                              description: your unique ID number
 *                              type: string 
 *                              example: "203040111"
 *                          proof:
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
 * /auth/logout:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: change password for user
 *      tags: [Auth]
 *      responses:
 *          200:
 *              description: login token
 *
 *          500:
 *              description: Some server error
 */
