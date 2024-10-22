"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getAllArtists, getArtistById } from '../controllers/artistController';
const create_database_1 = require("../scripts/create-database");
const router = (0, express_1.Router)();
// router.get('/artists', getAllArtists);
// router.get('/artists/:id', getArtistById);
exports.default = router;
router.get('/artists', (req, res) => {
    const stmt = create_database_1.db.prepare('SELECT name FROM artists');
    const artists = stmt.all();
    res.json(artists);
});
