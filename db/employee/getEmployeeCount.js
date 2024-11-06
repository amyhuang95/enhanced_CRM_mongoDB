import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get the count of employees by name from the database
 * @param {string} query the name query to search for employees.
 * @returns {Promise<number>} number of employees
 */
export async function getEmployeeCount(query) {
  console.log('[DB] getEmployeeCount', query);
  const db = await getDBConnection();

  const sql = `
    SELECT COUNT(*) AS count
    FROM employee
    WHERE first_name LIKE @query
      OR last_name LIKE @query;`;

  const params = {
    '@query': query + '%',
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.get(params);
    await stmt.finalize();
    return result.count;
  } catch (error) {
    console.error('Error fetching employee count:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getEmployeeCount;
