/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password (min 6 characters)
 *         role:
 *           type: string
 *           enum: [user, admin, super_admin]
 *           description: The user's role
 *         phone:
 *           type: string
 *           description: The user's phone number
 *     
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *     
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         role:
 *           type: string
 *           enum: [user, admin, super_admin]
 *           description: The user's role
 *         phone:
 *           type: string
 *           description: The user's phone number
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 *     
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: New JWT access token
 *   
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     ForbiddenError:
 *       description: User does not have the necessary permissions
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     BadRequestError:
 *       description: Invalid input data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 * 
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 * 
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthUser'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 * 
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

// This file doesn't export anything. It's used solely for Swagger documentation.