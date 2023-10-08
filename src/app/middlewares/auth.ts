import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'AuthError: Access token not found' });
  }

  // Check if the access token is valid
  try {
    
    const test_endpoint = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    next();

  } catch (err) {
    logger.info("Access token validation failed", err);
    return res.status(401).json({ message: 'AuthError: Access token is expired' });
  }
  
  next();

};