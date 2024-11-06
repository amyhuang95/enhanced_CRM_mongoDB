import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Helper function to connect to the database
export async function getDBConnection() {
  return open({
    filename: './queries/database.db',
    driver: sqlite3.Database,
  });
}
