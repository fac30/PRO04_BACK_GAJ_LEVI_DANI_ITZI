"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistById = void 0;
const create_database_1 = require("../scripts/create-database");
// export const getAllArtists =(req: Request, res: Response) => {
// 	//get all the endpoints from
// 	const stmt = db.prepare('SELECT name FROM artists');
// 	const artists = stmt.all();
// 	res.json(artists);
// }
const getArtistById = (req, res) => {
    //get endpoints for artist with particular id:
    const { id } = req.params;
    const stmt = create_database_1.db.prepare('SELECT name FROM artists WHERE id = ?');
    const artist = stmt.get(id);
    if (artist) {
        res.json(artist);
    }
    else {
        res.status(404).json({ message: 'Artist not found' });
    }
};
exports.getArtistById = getArtistById;
