/**
 * @swagger
 *
 * /competition/findCompetition:
 *   get:
 *     security:
 *      - bearerAuth: []
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
 *        description: search with keyword competition id ,name, description, date, category, time, location, platform
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
 * /competition/findCompetitionRegistration:
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
 *        description: search with keyword competition id, domicile and phone
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
 * /competition/findScheduleCompetition:
 *   get:
 *     summary: Get Schedule Competition
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
 *        description: search with keyword competition name, category
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
 * /competition/registerCompetition:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register a new competition
 *     tags: [Competitions]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: The competition banner
 *               name:
 *                 type: string
 *                 description: Competition name
 *                 example: "Programming Challenge"
 *               description:
 *                 type: string
 *                 description: Competition description
 *                 example: "A challenge for coding enthusiasts."
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Competition date
 *                 example: 2024-07-20
 *               category:
 *                 type: string
 *                 description: Competition category
 *                 example: web
 *               time:
 *                 type: string
 *                 format: time
 *                 description: Competition time
 *                 example: "14:00"
 *               location:
 *                 type: string
 *                 description: Competition location
 *                 example: "Jakarta"
 *               platform:
 *                 type: string
 *                 description: Competition platform
 *                 example: "Zoom"
 *               mentors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of mentor emails
 *               sponsors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of sponsor emails
 *     responses:
 *       201:
 *         description: Competition registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 * 
 * /competition/schedule:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Schedule a competition
 *     tags: [Competitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the competition
 *                 example: 2024-07-20
 *               name:
 *                 type: string
 *                 description: Name of the competition
 *                 example: "Programming Challenge"
 *               category:
 *                 type: string
 *                 description: Category of the competition
 *                 example: "online"
 *               time:
 *                 type: string
 *                 format: time
 *                 description: Time of the competition
 *                 example: "14:00"
 *               location:
 *                 type: string
 *                 description: Location of the competition
 *                 example: "Jakarta"
 *               description:
 *                 type: string
 *                 description: Description of the competition
 *                 example: "A challenge for coding enthusiasts."
 *               competitionId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the competition
 *                 example: "9f7847ed-2618-439f-a226-4d344ecef2a4"
 *     responses:
 *       200:
 *         description: Schedule created successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Competition not found
 *       500:
 *         description: Internal Server Error
 * 
 * /competition/register/peserta:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Register competition for mahasiswa, siswa, umum
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
 *                 example: 82f8e418-e7c6-4249-b098-80517232afb8
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
 *                 example: 2
 *               teamMembers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description:  List of team members
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User or Competition not found
 *       500:
 *         description: Internal Server Error
 * 
 * /competition/updateScheduleCompetition/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a schedule competition
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule competition id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the competition
 *                 example: 2024-07-20
 *               name:
 *                 type: string
 *                 description: Name of the competition
 *                 example: "Programming Challenge"
 *               category:
 *                 type: string
 *                 description: Category of the competition
 *                 example: "online"
 *               time:
 *                 type: string
 *                 format: time
 *                 description: Time of the competition
 *                 example: "14:00"
 *               location:
 *                 type: string
 *                 description: Location of the competition
 *                 example: "Jakarta"
 *               description:
 *                 type: string
 *                 description: Description of the competition
 *                 example: "A challenge for coding enthusiasts."
 *               competitionId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the competition
 *                 example: "9f7847ed-2618-439f-a226-4d344ecef2a4"
 *     responses:
 *       200:
 *         description: Successfully updated the schedule competition
 *       400:
 *         description: Bad request
 *       404:
 *         description: Competition or schedule competition not found
 *       500:
 *         description: Internal server error
 * 
 * /competition/deleteScheduleCompetition/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a schedule competition
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The schedule competition id
 *     responses:
 *       200:
 *         description: Successfully deleted the schedule competition
 *       404:
 *         description: Schedule competition not found
 *         content:
 *       500:
 *         description: Internal server error
 * 
 */

