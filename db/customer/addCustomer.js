import { getDBConnection } from '../dbConnector.js';

/**
 * Function to add an customer to the database
 * @param {object} customer customer object to add to the database
 * @returns {Promise<Object>} the result of the insert operation
 */
export async function addCustomer(customer) {
  console.log('[DB] addCustomer', customer);
  const db = await getDBConnection();

  const sql = `
    INSERT INTO customer (owner_id, parent_entity_id, legal_entity_name, country, address, industry, type)
    VALUES (@owner_id, @parent_entity_id, @legal_entity_name, @country, @address, @industry, @type);`;

  const params = {
    '@owner_id': customer.owner_id,
    '@parent_entity_id': customer.parent_entity_id,
    '@legal_entity_name': customer.legal_entity_name,
    '@country': customer.country,
    '@address': customer.address,
    '@industry': customer.industry,
    '@type': customer.type,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error adding customer:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default addCustomer;
