const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

 const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    }

    //save to request for use in other routes if everything is good.
    req.userId = decoded.id;
    next();
  });
};

// Protect your routes
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    if (!title || !description || !ingredients || !instructions) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      user: req.userId 
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    //Check if the current user is the author of the recipe
    if (recipe.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized.' });
    }

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    
    await recipe.save();
    res.json({ message: 'Recipe updated successfully!', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    //Check if the current user is the author of the recipe
    if (recipe.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'User not authorized.' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
});

module.exports = authMiddleware;

