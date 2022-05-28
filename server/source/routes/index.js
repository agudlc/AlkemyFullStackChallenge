const { Router } = require('express');
const transaction = require("./transaction");
const user = require("./user");
const router = Router();

router.use('/transaction', transaction);
router.use('/user', user);

module.exports = router;
