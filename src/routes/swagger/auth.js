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
 *              application/json:
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
 *                              description: confrim password user 
 *                              type: string
 *                              example: test123
 *                          roleName:
 *                              description: name of the role to be assigned to the user
 *                              type: string 
 *                              example: "Siswa"
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
