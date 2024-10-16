import DatabaseConstructor, { Database } from "better-sqlite3";
import fs from "fs";

const db: Database = new DatabaseConstructor("db.sqlite3");

interface Artist {
  name: string;
  bio: string;
  socials: string;
  image: string;
}

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

    const query = "SELECT * FROM artists";
    const artists = db.prepare(query).all();
    console.log(artists);

    db.close();
  }
);
