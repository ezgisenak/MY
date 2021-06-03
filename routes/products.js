const express = require('express');
const router = express.Router();
const {  Product } = require('../models');

// users'ta kullanmadığın fonksiyonlar eksik
router.get('/', async function (req, res) {
  try {
    //const allUsers = await pool.query("SELECT * FROM users");
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});
  
router.post('/', async (req, res) => {
  const { product_name, product_count } = req.body;
  try {
    const product = await Product.create({ product_name, product_count });
    res.json(product);
    // const newUser = await pool.query("INSERT INTO users (user_name) VALUES ($1) RETURNING *", [user_name]);
    //res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  }
});

  router.put('/:id',async (req,res) => {
    try {
      const {id} = req.params;
      const {product_name} = req.body;
      const { product_count } = req.body;
      productUpdate = await pool.query('UPDATE products SET product_name = $1, product_count = $2 WHERE product_id = $3',[product_name,product_count,id]);
      res.json('Product is updated!');
    } catch (err) {
      console.error(err.message);
    }
  });
  // router.delete('/:id',(req,res)=>{
  //   try {
  //     const {id} = req.params;
  //     const deleteProduct = pool.query("DELETE FROM products WHERE product_id = $1",[id]);
  //     res.json("Product is successfully deleted!");
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // });
  
module.exports = router;
  