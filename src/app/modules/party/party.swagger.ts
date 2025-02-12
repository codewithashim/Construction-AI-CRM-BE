/**
 * @swagger
 * components:
 *   schemas:
 *     Gst:
 *       type: object
 *       properties:
 *         gst:
 *           type: string
 *         legalBusinessName:
 *           type: string
 *         billingAddress:
 *           type: string
 *     PartyId:
 *       type: object
 *       properties:
 *         prefix:
 *           type: string
 *         sequence:
 *           type: number
 *     Party:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         type:
 *           type: string
 *         openingBalance:
 *           type: number
 *         bankAccount:
 *           type: string
 *         gst:
 *           $ref: '#/components/schemas/Gst'
 *         partyId:
 *           $ref: '#/components/schemas/PartyId'
 *       example:
 *         _id: "60d3b41abdacab0026a733c6"
 *         name: "ABC Company"
 *         phone: "+1234567890"
 *         email: "contact@abccompany.com"
 *         type: "Vendor"
 *         openingBalance: 1000
 *         bankAccount: "1234567890"
 *         gst:
 *           gst: "GSTIN1234567890"
 *           legalBusinessName: "ABC Company Pvt Ltd"
 *           billingAddress: "123 Main St, City, Country"
 *         partyId:
 *           prefix: "PARTY"
 *           sequence: 1
 */

/**
 * @swagger
 * tags:
 *   name: Parties
 *   description: Party management
 */

/**
 * @swagger
 * /parties:
 *   post:
 *     summary: Create a new party
 *     tags: [Parties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Party'
 *     responses:
 *       201:
 *         description: The party was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       400:
 *         description: Some server error
 *
 *   get:
 *     summary: Get all parties
 *     tags: [Parties]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term for party name, email, or phone
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by party type
 *     responses:
 *       200:
 *         description: The list of parties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Party'
 */

/**
 * @swagger
 * /parties/{id}:
 *   get:
 *     summary: Get a party by id
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The party id
 *     responses:
 *       200:
 *         description: The party data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       404:
 *         description: The party was not found
 *
 *   patch:
 *     summary: Update a party
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The party id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Party'
 *     responses:
 *       200:
 *         description: The party was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       404:
 *         description: The party was not found
 *
 *   delete:
 *     summary: Delete a party
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The party id
 *     responses:
 *       200:
 *         description: The party was deleted
 *       404:
 *         description: The party was not found
 */