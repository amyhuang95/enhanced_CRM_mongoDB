import express from 'express';
import * as db from '../db/index.js';

const router = express.Router();

/**
 * GET all customers based on query
 */
router.get('/customers', async (req, res, next) => {
  const query = req.query.q || '';
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 12;
  const msg = req.query.msg || null;

  try {
    const total = await db.getCustomerCount(query);
    const customers = await db.getCustomerByName(query, page, pageSize);
    const accountManagers = await db.getSalesEmployee();
    const parentAccounts = await db.getCustomerExceptById(0);

    res.render('./pages/customer/index', {
      customers,
      query,
      msg,
      currentPage: page,
      lastPage: Math.ceil(total / pageSize),
      accountManagers,
      parentAccounts,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET single customer based on customer id
 */
router.get('/customers/:customer_id/edit', async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const msg = req.query.msg || null;
  try {
    const customer = await db.getCustomerById(customer_id);
    const accountManagers = await db.getSalesEmployee();
    const parentAccounts = await db.getCustomerExceptById(customer_id);
    // let customers = await db.getCustomerByOwnerId(employee_id); // get all opptys for this customer

    console.log('customer ', {
      customer,
      // opptys,
      msg,
    });

    res.render('./pages/customer/edit', {
      customer,
      accountManagers,
      parentAccounts,
      // opptys,
      msg,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST request to add a new customer
 */
router.post('/addCustomer', async (req, res, next) => {
  const customer = req.body;

  try {
    const addCustomer = await db.addCustomer(customer);
    console.log('Added', addCustomer);
    res.redirect('/customers/?msg=Customer Added');
  } catch (err) {
    console.log('Error adding customer', err);
    next(err);
  }
});

/**
 * POST to update a customer by id
 */
router.post('/customers/:customer_id/edit', async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const customer = req.body;
  console.log('update body', customer);

  try {
    const updateResult = await db.updateCustomerById(customer_id, customer);
    console.log('update', updateResult);

    if (updateResult && updateResult.changes === 1) {
      res.redirect('/customers/?msg=Updated');
    } else {
      res.redirect('/customers/?msg=Error Updating');
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST request to update owner id for a customer
 */
router.post('/customers/:customer_id/updateOwner', async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const owner_id = req.body.owner_id;

  try {
    const updateResult = await db.updateOwnerById(customer_id, owner_id);
    console.log('update', updateResult);

    if (updateResult && updateResult.changes === 1) {
      res.redirect(`/customers/${customer_id}/edit?msg=Owner Updated`);
    } else {
      res.redirect(`/customers/${customer_id}/edit?msg=Error Updating Owner`);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST request to update parent entity id for a customer
 */
router.post('/customers/:customer_id/updateParent', async (req, res, next) => {
  const customer_id = req.params.customer_id;
  const parent_entity_id = req.body.parent_entity_id;

  try {
    const updateResult = await db.updateParentById(
      customer_id,
      parent_entity_id
    );
    console.log('update', updateResult);

    if (updateResult && updateResult.changes === 1) {
      res.redirect(`/customers/${customer_id}/edit?msg=Parent Entity Updated`);
    } else {
      res.redirect(
        `/customers/${customer_id}/edit?msg=Error Updating Parent Entity`
      );
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET request to delete a customer by id
 */
router.get('/customers/:customer_id/delete', async (req, res, next) => {
  const customer_id = req.params.customer_id;

  try {
    const deleteResult = await db.deleteCustomerById(customer_id);
    console.log('delete', deleteResult);

    if (deleteResult && deleteResult.changes === 1) {
      res.redirect('/customers/?msg=Deleted');
    } else {
      res.redirect('/customers/?msg=Error Deleting');
    }
  } catch (err) {
    next(err);
  }
});

export { router as customerRouter };
