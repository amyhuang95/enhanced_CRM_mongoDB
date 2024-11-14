import { getDBConnection } from '../dbConnector.js';

/**
 * Function to add an employee to the database
 * @param {object} emp employee object to add to the database
 * @returns {Promise<Object>} the result of the insert operation
 */
export async function addEmployee(emp) {
  console.log('[DB] addEmployee', emp);
  const { client, db } = await getDBConnection();
  const collection = db.collection('Employee');

  try {
    const result = await collection.insertOne(emp);
    return result;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  } finally {
    client.close();
  }
}
