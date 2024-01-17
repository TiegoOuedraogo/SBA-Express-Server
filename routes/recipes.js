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
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to fetch a form for editing a recipe (GET)
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit', { recipe });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update a recipe (PUT)
router.put('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/recipes/' + req.params.id);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to delete a recipe (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
