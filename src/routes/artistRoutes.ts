import { Router } from 'express';
import { getAllArtists,getArtistById } from '../controllers/artistController';

const router = Router();
router.get('/artists', getAllArtists);
router.get('/artists/:id', getArtistById);

export default router;
