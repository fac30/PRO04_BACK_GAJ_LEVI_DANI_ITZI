import { Router } from "express";
import { getAllArtists, getArtistById } from "../controllers/artistController";

const router = Router();
router.get("/artists", getAllArtists);
router.get("/artist/:id", getArtistById);

export default router;
