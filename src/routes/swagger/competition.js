/**
 * @swagger
 *
 * /competition/register-competition-eo:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Register competition by EO
 *     tags: [Competitions]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               competitionId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the competition
 *                 example: 3ccbb87c-cbcf-4cab-8851-cc27310dee0e
 *               domicile:
 *                 type: string
 *                 description: Domicile of the user
 *                 example: Jakarta
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *                 example: 081888772233
 *               supportingDocuments:
 *                 type: string
 *                 format: binary
 *                 description: Supporting documents for the registration
 *               isTeam:
 *                 type: boolean
 *                 description: Indicates if the competition is for a team
 *               teamSize:
 *                 type: integer
 *                 description: Size of the team if isTeam is true
 *                 example: 1
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the team member
 *                       example: e630673e-f91f-4c9a-bca6-250c7cbcf542
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User or Competition not found
 *       500:
 *         description: Internal Server Error
 * 
 * 
 * /competition/findCompetition:
 *   get:
 *     summary: Get Competition
 *     tags: [Competitions]
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
 *        description: search with keyword competition name
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
 *
 */