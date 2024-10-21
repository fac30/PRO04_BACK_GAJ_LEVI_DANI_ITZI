import { Router } from 'express';
import { getCategoryId } from '../controllers/catogoriesController'

const router = Router();

router.use("/category/:id", getCategoryId)

export default router