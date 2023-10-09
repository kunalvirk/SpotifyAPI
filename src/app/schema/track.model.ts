import { object, string, infer } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    FetchISRC:
 *      type: object
 *      required:
 *        - isrc
 *      properties:
 *        isrc:
 *          type: string
 *          default: TCAGU2326239
 */
export const TrackSchema = object({
    body: object({
        isrc: string({
            required_error: "Please provide an ISRC to find track data"
        })
    }),
});