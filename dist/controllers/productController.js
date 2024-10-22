"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductid = exports.getProduct = void 0;
const create_database_1 = require("../scripts/create-database");
const getProduct = (req, res) => {
    try {
        const stmt = create_database_1.db.prepare('SELECT name FROM products');
        const products = stmt.all();
        res.json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getProduct = getProduct;
const getProductid = (req, res) => {
    try {
        const { id } = req.params;
        const stmt = create_database_1.db.prepare(`SELECT name FROM products WHERE id = ?`);
        const product = stmt.get(id);
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getProductid = getProductid;
