import { object, string, infer } from 'zod';

export const TrackSchema = object({
    body: object({
        isrc: string({
            required_error: "Please provide an ISRC to find track data"
        })
    }),
});