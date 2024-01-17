const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const logger = require('./middleware/logger');
const methodOverride = require('method-override');//use 4 the views
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');//to store the data
const router = express.Router();
//importing routes
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(logger);
app.use(methodOverride('_method'));

app.use('/users', userRoutes);
app.use('/', commentRoutes);

// Session setup with MongoDB storage
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) 
}));

// Connect flash
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/recipes', recipeRoutes);

// Global error handler should be last
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong here!');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Passwords match
      req.session.userId = user.id; // Set user id to session
      res.redirect('/dashboard'); // Redirect to user dashboard or profile
    } else {
      req.flash('error_msg', 'Invalid credentials');
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.render('profile', { user }); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
