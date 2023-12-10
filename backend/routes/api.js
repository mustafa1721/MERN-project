const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController');
const transactionController = require('../controllers/transactionsController');
const accountsController = require('../controllers/accountsController');

router.get('/customers', customerController.getAllCustomers);
router.get('/transactions/:accountId', transactionController.getTransactionsForAccount);
router.get('/accounts/availableProducts', accountsController.getDistinctProducts);
router.get('/showLowerTransactions', transactionController.showLowerTransactions);


module.exports = router;
