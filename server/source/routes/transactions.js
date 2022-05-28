const { Router } = require('express');
// const { Breed, Temperament } = require("../db.js");
const router = Router();

router.get("/", async (req, res, next) => {
    res.status(200)
    // try {
    //     let { name, heightMin, heightMax, weightMax, weightMin, life_span, temperament, created} = req.body;
    //     if ( name && heightMin && heightMax && weightMin && weightMax) {
    //     const newBreed = await Breed.create({
    //         name, heightMin, heightMax, weightMin, weightMax, life_span, created
    //     });
    //     await temperament.forEach(async (temperament) => {
    //         let temperamentDb = await Temperament.findAll({
    //             where: {name: temperament}
    //         });
    //         return await newBreed.addTemperament(temperamentDb);
    //     });
       
         
    //     res.status(200).send("Transaction");
    //     } else {
    //         res.send("the breed is not valid");
    //     }
    // } catch (err) {
    //     next(err)
    // }
});

module.exports = router;