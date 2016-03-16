var express = require('express');
var path = require('path')
//STEP 6 - Find Section 1 code below and paste it here

///////////////////
//// Section 1 ////
///////////////////

var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');


var app = express();
var port = 8000;
// STEP 5 - Server your public files to the browser here

app.use(express.static(path.join(__dirname, 'public')));

// STEP 1 - Fire up your server, and make sure you get the console.log in your terminal
// STEP 2 - Code here for your endpoint:

app.get('/api/test', function(req,res) {
	res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  })
	.send(JSON.stringify({message: 'this endpoint is connected!! hooray!'}));
	// console.log(__dirname);
})

app.options('/', function(req, res) {
  res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send();
});

// STEP 3 - Test this endpoint with Postman (You will need to download postman if you haven't already)

// STEP 4 - In the public directory, build an Angular app that you can use to test this api. You should 
// have these three connecting peices in your Angular app: authView, authCtrl, and the listService. 

// STEP 7 - Find Section 2 code below and paste it here

///////////////////
//// Section 2 ////
///////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));


app.use(session({
    secret: 'carpediem',
    saveUninitialized: false,
    resave: false
}));

var isAuthenticated = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        return res.status(403).send('Please login first')
    }
}


// Step 8 - Uncomment all the code from the angular app, and test your trello app again. You should take a
// minute to look through all of the HTTP requests that are happening on the front end, and find the matching
// endpoints here in the server, so that you can get a feel for how the connection is happening betweent the 
// front end and the server.


app.listen(port, function() {
    console.log('Server listening on port ' + port);
});







// /**************** API Controller *************/
var UserCtrl = require('./api/controllers/UserCtrl.js');
var ListCtrl = require('./api/controllers/ListCtrl.js')


// /**************** API *************/

app.post('/auth/login', UserCtrl.login);

app.get('/auth/logout', UserCtrl.logout);

app.get('/api/getLists', isAuthenticated, ListCtrl.getLists)

app.post('/api/addList', isAuthenticated, ListCtrl.addList);

app.post('/api/deleteList', isAuthenticated, ListCtrl.deleteList);

app.post('/api/addCard', isAuthenticated, ListCtrl.addCard);

app.post('/api/deleteCard', isAuthenticated, ListCtrl.deleteCard);

app.post('/api/moveCard', isAuthenticated, ListCtrl.moveCard);

// /************ END API *************/


// /*************** DB ***************/
var mongoUri = 'mongodb://localhost:27017/betterTodo';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to db at ' + mongoUri)
});
