import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get employee by id from the database
 * @param {number} employee_id the employee id to search for.
 * @returns {Promise<Object>} an employee object
 */
export async function getEmployeeById(employee_id) {
  console.log('[DB] getEmployeeById', employee_id);
  const db = await getDBConnection();

  const sql = `
    SELECT *
    FROM employee
    WHERE employee_id = @employee_id;
    `;

  const params = {
    '@employee_id': employee_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.get(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error fetching employee by id:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getEmployeeById;
