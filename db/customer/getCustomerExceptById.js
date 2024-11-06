import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get all customers except the one with the given customer_id.
 * Use this to select parent entity for a customer.
 * @param {number} customer_id  the customer_id of the customer to exclude
 * @returns {Promise<Array>} array of customers id and legal_entity_name
 */
export async function getCustomerExceptById(customer_id) {
  console.log('[DB] getCustomerExceptById', customer_id);
  const db = await getDBConnection();

  const sql = `
    SELECT customer_id AS company_id, legal_entity_name
    FROM customer
    WHERE customer_id != @customer_id;
  `;

  const params = {
    '@customer_id': customer_id,
  };

  try {
    const stmt = await db.prepare(sql); // prevent SQL injection attacks
    const result = await stmt.all(params); // execute the statement and fetch all rows
    await stmt.finalize(); // release the statement
    return result;
  } catch (error) {
    console.error('Error fetching customers by name:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getCustomerExceptById;
