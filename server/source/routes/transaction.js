const { Router } = require('express');
const { User, Transactions } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {

    let { category, userId, type } = req.body;
    let transactions = [];
    try {
        if (userId) {
        if (category && type) {
            transactions = await Transactions.findAll({
                where: {
                    userId: userId,
                    category: category,
                    type: type,
                }
            })
        }
        else if (category) {
            transactions = await Transactions.findAll({
                where: {
                    userId: userId,
                    category: category,
                }
            })
        } else if (type) {
            transactions = await Transactions.findAll({
                where: {
                    userId: userId,
                    type: type,
                }
            });
        } else {
            transactions = await Transactions.findAll({
                where: {
                    userId: userId
                }
            })
        }

        res.status(200);
        return res.json(transactions);
    } else {
        return res.status(403);
    }
    } catch (err) {
        next(err)
    }
}) 

router.post("/", async (req, res, next) => {
    try {
        let { concept, amount, type, category, userId} = req.body;
        if ( concept && amount && type && category && userId) {
        const newTransaction = await Transactions.create({
            concept, amount, type, category, userId
        });
        const user = await User.findByPk(userId);
        if (type === "income") {
        await user.update({
            balance: user.balance + amount
        })
        } else if (type === "expense") {
            await user.update({
                balance: user.balance - amount
            })
        } else {
            return res. status(403).send("wrong type");
        }

        res.status(200);
        return res.json(newTransaction);
        } else {
            res.send("hehe");
        }
    } catch (err) {
        next(err)
    }
});

router.delete("/", async (req, res, next) => {
    try {
        let { id } = req.body;
        if ( id ) {
        const transaction = await Transactions.findByPk(id);
        await transaction.destroy();

        res.status(200);
        return res.json("The transaction was deleted succesfully");
        } else {
            res.send("hehe");
        }
    } catch (err) {
        next(err)
    }
});

router.put("/", async (req, res, next) => {
    try {
        let { concept, amount, category, id} = req.body;
        if ( concept && amount && category && id) {
        const transaction = await Transactions.findByPk(id);
        await transaction.update({
            concept: concept,
            amount: amount,
            category: category
        });
        


        res.status(200);
        return res.json(transaction);
        } else {
            res.send("hehe");
        }


    } catch (err) {
        next(err);
    }
})


module.exports = router;