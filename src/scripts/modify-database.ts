import DatabaseConstructor, { Database } from "better-sqlite3";

const db: Database = new DatabaseConstructor("db.sqlite3");

const insertData = db.prepare("INSERT INTO artists (name, bio, socials) VALUES (?, ?, ?)");


