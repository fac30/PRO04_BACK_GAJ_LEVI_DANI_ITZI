import { Request, Response } from 'express';
import { db } from '../scripts/create-database';

export const getProduct = (req: Request, res: Response) => {
	try {
		const stmt = db.prepare('SELECT name FROM products');
		const products = stmt.all();
		res.json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const getProductid = (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const stmt = db.prepare(`SELECT name FROM products WHERE id = ?`);
		const product = stmt.get(id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	} catch (error) {
		console.error('Error fetching product:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
