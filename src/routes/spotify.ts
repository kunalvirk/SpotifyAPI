import { Router } from "express";
import { fetchAccessTokenHandler, fetchISRCHandler, fetchTrackMetadataHandler } from "../app/controllers/SpotifyController";
import validate from "../app/middlewares/validate";
import { TrackSchema } from "../app/schema/track.model";
import { auth } from "../app/middlewares/auth";

const router = Router();

router.post('/token', fetchAccessTokenHandler);
router.post('/track', auth, validate(TrackSchema), fetchTrackMetadataHandler);

router.get('/isrc', auth, validate(TrackSchema), fetchISRCHandler);

export default router;