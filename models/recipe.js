//Recipe.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [String],
  preparation: {
    type: String,
    required: true
  },
  
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
}

});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
