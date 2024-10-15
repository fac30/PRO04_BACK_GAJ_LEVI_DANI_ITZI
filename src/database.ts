import Database from "better-sqlite3";

const db = new Database("app.db");

const query = `
    CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username STRING NOT NULL UNIQUE,
        email STRING,
        password STRING,
        address STRING,
        creation_date TIMESTAMP
    )
`;

db.exec(query);
