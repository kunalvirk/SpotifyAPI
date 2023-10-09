import { object, string, infer } from 'zod';


/**
 * @swagger
 * components:
 *  schemas:
 *    Artist:
 *      type: object
 *      required:
 *        - artist
 *      properties:
 *        artist:
 *          type: string
 *          default: Karan
 *    ArtistSearch:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        artistId:
 *          type: string
 *        name:
 *          type: string
 *        tracks:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Track'
 *    ArtistResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ArtistSearch'
 */
export const ArtistSchema = object({
    body: object({
        artist: string({
            required_error: "Artist name can not be empty"
        })
    }),
});