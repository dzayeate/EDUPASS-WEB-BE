/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: create new user
 *     tags: [User]
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
 *     responses:
 *       200:
 *         description: User baru berhasil dibuat
 *
 *       500:
 *         description: Internal Server Error
 * 
 */
