let express = require('express');
let router = express.Router();

const { User } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;
const crypto = require('crypto');

router.get('/', async (req, res) => {
    try {
      let { user_name, password } = req.body;
      password = crypto.createHash('md5').update(password).digest('hex');
      const user = await User.findOne({
        where: {
          user_name: user_name,
          password: password
        }
      });
      if (user) {
        const accessToken = jwt.sign({ user_name: user.user_name, role: user.role }, ACCESS_TOKEN_SECRET);
        res.send({ accessToken });
      }
      else {
        res.send('Invalid username or password');
      }
    } catch (err) {
      console.log(err);
    }
  });
  
module.exports = router;  