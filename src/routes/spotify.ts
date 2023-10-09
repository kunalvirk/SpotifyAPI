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
 *          contents:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FetchISRC'
 *      responses:
 *          200:
 *              description: Got all the metadata from Spotify API for the given ISRC code
 *          404:
 *              description: ISRC is valid or not found
 */
router.post('/track', auth, validate(TrackSchema), fetchTrackMetadataHandler);


/**
 * @openapi
 * /api/v1/isrc:
 *  post:
 *      tags:
 *         - Tracks
 *      description: Get information about a saved track by it's ISRC code
 *      requestBody:
 *          required: true
 *          contents:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FetchISRC'
 *      responses:
 *          200:
 *              description: Get saved metadata about an ISRC code
 *          404:
 *              description: ISRC is valid or not found
 */
router.get('/isrc', auth, validate(TrackSchema), fetchISRCHandler);


/**
 * @openapi
 * /api/v1/artist:
 *  get:
 *      tags:
 *         - Artist
 *      description: Search artists
 *      requestBody:
 *          required: true
 *          contents:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FetchISRC'
 *      responses:
 *          200:
 *              description: Get saved metadata about an ISRC code
 *          404:
 *              description: ISRC is valid or not found
 */
router.get('/artist', auth, validate(ArtistSchema), searchArtistsHandler);

export default router;