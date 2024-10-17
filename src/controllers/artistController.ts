import { Request, Response } from 'express';
import { db } from '../scripts/create-database';

export function getAllArtists(req: Request, res: Response) {
	//get all the endpoints from
	const stmt = db.prepare('SELECT name FROM artists');
	const artists = stmt.all();
	res.json(artists);
}

export function getArtistById(req: Request, res: Response) {
	//get endpoints for artist with particular id:
	const { id } = req.params;
	const stmt = db.prepare('SELECT name FROM artists WHERE id = ?');
	const artist = stmt.get(id);
	if (artist) {
		res.json(artist);
	} else {
		res.status(404).json({ message: 'Artist not found' });
	}
}
