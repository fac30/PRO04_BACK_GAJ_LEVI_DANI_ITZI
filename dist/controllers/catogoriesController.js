"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryId = void 0;
const create_database_1 = require("../scripts/create-database");
const getCategoryId = (req, res) => {
    try {
        const { id } = req.params;
        const stmt = create_database_1.db.prepare(`SELECT * FROM categories WHERE id = ?`);
        const category = stmt.get(id);
        if (category) {
            res.json(category);
        }
        else {
            res.status(404).json({ message: 'Category does not exist' });
        }
    }
    catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getCategoryId = getCategoryId;
