import DatabaseConstructor, { Database } from "better-sqlite3";

export const db: Database = new DatabaseConstructor("db.sqlite3");

const query = `
    CREATE TABLE IF NOT EXISTS "artists" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" TEXT,
        "bio" TEXT,
        "socials" TEXT,
        "image" TEXT,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "users" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "username" VARCHAR UNIQUE NOT NULL,
        "email" VARCHAR UNIQUE NOT NULL,
        "hashed_password" TEXT NOT NULL,
        "address" TEXT,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "products" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" VARCHAR NOT NULL,
        "description" TEXT,
        "artist_id" INTEGER NOT NULL,
        "category_id" INTEGER NOT NULL,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("artist_id") REFERENCES "artists" ("id"),
        FOREIGN KEY ("category_id") REFERENCES "categories" ("id")
    );

    CREATE TABLE IF NOT EXISTS "product_images" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "product_id" INTEGER NOT NULL,
        "image_url" TEXT NOT NULL,
        "is_main_image" BOOLEAN NOT NULL DEFAULT 0,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("product_id") REFERENCES "products" ("id")
    );

    CREATE TABLE IF NOT EXISTS "product_variations" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "product_id" INTEGER NOT NULL,
        "size" TEXT,
        "colour" TEXT,
        "price" FLOAT NOT NULL CHECK (price > 0),
        "stock" INTEGER NOT NULL,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("product_id") REFERENCES "products" ("id")
    );

    CREATE TABLE IF NOT EXISTS "categories" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "carts" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "user_id" INTEGER NOT NULL,
        "product_variation_id" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL CHECK (quantity > 0),
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("product_variation_id") REFERENCES "product_variation" ("id")
    );

    CREATE TABLE IF NOT EXISTS "order_items" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "order_id" INTEGER NOT NULL,
        "product_variation_id" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL CHECK (quantity > 0),
        "price" FLOAT NOT NULL CHECK (price > 0),
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("order_id") REFERENCES "orders" ("id"),
        FOREIGN KEY ("product_variation_id") REFERENCES "product_variation" ("id")
    );

    CREATE TABLE IF NOT EXISTS "orders" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "user_id" INTEGER NOT NULL,
        "shipping_methods_id" INTEGER NOT NULL,
        "payment_info_id" INTEGER NOT NULL,
        "tracking" TEXT UNIQUE,
        "completed" BOOLEAN NOT NULL,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("shipping_methods_id") REFERENCES "shipping_methods" ("id"),
        FOREIGN KEY ("payment_info_id") REFERENCES "payment_info" ("id")
    );

    CREATE TABLE IF NOT EXISTS "shipping_methods" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name" VARCHAR NOT NULL,
        "description" TEXT,
        "rates" FLOAT NOT NULL CHECK (rates >= 0),
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "payment_info" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "order_id" INTEGER NOT NULL,
        "payment_method" TEXT NOT NULL,
        "transaction_id" INTEGER,
        "amount" FLOAT NOT NULL CHECK (amount > 0),
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("order_id") REFERENCES "orders" ("id")
    );

    CREATE TABLE IF NOT EXISTS "reviews" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "user_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "rating" INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        "comment" TEXT,
        "creation_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("product_id") REFERENCES "products" ("id")
    );
`;

db.exec(query);
