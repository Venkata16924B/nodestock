const express = require('express') 
const exphbs = require('express-handlebars')
const app = express()
const path=require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API request
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_779f9aea701545f2ac22ed7447fa2ad8', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){finishedAPI(body); }; });
};

// Set Handlebars Middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!!"
// Set handlebar index GET routes
app.get('/', function (req, res) {  
    call_api(function(doneAPI){ res.render('home', { stock: doneAPI }); }, "goog");  });  //TSLA, GOOG, AAPL, FB

//call_api(function, req.body.stock_ticker ) 
// Set handlebar index POST route 
app.post('/', function (req, res) { 
    call_api(function(doneAPI) { res.render('home', { stock: doneAPI, });  } , req.body.stock_ticker    );  });


// create about page route
app.get('/about.html', function (req, res) { res.render('about'); });
// Set static folder
app.use (express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));