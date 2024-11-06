import { getDBConnection } from '../dbConnector.js';

/**
 * Function to add an employee to the database
 * @param {object} emp employee object to add to the database
 * @returns {Promise<Object>} the result of the insert operation
 */
export async function addEmployee(emp) {
  console.log('[DB] addEmployee', emp);
  const db = await getDBConnection();

  const sql = `
      INSERT INTO employee (first_name, last_name, phone, email, department, title, business_unit, hired_date)
      VALUES (@first_name, @last_name, @phone, @email, @department, @title, @business_unit, @hired_date);`;

  const params = {
    '@first_name': emp.first_name,
    '@last_name': emp.last_name,
    '@phone': emp.phone,
    '@email': emp.email,
    '@department': emp.department,
    '@title': emp.title,
    '@business_unit': emp.business_unit,
    '@hired_date': emp.hired_date,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default addEmployee;
