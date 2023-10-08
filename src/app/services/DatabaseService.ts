import { DataSource } from 'typeorm';
import { Track } from '../models/entities/Track.entity';
import { Artist } from '../models/entities/Artist.entity';

export const DSN = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        Track,
        Artist
    ],
    logging: true,
    synchronize: true
});