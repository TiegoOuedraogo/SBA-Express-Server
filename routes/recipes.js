const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Route to display all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to create a new recipe (POST)
router.post('/', async (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  
  //validation
  if (!title || !description || !ingredients || !instructions) {
    req.flash('error_msg', 'Please fill in all fields');
    return res.redirect('/recipes/new');
  }

  try {
    const newRecipe = new Recipe({ title, description, ingredients, instructions });
    await newRecipe.save();
    req.flash('success_msg', 'Recipe added successfully!');
    res.redirect('/recipes');
  } catch (error) {
    req.flash('error_msg', 'Error adding recipe');
    res.status(500).send(error.message);
  }
});

// Route to fetch a form for editing a recipe (GET)
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      req.flash('error_msg', 'Recipe not found');
      return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
  } catch (error) {
    req.flash('error_msg', 'Error loading recipe for edit');
    res.status(500).render('error', { error: error.message });
  }
});

// Route to update a recipe (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions } = req.body;
  
  // Validation
  if (!title || !description || !ingredients.length || !instructions) {
    req.flash('error_msg', 'Please fill in all fields');
    return res.redirect(`/recipes/${id}/edit`);
  }

  try {
    await Recipe.findByIdAndUpdate(id, { title, description, ingredients, instructions }, { new: true });
    req.flash('success_msg', 'Recipe updated successfully!');
    res.redirect(`/recipes/${id}`);
  } catch (error) {
    req.flash('error_msg', 'Error updating recipe');
    res.status(500).render('error', { error: error.message });
  }
});

// Route to delete a recipe (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Recipe deleted successfully!');
    res.redirect('/recipes');
  } catch (error) {
    req.flash('error_msg', 'Error deleting recipe');
    res.redirect('/recipes');
  }
});

module.exports = router;

