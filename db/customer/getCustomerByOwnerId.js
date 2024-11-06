import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get a list of customers by owner id
 * @param {int} owner_id the owner id of the customer
 * @returns {Promise<Array>} a list of customers
 */
export async function getCustomerByOwnerId(owner_id) {
  console.log('[DB] getCustomerByOwnerId', owner_id);
  const db = await getDBConnection();

  const sql = `
        SELECT *
        FROM customer
        WHERE owner_id = @owner_id;
        `;

  const params = {
    '@owner_id': owner_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.all(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error fetching customer by employee id:', error);
    throw error;
  } finally {
    await db.close();
  }
}
