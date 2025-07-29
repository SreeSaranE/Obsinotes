import * as SQLite from 'expo-sqlite';

export interface Note {
  id: number;
  title: string;
  content: string;
}

const db = SQLite.openDatabaseSync('notes.db');

// Initialize database and create table if not exists
export function initDB() {
  db.exec([
    {
      sql: `
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT
        );
      `,
      args: [],
    },
  ]);
}

// Fetch all notes
export function getNotes(): Note[] {
  const result = db.exec([{ sql: 'SELECT * FROM notes ORDER BY id DESC;', args: [] }]);
  const rows = result[0]?.rows ?? [];

  return rows as Note[];
}

// Create a new note
export function createNote(): void {
  db.exec([
    {
      sql: 'INSERT INTO notes (title, content) VALUES (?, ?);',
      args: ['Untitled', ''],
    },
  ]);
}

// Update note content
export function updateNoteContent(id: number, content: string): void {
  db.exec([
    {
      sql: 'UPDATE notes SET content = ? WHERE id = ?;',
      args: [content, id],
    },
  ]);
}

// Delete note
export function deleteNote(id: number): void {
  db.exec([
    {
      sql: 'DELETE FROM notes WHERE id = ?;',
      args: [id],
    },
  ]);
}
