import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Service API',
            version: '1.0.0',
            description: 'API documentation for the Product Service in the Multi-Vendor Ecommerce application.',
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server',
            },
        ]
    },
    apis: ['./src/docs/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);