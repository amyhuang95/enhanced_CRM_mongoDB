import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get customers by name from the database
 * @param {string} query the name query to search for customers.
 * @param {number} page  the page number for pagination.
 * @param {number} pageSize  the number of customers to return per page.
 * @returns {Promise<Array>} an array of customer objects
 */
export async function getCustomerByName(query, page, pageSize) {
  console.log('[DB] getCustomerByName', query);
  const db = await getDBConnection();

  const sql = `
    SELECT *
    FROM customer
    WHERE legal_entity_name LIKE @query
    ORDER BY date_created DESC
    LIMIT @pageSize
    OFFSET @offset;
  `;

  const params = {
    '@query': query + '%',
    '@pageSize': pageSize,
    '@offset': (page - 1) * pageSize,
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

export default getCustomerByName;
