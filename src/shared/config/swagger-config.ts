import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger configuration options for the Construction CRM API.
 *
 * @type {swaggerJsdoc.Options}
 * @property {object} definition - The OpenAPI definition object.
 * @property {string} definition.openapi - The OpenAPI version.
 * @property {object} definition.info - Information about the API.
 * @property {string} definition.info.title - The title of the API.
 * @property {string} definition.info.version - The version of the API.
 * @property {string} definition.info.description - A brief description of the API.
 * @property {object} definition.info.license - The license information for the API.
 * @property {string} definition.info.license.name - The name of the license.
 * @property {string} definition.info.license.url - The URL to the license.
 * @property {object} definition.info.contact - Contact information for the API maintainer.
 * @property {string} definition.info.contact.name - The name of the contact person.
 * @property {string} definition.info.contact.url - The URL to the contact person's website.
 * @property {string} definition.info.contact.email - The email address of the contact person.
 * @property {Array<object>} definition.servers - The list of servers where the API is hosted.
 * @property {string} definition.servers[].url - The URL of the server.
 * @property {string} definition.servers[].description - A brief description of the server.
 * @property {Array<string>} apis - The list of files containing API documentation annotations.
 */

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Construction CRM API',
            version: '1.0.0',
            description: 'API documentation for Construction CRM',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Ashim Rudra Paul',
                url: 'https://codewithashim.vercel.app/',
                email: 'codewithashim@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1',
                description: 'Development server',
            },
            {
                url: 'https://api.your-production-domain.com',
                description: 'Production server',
            },
        ],
    },
    apis: [
        './src/app/modules/**/*.routes.ts',
        './src/app/modules/**/*.swagger.ts',
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
