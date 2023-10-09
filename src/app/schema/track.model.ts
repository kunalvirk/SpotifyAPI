import { object, string, infer } from 'zod';

/**
 * @swagger
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
 *    FetchISRCResponse:
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