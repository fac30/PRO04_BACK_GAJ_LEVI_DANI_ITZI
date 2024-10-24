import DatabaseConstructor, { Database } from "better-sqlite3";
import fs from "fs";

import { Artist } from "../utils/typeBucket";
import { Category } from "../utils/typeBucket";
import { Product } from "../utils/typeBucket";
import { ProductVariation } from "../utils/typeBucket";
import { ProductImage } from "../utils/typeBucket";

const db: Database = new DatabaseConstructor("db.sqlite3");

fs.readFile(
  "data/artists.json",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const artistsData: Artist[] = JSON.parse(data);

    const insertArtistsData = db.prepare(
      "INSERT INTO artists (name, bio, socials, image) VALUES (?, ?, ?, ?)"
    );

    artistsData.forEach((artist) => {
      try {
        insertArtistsData.run(
          artist.name,
          artist.bio,
          artist.socials,
          artist.image
        );
      } catch (insertErr) {
        console.error("Error inserting artist:", insertErr);
      }
    });

    // db.close();
  }
);

fs.readFile(
  "data/categories.json",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const categoriesData: Category[] = JSON.parse(data);

    const insertCategoriesData = db.prepare(
      "INSERT INTO categories (name, description) VALUES (?, ?)"
    );

    categoriesData.forEach((category) => {
      try {
        insertCategoriesData.run(category.name, category.description);
      } catch (insertErr) {
        console.error("Error inserting category:", insertErr);
      }
    });

    // db.close();
  }
);

fs.readFile(
  "data/products.json",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const productsData: Product[] = JSON.parse(data);

    const insertProductsData = db.prepare(
      "INSERT INTO products (name, description, artist_id, category_id) VALUES (?, ?, ?, ?)"
    );

    productsData.forEach((product) => {
      try {
        insertProductsData.run(
          product.name,
          product.description,
          product.artist_id,
          product.category_id
        );
      } catch (insertErr) {
        console.error("Error inserting product:", insertErr);
      }
    });

    // db.close();
  }
);

fs.readFile(
  "data/product-variations.json",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const productVariationData: ProductVariation[] = JSON.parse(data);

    const insertProductVariationsData = db.prepare(
      "INSERT INTO product_variations (product_id, size, colour, price, stock) VALUES (?, ?, ?, ?, ?)"
    );

    productVariationData.forEach((productVariation) => {
      try {
        insertProductVariationsData.run(
          productVariation.product_id,
          productVariation.size,
          productVariation.colour,
          productVariation.price,
          productVariation.stock
        );
      } catch (insertErr) {
        console.error("Error inserting product variation:", insertErr);
      }
    });

    // db.close();
  }
);

fs.readFile(
  "data/product-images.json",
  "utf8",
  (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const productImageData: ProductImage[] = JSON.parse(data);

    const insertProductImagesData = db.prepare(
      "INSERT INTO product_images (product_id, image_url, is_main_image) VALUES (?, ?, ?)"
    );

    productImageData.forEach((productImage) => {
      try {
        insertProductImagesData.run(
          productImage.product_id,
          productImage.image_url,
          productImage.is_main_image
        );
      } catch (insertErr) {
        console.error("Error inserting product image:", insertErr);
      }
    });

    db.close();
  }
);
