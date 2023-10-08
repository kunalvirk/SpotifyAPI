import { Request, Response, Router } from "express";
import spotify from './spotify';

const routes = Router();

routes.use('/v1', spotify);

export default routes; 