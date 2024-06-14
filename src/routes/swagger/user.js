/**
 * @swagger
 *
 * /user/getUser:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: The page of list
 *        example: 1
 *      - in: query
 *        name: length
 *        required: false
 *        description: The length of list
 *        example: 10
 *      - in: query
 *        name: search
 *        required: false
 *        description: search with keyword user firstname
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal Server Error
 * 
 */

/**
 * @swagger
 *
 * /user/sponsor:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /user/mahasiswa:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /user/change-password:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: change password for user
 *      tags: [Users]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          oldPassword:
 *                              description: old user password
 *                              type: string
 *                              example: test123
 *                          newPassword:
 *                              description: new user password
 *                              type: string
 *                              example: 321test
 *                          confirmPassword:
 *                              description: confirm new password
 *                              type: string
 *                              example: 321test
 *      responses:
 *          200:
 *              description: login token
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf:
 *                              - $ref: '#/components/schemas/BaseResponse'
 *
 *          500:
 *              description: Some server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BaseError'
 * 
 */

/**
 * @swagger
 *
 * /user/sponsor:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /user/mahasiswa:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 *
 * /user/forgot-password:
 *  post:
 *      summary: change password for user
 *      tags: [Users]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              description: email user
 *                              type: string
 *                              example: test@gmail.com
 *      responses:
 *          200:
 *              description: login token
 *
 *          500:
 *              description: Some server error
 * 
 * 
 * /user/reset-password/{token}:
 *  get:
 *      summary: get user data by token
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: token
 *           required: true
 *           description: token from email
 *           type: string
 *      responses:
 *          200:
 *              description: User data and token to manipulate for change password
 *
 *          500:
 *              description: Some server error
 * 
 */
