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
 *                    $ref: '#/components/schemas/FetchISRC'
 */
router.post('/track', auth, validate(TrackSchema), fetchTrackMetadataHandler);
router.get('/isrc', auth, validate(TrackSchema), fetchISRCHandler);
router.get('/artist', auth, validate(ArtistSchema), searchArtistsHandler);

export default router;