import DatabaseConstructor, { Database } from "better-sqlite3";

const fs = require("fs");
const db: Database = new DatabaseConstructor("db.sqlite3");

interface Artist {
    name: string;
    bio: string;
    socials: string;
    image: string;
}

fs.readFile('../../data/artists.json', 'utf8', (err, data)) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
const artistsData: Artist[] = JSON.parse(data);


const insertArtistsData = db.prepare(
  "INSERT INTO artists (name, bio, socials, image) VALUES (?, ?, ?, ?)"
);

artistsData.forEach((artist) => {
    insertArtistsData.run(artist.name, artist.bio, artist.socials, artist.image, (insertErr: void) => {
        if (insertErr) {
            console.error('Error inserting artist:', insertErr);
        }
    });
});

const query = 'SELECT * FROM artists';
const artists = db.prepare(query).all();

db.close();
db.close(err => {
    if (err) {
        console.error('Error closing the database:', err);
    } else {
        console.log('Database closed successfully.');
    }
});
});
