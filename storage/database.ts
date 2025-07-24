import { openDatabaseSync } from 'expo-sqlite';

// Open the database synchronously
const db = openDatabaseSync('obsinotes.db');

// Set up the notes table
export const setupDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      content TEXT,
      createdAt TEXT
    );
  `);
};

// Get all notes
export const getAllNotes = (): any[] => {
  const result = db.getAllSync('SELECT * FROM notes ORDER BY createdAt DESC;');
  return result;
};

// Get a single note by ID
export const getNoteById = (id: string): any | undefined => {
  const result = db.getAllSync('SELECT * FROM notes WHERE id = ?;', [id]);
  return result[0];
};

// Save or update a note
export const saveNote = (
  id: string,
  title: string,
  content: string,
  createdAt: string
): void => {
  db.runSync(
    `INSERT OR REPLACE INTO notes (id, title, content, createdAt) VALUES (?, ?, ?, ?);`,
    [id, title, content, createdAt]
  );
};

// Delete a note by ID
export const deleteNote = (id: string): void => {
  db.runSync('DELETE FROM notes WHERE id = ?;', [id]);
};
