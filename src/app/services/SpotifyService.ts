import axios, { AxiosError } from "axios";
import { Request } from "express";
import {
  Track as ITrack,
  Tracks as ITracks,
  SearchResults,
} from "@spotify/web-api-ts-sdk";
import { Like, QueryFailedError, FindOneOptions } from "typeorm";

import { DSN } from "./DatabaseService";
import { Track } from "../models/entities/Track.entity";
import { Artist } from "../models/entities/Artist.entity";
import logger from "../../utils/logger";

/**
 * Spotify auth setup
 */
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;

const SPOTIFY_API_URI = "https://api.spotify.com/v1";

// Axios instance
const spotifyAxios = axios.create({
  baseURL: SPOTIFY_API_URI,
});

interface IAccessToken {
  credentials: {
    access_token: string;
    token_type: string;
    expires_in: string;
  };
}

interface IRequestSuccess {
  message: string;
  [key: string]: any;
}

/**
 * Get an accessToken for Spotify API
 */
const authString = ("Basic " +
  Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    "base64"
  )) as string;
const authOptions = {
  headers: {
    Authorization: authString,
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
export const getAccessToken = async (): Promise<IAccessToken> => {
  // Request an accessToken
  try {
    const token = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
      },
      authOptions
    );

    return token.data;
  } catch (e) {
    throw "Error occurred while retrieving the access token";
  }
};

/**
 * Fetch the track metadata from an ISRC string
 * and return with what's saved to DB
 */
export const getTrackMetaData = async (req: Request): Promise<Track> => {
  try {
    const isrc = req.body.isrc;
    spotifyAxios.defaults.headers.common["Authorization"] =
      req.headers["authorization"];

    const items = await spotifyAxios.get<SearchResults<["track"]>>("/search", {
      params: {
        q: `isrc:${isrc}`,
        type: "track",
      },
    });

    // Get only the mentioned metadata i.e. Spotify Image URI, Title, Artist Name List
    // Check if there are multiple tracks, the pick the most popular one by `popularity` key

    const getRelevantTrack: ITrack = items.data.tracks.items.sort(
      (a: ITrack, b: ITrack) => b.popularity - a.popularity
    )[0];

    const trackArtists = getRelevantTrack.artists;

    const createTrack = new Track();
    createTrack.isrc = isrc;
    createTrack.title = getRelevantTrack.name;
    createTrack.releaseDate = getRelevantTrack.album.release_date;
    createTrack.coverImg = getRelevantTrack.album.images[0].url;
    createTrack.type = getRelevantTrack.album.album_type;
    createTrack.trackCount = getRelevantTrack.album.total_tracks;

    const trackMetaData = await DSN.getRepository(Track).save(createTrack);

    for (const artistInfo of trackArtists) {
      const artistOptions: FindOneOptions<Artist> = {
        where: {
          artistId: artistInfo.id,
        },
        relations: ['tracks'],
      };

      let artist = await DSN.getRepository(Artist).findOne(artistOptions);

      if (!artist) {
        artist = new Artist();
        artist.name = artistInfo.name;
        artist.artistId = artistInfo.id;
        artist.tracks = [];
      }

      // Add the track to the artist relation
      if (!artist.tracks.find(track => track.id === createTrack.id)) {
        artist.tracks.push(createTrack);
      }

      await DSN.getRepository(Artist).save(artist);
    }

    return trackMetaData;
  } catch (error: any) {
    if (error instanceof QueryFailedError) {
      throw "Either the ISRC is invalid or it already exist in the DB.";
    } else if (error instanceof AxiosError) {
      throw "You may have a missing or expired access token.";
    }

    logger.error(error);
    throw "Something unexpected occurred.";
  }
};

/**
 * Read local DB with `isrc`
 */
export const getISRCData = async (req: Request): Promise<Track[]> => {
  try {
    const getISRC = await DSN.getRepository(Track).find({
      where: {
        isrc: req.body.isrc,
      },
      relations: {
        artists: true
      }
    });

    return getISRC;
  } catch (error) {
    throw "Not found!";
  }
};

/**
 * Find `artist` in local DB with `name`
 */
export const searchArtists = async (req: Request): Promise<Artist[]> => {
  try {
    const searchString = req.body.artist;
    // const searchArtists = await DSN.getRepository(Artist).findBy({
    //   name: Like(`%${searchString}%`),
    // });
    
    const searchArtists = await DSN.getRepository(Artist)
    .createQueryBuilder('artist')
    .leftJoinAndSelect('artist.tracks', 'track')
    .where('artist.name LIKE :name', { name: `%${searchString}%` })
    .getMany();

    return searchArtists;
  } catch (error) {
    throw "Not found!";
  }
};
