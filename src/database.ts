import DatabaseConstructor, { Database } from "better-sqlite3";

const db: Database = new DatabaseConstructor("db.sqlite3");

const query = `
    CREATE TABLE "artists" (
        "id" INTEGER PRIMARY KEY,
        "bio" TEXT,
        "socials" TEXT,
        "creation_date" TIMESTAMP
    );

    CREATE TABLE "users" (
        "id" INTEGER PRIMARY KEY,
        "username" VARCHAR,
        "email" VARCHAR,
        "password" VARCHAR,
        "address" TEXT,
        "creation_date" TIMESTAMP
    );

    CREATE TABLE "categories" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR,
        "description" TEXT,
        "creation_date" TIMESTAMP
    );

    CREATE TABLE "products" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR,
        "description" TEXT,
        "artist_id" INTEGER,
        "category_id" INTEGER,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("artist_id") REFERENCES "artists" ("id"),
        FOREIGN KEY ("category_id") REFERENCES "categories" ("id")
    );

    CREATE TABLE "product_variation" (
        "id" INTEGER PRIMARY KEY,
        "product_id" INTEGER,
        "size" TEXT,
        "colour" TEXT,
        "price" FLOAT,
        "stock" INTEGER,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("product_id") REFERENCES "products" ("id")
    );

    CREATE TABLE "cart" (
        "id" INTEGER PRIMARY KEY,
        "user_id" INTEGER,
        "product_variation_id" INTEGER,
        "quantity" INTEGER,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("product_variation_id") REFERENCES "product_variation" ("id")
    );

    CREATE TABLE "orders" (
        "id" INTEGER PRIMARY KEY,
        "user_id" INTEGER,
        "shipping_methods_id" INTEGER,
        "payment_info_id" INTEGER,
        "tracking" TEXT,
        "completed" BOOLEAN,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("shipping_methods_id") REFERENCES "shipping_methods" ("id"),
        FOREIGN KEY ("payment_info_id") REFERENCES "payment_info" ("id")
    );

    CREATE TABLE "order_item" (
        "id" INTEGER PRIMARY KEY,
        "order_id" INTEGER,
        "product_variation_id" INTEGER,
        "quantity" INTEGER,
        "price" FLOAT,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("order_id") REFERENCES "orders" ("id"),
        FOREIGN KEY ("product_variation_id") REFERENCES "product_variation" ("id")
    );

    CREATE TABLE "shipping_methods" (
        "id" INTEGER PRIMARY KEY,
        "name" VARCHAR,
        "description" TEXT,
        "rates" FLOAT,
        "creation_date" TIMESTAMP
    );

    CREATE TABLE "payment_info" (
        "id" INTEGER PRIMARY KEY,
        "order_id" INTEGER,
        "payment_method" TEXT,
        "transaction_id" INTEGER,
        "amount" FLOAT,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("order_id") REFERENCES "orders" ("id")
    );

    CREATE TABLE "reviews" (
        "id" INTEGER PRIMARY KEY,
        "user_id" INTEGER,
        "product_id" INTEGER,
        "rating" INTEGER,
        "comment" TEXT,
        "creation_date" TIMESTAMP,
        FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
        FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

`;

db.exec(query);
