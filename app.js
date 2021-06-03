const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./models');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const app = express();
const authenticationRouter = require('./middlewares/auth');
const loginRouter = require('./routes/login');

app.listen(async () => {
  console.log('Server up on http://localhost:3000');
  await sequelize.authenticate();
  console.log('Database connected!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', authenticationRouter, usersRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);

app.use('/login', loginRouter);


//Handlebars
// app.engine('handlebars',exphbs({defaultLayout : 'main'}));
// app.set('view engine', 'handlebars');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
