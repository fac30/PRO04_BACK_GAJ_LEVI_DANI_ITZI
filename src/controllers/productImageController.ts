import DatabaseConstructor, { Database } from "better-sqlite3";
export const db: Database = new DatabaseConstructor("db.sqlite3");

import { Request, Response } from "express";

export const getProductImage = (req: Request, res: Response) => {
    try {
      const stmt = db.prepare("SELECT * FROM product_images");
      const productImages = stmt.all();
      res.json(productImages);
    } catch (error) {
      console.error("Error fetching product images:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const getProductImageId = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const stmt = db.prepare(`SELECT * FROM product_images WHERE id = ?`);
      const productImage = stmt.get(id);
      if (productImage) {
        res.json(productImage);
      } else {
        res.status(404).json({ message: "Product image not found" });
      }
    } catch (error) {
      console.error("Error fetching product image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };