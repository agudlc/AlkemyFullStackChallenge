const { Router } = require('express');
const { User, Transactions } = require("../../db");
const router = Router();

router.post("/", async (req, res, next) => {
    res.status(200)
    
});

module.exports = router;