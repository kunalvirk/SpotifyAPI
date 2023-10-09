import { Application, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import logger from './logger';


const options: swaggerJSDoc.Options = {
    definition: {
		openapi: '3.0.0',
		info: {
			title: 'Spotify API - LTIM',
			version: version,
		},
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'token'
                },
            },
        }
	},
	apis: ['./src/routes/*.ts', './src/app/schema/*.ts'],
};


const swaggerSpec = swaggerJSDoc(options);

const swagggerDocs = (app: Application) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    logger.info(`Docs can be accessed at port: ${process.env.PORT}`);
};

export default swagggerDocs;