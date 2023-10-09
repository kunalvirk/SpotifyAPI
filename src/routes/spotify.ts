import { Router } from "express";
import { fetchAccessTokenHandler, fetchISRCHandler, fetchTrackMetadataHandler, searchArtistsHandler } from "../app/controllers/SpotifyController";
import validate from "../app/middlewares/validate";
import { TrackSchema } from "../app/schema/track.model";
import { auth } from "../app/middlewares/auth";
import { ArtistSchema } from "../app/schema/artist.model";

const router = Router();
/**
 * @openapi
 * /api/v1/token:
 *  post:
 *      tags:
 *         - Authorization
 *      description: Get the access token for accessing the API
 *      responses:
 *          200:
 *              description: Access granted
 *          403:
 *              description: Access forbidden
 * 
 */
router.post('/token', fetchAccessTokenHandler);


/**
 * @openapi
 * /api/v1/track:
 *  post:
 *      tags:
 *         - Tracks
 *      description: Get information about a given track by it's ISRC code
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FetchISRC'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Track'
 *          401:
 *              description: Unauthorized
 */
router.post('/track', auth, validate(TrackSchema), fetchTrackMetadataHandler);


/**
 * @openapi
 * /api/v1/isrc:
 *  post:
 *      tags:
 *         - Tracks
 *      description: Get saved metadata of a given track by it's ISRC code
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FetchISRC'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Track'
 *          401:
 *              description: Unauthorized
 */
router.post('/isrc', auth, validate(TrackSchema), fetchISRCHandler);


/**
 * @openapi
 * /api/v1/artist:
 *  post:
 *      tags:
 *         - Artist
 *      description: Search for an artist with it's name
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Artist'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    $ref: '#/components/schemas/ArtistResponse'
 *          401:
 *              description: Unauthorized
 */
router.post('/artist', auth, validate(ArtistSchema), searchArtistsHandler);

export default router;