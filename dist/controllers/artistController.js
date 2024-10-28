"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistById = exports.getAllArtists = void 0;
const create_database_1 = require("../scripts/create-database");
const getAllArtists = (req, res) => {
    //get all the endpoints from
    const stmt = create_database_1.db.prepare("SELECT name, id FROM artists");
    const artists = stmt.all();
    res.json(artists);
};
exports.getAllArtists = getAllArtists;
const getArtistById = (req, res) => {
    //get endpoints for artist with particular id:
    const { id } = req.params;
    const stmt = create_database_1.db.prepare("SELECT * FROM artists WHERE id = ?");
    const artist = stmt.get(id);
    if (artist) {
        res.json(artist);
    }
    else {
        res.status(404).json({ message: "Artist not found" });
    }
};
exports.getArtistById = getArtistById;
