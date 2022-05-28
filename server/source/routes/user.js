const { Router } = require('express');
const session = require('express-session')
const { User, Transactions } = require("../db");
const router = Router();
const bcrypt = require('bcryptjs');

const { Client } = require('pg');
const conObject = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
};

const client = new Client(conObject);
client.connect();

// session store and session config
const store = new (require('connect-pg-simple')(session))({
    conObject,
    createTableIfMissing: true,
});

router.use(
    session({
        store: store,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            httpOnly: false,
            sameSite: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

router.post("/", async (req, res, next) => {
    try {
        let { name, email, password, } = req.body;
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        password = hashedPassword;

        if ( name && email && password ) {
        const newUser = await User.create({
            name, email, password,
        });

        const user = newUser.dataValues;

        req.session.user = {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
        };
         
        res.status(200);
        return res.json({ user: req.session.user });
        } else {
            res.send("hehe");
        };
    } catch (err) {
        next(err)
    }
});

router.post("/login", async (req, res, next) => {
    let { email, password, } = req.body;
    try {
        if ( email && password ) {
        const findUser = await User.findOne({
            where: {
                email: email,
            }
        });

        const user = findUser.dataValues;
        
        const matches = bcrypt.compareSync(password, user.password);
        if (!matches) {
            return res.sendStatus(403)
        };
        
        req.session.user = {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
        };
         
        res.status(200);
        return res.json({ user: req.session.user });
        } else {
            res.send("hehe");
        }
    } catch (err) {
        next(err)
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        await req.session.destroy();
        return res.sendStatus(200);
    } catch (err) {
        next(err)
    }
});

router.post('/fetch-user', async (req, res) => {
    if (req.sessionID && req.session.user) {
        res.status(200)
        return res.json({ user: req.session.user })
    }
    return res.sendStatus(403)
})


module.exports = router;