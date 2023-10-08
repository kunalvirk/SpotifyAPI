import { Request, Response } from "express";
import logger from "../../utils/logger";
import { getAccessToken, getISRCData, getTrackMetaData } from "../services/SpotifyService";

export const fetchAccessTokenHandler = async (req: Request, res: Response) => {
    try {
        logger.info("Getting accessToken");
        const token = await getAccessToken();
        
        res.status(200).json({
            success: true,
            credentials: token
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
        const tracks = await getTrackMetaData(req);
        res.status(200).json({
            success: true,
            tracks
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error
        })
    }
};

export const fetchISRCHandler = async (req: Request, res: Response) => {
    try {

        const findByISRC = await getISRCData(req);
        res.status(200).json({
            success: true,
            findByISRC
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error
        })
    }
}