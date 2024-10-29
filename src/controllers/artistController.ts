import { Request, Response } from "express";
import { db } from "../scripts/create-database";

export const getAllArtists = (req: Request, res: Response) => {
  //get all the endpoints from
  const stmt = db.prepare("SELECT * FROM artists");
  const artists = stmt.all();
  res.json(artists);
};

export const getArtistById = (req: Request, res: Response) => {
  //get endpoints for artist with particular id:
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM artists WHERE id = ?");
  const artist = stmt.get(id);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
};
