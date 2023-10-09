import { object, string, infer } from 'zod';

export const ArtistSchema = object({
    body: object({
        artist: string({
            required_error: "Artist name can not be empty"
        })
    }),
});