import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get sales employees from the database
 * @returns {Promise<Array<Object>>} an array of sales employees' id and name
 */
export async function getSalesEmployee() {
  console.log('[DB] getSalesEmployee');
  const db = await getDBConnection();

  const sql = `
    SELECT first_name || ' ' || last_name AS name, employee_id AS id
    FROM employee
    WHERE (department LIKE 'Sales'
      OR title LIKE 'Sales')
      AND id <> 0;
  `;

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.all();
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error fetching Sales employees:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getSalesEmployee;
