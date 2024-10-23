import { Request, Response } from "express";
import { db } from "../scripts/create-database";

export const getAllArtists = (req: Request, res: Response) => {
  //get all the endpoints from
<<<<<<< HEAD
  const stmt = db.prepare("SELECT name, id FROM artists");
=======
  const stmt = db.prepare("SELECT name FROM artists");
>>>>>>> 2baf82f48d5e04364704064b20b1ceb57968c919
  const artists = stmt.all();
  res.json(artists);
};

export const getArtistById = (req: Request, res: Response) => {
  //get endpoints for artist with particular id:
  const { id } = req.params;
<<<<<<< HEAD
  const stmt = db.prepare("SELECT * FROM artists WHERE id = ?");
=======
  const stmt = db.prepare("SELECT name FROM artists WHERE id = ?");
>>>>>>> 2baf82f48d5e04364704064b20b1ceb57968c919
  const artist = stmt.get(id);
  if (artist) {
    res.json(artist);
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
};
