const express = require('express') //build out api
const app = express()
const mongoose = require('mongoose') //to talk to db
const passport = require('passport') //to talk to microsoft identity platform
const session = require('express-session') //to stay logged in
const MongoStore = require('connect-mongo')(session) //helps w above
const connectDB = require('./config/database') //access database file . allows  to go inside config folder to get db
const authRoutes = require('./routes/auth') //route; after user send request, these 3 diff request(routes) will decide where the page end up
const homeRoutes = require('./routes/home')//route; homepage; 
const todoRoutes = require('./routes/todos')//route; todo

require('dotenv').config({path: './config/.env'}) //into config folder, get env file & enabling us to use env file in application

// Passport config
require('./config/passport')(passport) //spitting out a function; file handles all passport stuff

connectDB() //tellling function in database.js to run

app.set('view engine', 'ejs') //this is to pass our data into ejs syntax
app.use(express.static('public')) //any static file are hosted
app.use(express.urlencoded({ extended: true })) //looking at data sent to our request
app.use(express.json())//same as above

// Sessions
app.use( //as we're moving thru application, keep users logged in
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }), //store each session into mongodb to keep track of session(to be able to refresh page, etc)
    })
  )
  
// Passport middleware
app.use(passport.initialize())  //make sure passport is set up correctly 
app.use(passport.session()) //same as above

  //route files to not have to repeat code; save in diff folder
app.use('/', homeRoutes)  //if user enters url, sent to home route
app.use('/auth', authRoutes) //if user enters auth, sent to auth route
app.use('/todos', todoRoutes) // user enters todos url, sent there
 
app.listen(process.env.PORT, ()=>{  //server port
    console.log('Server is running, you better catch it!')
})    