var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customer=require('./routes/customer_routes');
var branch=require('./routes/branch_routes');
var role=require('./routes/role_routes');
var User=require('./routes/user_routes');
var login=require('./routes/login_routes');
var Sale=require('./routes/sale_routes');
var Stock=require('./routes/stock_routes');
var item=require('./routes/item_routes');
var saletype=require('./routes/saletype_routes');
var supplier=require('./routes/supplier_routes');
var userbranchrole=require('./routes/user_branch_role_routes');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer',customer);
app.use('/branch',branch);
app.use('/role',role);
app.use('/User',User);
app.use('/login',login);
app.use('/Sale',Sale);
app.use('/Stock',Stock);
app.use('/item',item);
app.use('/saletype',saletype);
app.use('/supplier',supplier);
app.use('/userbranchrole',userbranchrole);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
