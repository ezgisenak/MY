let express = require('express');
let router = express.Router();
const orderRouter = require('./orders');
const customRouter = require('../middlewares/custom');
const { User } = require('../models');
require('dotenv').config();
const authenticationRouter = require('../middlewares/auth');
const crypto = require('crypto');
const validatePassword = require('../validation/validatePassword');

//TODO 
router.use('/:id/orders', (req, res, next) => {
  req.custom = req.params.id;
  next();
}, customRouter);


router.use('/orders', orderRouter);

router.get('/', async function (req, res) {
  try {
    //const allUsers = await pool.query("SELECT * FROM users");
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', authenticationRouter, async (req, res) => {
  try {
    

    // const user = await pool.query("SELECT * FROM users WHERE user_id = ($1)", [id]);
    const user = await User.findOne({
      where: { id }
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


//TODO
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name } = req.body.user;
    userUpdate = await pool.query('UPDATE users SET user_name = $1 WHERE user_id = $2', [user_name, id]);
    res.json('User is updated!');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

//Post is done, !!!!! post yapamazsa id'yi yine de 1 artırıyor??? 
router.post('/', async (req, res) => {
  const { user_name, email, role } = req.body;
  let {password} = req.body;

const validPassword = validatePassword(password);
if(validPassword){
  try {  
    password = crypto.createHash('md5').update(password).digest('hex');
    const user = await User.create({ user_name, email, role, password});
    
   // const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET);
    res.json(user);   //accessToken : accessToken ??
    // const newUser = await pool.query("INSERT INTO users (user_name) VALUES ($1) RETURNING *", [user_name]);
    //res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  }
}
else{
  res.send('Invalid Password!');
}

  
});

// //TODO
// router.delete('/:id', (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteUser = pool.query('DELETE FROM users WHERE user_id = $1', [id]);
//     res.json('User is successfully deleted!');
//   } catch (err) {
//     console.error(err.message);
//   }
// });


module.exports = router;
