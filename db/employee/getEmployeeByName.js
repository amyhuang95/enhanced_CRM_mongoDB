import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get employees by name from the database
 * @param {string} query the name query to search for employees.
 * @param {number} page  the page number for pagination.
 * @param {number} pageSize  the number of employees to return per page.
 * @returns {Promise<Array>} an array of employee objects
 */
export async function getEmployeeByName(query, page, pageSize) {
  console.log('[DB] getEmployeeByName', query);
  const db = await getDBConnection();

  const sql = `
    SELECT *
    FROM employee
    WHERE first_name LIKE @query
      OR last_name LIKE @query
    ORDER BY hired_date DESC
    LIMIT @pageSize
    OFFSET @offset;
  `;

  const params = {
    '@query': query + '%',
    '@pageSize': pageSize,
    '@offset': (page - 1) * pageSize,
  };

  try {
    const stmt = await db.prepare(sql); // prevent SQL injection attacks
    const result = await stmt.all(params); // execute the statement and fetch all rows
    await stmt.finalize(); // release the statement
    return result;
  } catch (error) {
    console.error('Error fetching employees by name:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getEmployeeByName;
