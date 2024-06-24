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
 * @swagger
 *
 * /user/update-biodate:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: update biodate
 *     tags: [User]
 *     parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id biodata
 *            example: 1
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
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
 */
