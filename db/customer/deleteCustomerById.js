import { getDBConnection } from '../dbConnector.js';

/**
 * Function to delete customer by id from the database
 * @param {number} customer_id id of the customer to delete
 * @returns {Promise<Object>} the result of the delete operation
 */
export async function deleteCustomerById(customer_id) {
  console.log('[DB] deleteCustomerById', customer_id);

  const db = await getDBConnection();

  const sql = `
      DELETE FROM customer
      WHERE customer_id = @customer_id;`;

  const params = {
    '@customer_id': customer_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error deleting customer by id:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default deleteCustomerById;
