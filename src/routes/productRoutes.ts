import { Router } from 'express';
import { getProduct, getProductid } from '../controllers/productController';

const router = Router();
router.get('/products', getProduct);
router.get('/product/:id', getProductid)

export default router


