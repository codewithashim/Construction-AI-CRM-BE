/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - projectName
 *         - address
 *         - city
 *         - location
 *         - startDate
 *         - endDate
 *         - partiesInvolved
 *         - client
 *       properties:
 *         projectName:
 *           type: string
 *           description: The name of the project
 *         address:
 *           type: string
 *           description: The address of the project
 *         city:
 *           type: string
 *           description: The city where the project is located
 *         location:
 *           type: string
 *           description: Specific location details of the project
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the project (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the project (YYYY-MM-DD)
 *         partiesInvolved:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs of parties involved in the project
 *         client:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the client
 *             mobileNumber:
 *               type: string
 *               description: Mobile number of the client
 *             company:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Name of the client's company
 *                 address:
 *                   type: string
 *                   description: Address of the client's company
 *                 gstNumber:
 *                   type: string
 *                   description: GST number of the client's company
 * 
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for project name, city, or client name
 *       - in: query
 *         name: projectName
 *         schema:
 *           type: string
 *         description: Filter by project name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 * 
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *   patch:
 *     summary: Update a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 */