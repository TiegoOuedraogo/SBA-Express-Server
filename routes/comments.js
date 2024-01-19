const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Submit a Comment
router.post('/submit/:recipeId', async (req, res) => {

    const { text } = req.body;
    const recipeId = req.params.recipeId;
    //const userId = req.user._id;

    try {
        const newComment = new Comment({
            text,
            recipe: recipeId,
            // userId: userId
        });

        await newComment.save();
        res.redirect('/recipes/view/' + recipeId); // Redirect back to the recipe view
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
});

// Optionally, you can add a route to view comments for a recipe
router.get('/view/:recipeId',  async (req, res) => {
    try {
        const comments = await Comment.find({ recipe: req.params.recipeId }).populate('author');
        res.render('comments/view', { comments }); // Render a view showing comments
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

