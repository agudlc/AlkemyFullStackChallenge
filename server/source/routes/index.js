const { Router } = require('express');
const transaction = require("./transaction");
const transactions = require("./transactions");
const balance = require("./balance");
const deleteTransaction = require("./deleteTransaction");
const editTransaction = require("./editTransaction");
const user = require("./user");
const login = require("./login/login");
const logout = require("./login/logout");
const router = Router();

router.use('/transaction', transaction);
router.use('/transactions', transactions);
router.use('/balance', balance);
router.use('/deleteTransaction', deleteTransaction);
router.use('/editTransaction', editTransaction);
router.use('/user', user);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;
