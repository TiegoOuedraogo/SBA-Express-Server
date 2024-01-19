require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');
const path = require('path'); 
const app = express();

// Port Configuration
const PORT = process.env.PORT || 8000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    maxAge: 1000 * 60 * 60 * 24 
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) 
}));

// Set the view engine to ejs
app.use(expressLayouts);
app.set("views", "./views");
app.set('layout', 'layouts/main');   
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const recipeRoutes = require('./routes/recipes'); 
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

app.use('/', recipeRoutes); // Mount the recipe routes
app.use('/comments', commentRoutes); // Mount the comment routes
app.use('/auth', authRoutes); // Mount the auth routes
app.use('/recipes', recipeRoutes); // Mount the recipe routes

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
