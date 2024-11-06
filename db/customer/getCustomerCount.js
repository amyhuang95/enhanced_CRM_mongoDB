import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get the count of customers by name from the database
 * @param {string} query the name query to search for customers.
 * @returns {Promise<number>} number of customers
 */
export async function getCustomerCount(query) {
  console.log('[DB] getCustomerCount', query);
  const db = await getDBConnection();

  const sql = `
    SELECT COUNT(*) AS count
    FROM customer
    WHERE legal_entity_name LIKE @query;`;

  const params = {
    '@query': query + '%',
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.get(params);
    await stmt.finalize();
    return result.count;
  } catch (error) {
    console.error('Error fetching customer count:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getCustomerCount;
