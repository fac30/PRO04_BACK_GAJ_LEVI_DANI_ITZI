import { Request, Response } from 'express';
import { db } from '../scripts/create-database';

export const getCategoryId = (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const stmt = db.prepare(`SELECT * FROM categories WHERE id = ?`);
		const category = stmt.get(id);
		if (category) {
			res.json(category);
		} else {
			res.status(404).json({ message: 'Category does not exist' });
		}
	} catch (error) {
		console.error('Error fetching category:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
