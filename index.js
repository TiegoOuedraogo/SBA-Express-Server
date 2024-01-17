const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const logger = require('./middleware/logger');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/recipes', recipeRoutes);
app.use(logger);
app.use(methodOverride('_method'));

// mongoose.connect('mongodb://localhost:27017/<dbname>', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/yourDatabaseName')
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});