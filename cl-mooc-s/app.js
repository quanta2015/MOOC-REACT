#!/usr/bin/env node
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var router = express.Router();
var fs = require('fs');
var url = require('url');


var conf = 'mooc.json';


var moocData = fs.readFileSync(conf,'utf-8');
var moocList = JSON.parse(moocData);

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);



var marked = require('marked');
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

router.get('/getMoocDetail', function(req, res, next) {
  
  var params = url.parse(req.url, true).query;
  var id = params.id;
  var arr = id.split('-');
  var idp = parseInt(arr[0]-1);
  var idc = parseInt(arr[1]-1);
  var _path = path.join(__dirname);
  var filename =  `${_path}//mooc//${moocList[idp].name}//${moocList[idp].list[idc].file}`;
  var markData = fs.readFileSync(filename,'utf-8').replace(/\[slide\]/g,"")
  var htmlData = marked(markData);

  var ret = {
    title: `${moocList[idp].name} - ${moocList[idp].list[idc].name}`,
    content: htmlData
  };

  res.send( JSON.stringify(ret) );
});



router.get('/getMoocList', function(req, res, next) {
  // var moocData = fs.readFileSync(conf,'utf-8');
  res.send(moocData);
});


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

var debug = require('debug')('cl-moocs:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
