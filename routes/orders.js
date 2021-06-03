const express = require('express');
const router = express.Router();
const productRouter = require('../routes/products');
router.use('/products', productRouter);
const {  Product, User, Order } = require('../models');
const authenticationRouter = require('../middlewares/auth');
//const {users} = require('../models/user');
const user = require('../models/user');


// router.get('/', authenticationRouter, async (req, res) => {
//     try {
//         // const query = await pool.query('SELECT t1.user_name, t2.order_name, t3.product_name ' +
//         //     'FROM users t1 INNER JOIN orders t2 ON t1.user_id = t2.user_id ' +
//         //     'INNER JOIN products t3 on t2.product_id = t3.product_id WHERE t2.user_id = $1', [req.custom]);
//         // res.send(query.rows);
//         const {user_id} = req.user;
//         const orders = await Order.findOne({
//             where: {id: req.custom,
//                 user_name: user.user_name
//             }
//         });
//         console.log(orders);
//         return res.status(200).json(orders);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// });


router.get('/all', async function (req, res) {
    try {
        // const allOrders = await pool.query("SELECT order_id, order_name, user_id, product_id FROM orders ");
        // res.json(allOrders.rows);
        const orders = await Order.findAll({include: [User,Product]});
        console.log(orders);
        return res.status(200).json(orders);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

// router.get('/',authenticationRouter, async function (req,res){

    

// });

// router.post('/', async (req, res) => {
//     try {
//         const { order_name } = req.body;
//         const user_id = req.custom;
//         const { product_name } = req.body;
//         const products = await pool.query("SELECT * FROM products WHERE product_name = $1", [product_name]);
//         const product_id = products.rows[0].product_id;
//         if (products && products.rows && products.rows.length > 0) {
//             const newOrder = await pool.query("INSERT INTO orders (order_name,user_id,product_id) VALUES (($1),($2),($3)) RETURNING *", [order_name, user_id, product_id]);
//             const { product_count } = await pool.query("SELECT product_count FROM products WHERE product_id = ($1)", [product_id]);
//             productUpdate = await pool.query("UPDATE products SET product_count = $1 WHERE product_id = $2", [product_count - 1, product_id]);
//             res.json(newOrder.rows[0]);
//         } else {
//             res.send('Product does not exist');
//         }
//     } catch (err) {
//         console.error(err.message);
//     }
// });

router.post('/', async (req, res) => {
    const { order_name, user_name, product_name } = req.body;
    try {
        const user = await User.findOne({ where: { user_name: user_name } });
        const product = await Product.findOne({ where: { product_name: product_name } });
        const order = await Order.create({ order_name, user_id: user.id, product_id: product.id });
        product.product_count -= 1;
        return res.json(order);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
