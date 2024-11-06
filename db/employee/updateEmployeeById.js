import { getDBConnection } from '../dbConnector.js';

/**
 * Function to update an employee by id in the database
 * @param {number} employee_id id of the employee to update
 * @param {Object} employee employee object containing updated details
 * @returns {Promise<Object>} updated employee object
 */
export async function updateEmployeeById(employee_id, employee) {
  console.log('[DB] updateEmployeeById', employee_id, employee);

  const db = await getDBConnection();

  const sql = `
      UPDATE employee
      SET
        first_name = @first_name,
        last_name = @last_name,
        email = @email,
        phone = @phone,
        title = @title,
        department = @department,
        business_unit = @business_unit,
        hired_date = @hired_date,
        status = @status
      WHERE
        employee_id = @employee_id;
    `;

  const params = {
    '@employee_id': employee_id,
    '@first_name': employee.first_name,
    '@last_name': employee.last_name,
    '@email': employee.email,
    '@phone': employee.phone,
    '@title': employee.title,
    '@department': employee.department,
    '@business_unit': employee.business_unit,
    '@hired_date': employee.hired_date,
    '@status': employee.status,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    console.log('update', result);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error updating employee by id:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default updateEmployeeById;
