const { Router } = require('express');
const { User, Transactions } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
    try {
        let { concept, amount, type, category, userId} = req.body;
        if ( concept && amount && type && category && userId) {
        const newTransaction = await Transactions.create({
            concept, amount, type, category, userId
        });

        res.status(200);
        return res.json(newTransaction);
        } else {
            res.send("hehe");
        }
    } catch (err) {
        next(err)
    }
});

module.exports = router;