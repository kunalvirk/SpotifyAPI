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
 *          default: GBWWP1702907
 *    Track:
 *      type: object
 *      required:
 *        - isrc
 *        - title
 *        - releaseDate
 *        - coverImg
 *        - type
 *        - trackCount
 *      properties:
 *        isrc:
 *          type: string
 *          default: GBWWP1702907
 *        title:
 *          type: string
 *          default: I Like Me Better
 *        releaseDate:
 *          type: string
 *          default: 2018-05-31
 *        coverImg:
 *          type: string
 *          default: https://i.scdn.co/image/ab67616d0000b273bdea30b86b37142ec99deb78
 *        type:
 *          type: string
 *          default: album
 *        trackCount:
 *          type: string
 *          default: 17
 */
export const TrackSchema = object({
    body: object({
        isrc: string({
            required_error: "Please provide an ISRC to find track data"
        })
    }),
});