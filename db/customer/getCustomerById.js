import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get customer by id from the database
 * @param {number} customer_id the customer id to search for.
 * @returns {Promise<Object>} an customer object
 */
export async function getCustomerById(customer_id) {
  console.log('[DB] getCustomerById', customer_id);
  const db = await getDBConnection();

  const sql = `
    SELECT c.*, c2.legal_entity_name AS parent_entity_name ,e.first_name || ' ' || e.last_name AS owner_name
    FROM customer c
    LEFT JOIN employee e
        ON c.owner_id = e.employee_id
    LEFT JOIN customer c2
        ON c.parent_entity_id = c2.customer_id
    WHERE c.customer_id = @customer_id;
    `;

  const params = {
    '@customer_id': customer_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.get(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error fetching customer by id:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getCustomerById;
