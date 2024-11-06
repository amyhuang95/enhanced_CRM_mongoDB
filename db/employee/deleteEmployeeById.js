import { getDBConnection } from '../dbConnector.js';

/**
 * Function to delete employee by id from the database
 * @param {number} employee_id id of the employee to delete
 * @returns {Promise<Object>} the result of the delete operation
 */
export async function deleteEmployeeById(employee_id) {
  console.log('[DB] deleteEmployeeById', employee_id);

  const db = await getDBConnection();

  const sql = `
      DELETE FROM employee
      WHERE employee_id = @employee_id;`;

  const params = {
    '@employee_id': employee_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error deleting employee by id:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default deleteEmployeeById;
