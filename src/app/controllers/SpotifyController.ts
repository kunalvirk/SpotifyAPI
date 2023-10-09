import { Request, Response } from "express";
import logger from "../../utils/logger";
import { getAccessToken, getISRCData, getTrackMetaData, searchArtists } from "../services/SpotifyService";

export const fetchAccessTokenHandler = async (req: Request, res: Response) => {
    try {
        
        const credentials = await getAccessToken();
        
        res.status(200).json({
            success: true,
            credentials
        })
    } catch (error) {
        
        res.status(401).json({
            success: false,
            message: "Bad luck"
        })
    }
};

export const fetchTrackMetadataHandler = async (req: Request, res: Response) => {
    
    try {
        logger.info("[controller] :: Getting track A");
        const tracks = await getTrackMetaData(req);

        res.status(200).json({
            success: true,
            message: tracks.message
        });
    } catch (error) {
        logger.info("[controller] :: Getting track B");
        res.status(500).json({
            success: false,
            message: error
        })
    }
};

export const fetchISRCHandler = async (req: Request, res: Response) => {
    try {

        const isrc = await getISRCData(req);
        res.status(200).json({
            success: true,
            isrc
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const searchArtistsHandler = async (req: Request, res: Response) => {
    try {
        
        const searchArtist = await searchArtists(req);
        res.status(200).json({
            success: true,
            results: searchArtist
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}