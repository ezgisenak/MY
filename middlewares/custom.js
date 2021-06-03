const express = require('express');
const router = express.Router();
const orderRouter = require('../routes/orders');
router.get('/', async function (req, res,next) {
    try {
        orderRouter.req= req.custom;
        next();
    } catch (error) {
        console.error(error.message);
    }
},orderRouter);

router.post('/', async function (req, res,next) {
    try {
        orderRouter.req= req.custom;
        next();
    } catch (error) {
        console.error(error.message);
    }
},orderRouter);



module.exports = router;