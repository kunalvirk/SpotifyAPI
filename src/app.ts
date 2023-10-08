import express, { Application } from "express";
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';
import { DSN } from "./app/services/DatabaseService";

import logger from "./utils/logger";
import spotifyRoutes from './routes/index';


dotenv.config();

const app: Application = express();

/**
 * Define `app` level middlewares
 */
app.use(express.json());
app.use(pinoHttp({
    logger: logger
}));

/**
 * Setup DB connection
 */
DSN
    .initialize()
    .then(() => {
        logger.info('Successfully connected to DB');
    })
    .catch((err) => {
        logger.error(err);
    });


/**
 * App routes
 */
app.use('/api', spotifyRoutes);

/**
 * Endpoint just to check if the API is availble or not
 */
app.get('/health', (req, res) => res.json({
    status: true,
    message: "Health Ok!"
}));


export { app }