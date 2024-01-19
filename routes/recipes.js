const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

// List all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("authorId");
        res.render('recipes/list', {
            layout: 'layouts/main',
            recipes: recipes
        });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Display form to submit a new recipe
router.get('/submit', (req, res) => {
    res.render('recipes/submit', { layout: 'layouts/main' });
});

// Handle submission of a new recipe
router.post('/submit', async (req, res) => {
    try {
        const { title, description, ingredients, preparation } = req.body;
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            preparation
        });
        await newRecipe.save();
        res.redirect('/recipes'); 
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// View a single recipe by ID
router.get('/view/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('authorId');
        const comments = await Comment.find({ recipe: req.params.id }).populate('author');
        res.render('recipes/view', {
            layout: 'layouts/main',
            recipe: recipe,
            comments: comments
        });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Display form to edit a recipe
router.get('/edit/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send('Recipe not found');
        }
        res.render('recipes/edit', {
            layout: 'layouts/main',
            recipe: recipe
        });
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Handle edit form submission
router.post('/edit/:id', async (req, res) => {
    const { title, description, ingredients, preparation } = req.body;
    try {
        await Recipe.findByIdAndUpdate(req.params.id, {
            title,
            description,
            ingredients,
            preparation
        }, { new: true });
        res.redirect('/recipes/view/' + req.params.id); 
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

// Delete a recipe
router.post('/delete/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/recipes'); 
    } catch (error) {
        res.status(500).send('Server error: ' + error.message);
    }
});

module.exports = router;
