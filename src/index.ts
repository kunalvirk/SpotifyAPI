import dotenv from 'dotenv';

dotenv.config();

import * as http from 'http';
import { app } from './app';

const server = http.createServer(app).listen(process.env.PORT || 3000);

server.on("listening", () => {
    console.log(`Hey there! I am listening at port ${process.env.PORT}`);
});

