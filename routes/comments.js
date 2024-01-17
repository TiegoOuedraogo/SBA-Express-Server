const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

// Route to add a comment to a recipe
router.post('/recipes/:recipeId/comments', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      
      if (!recipe) {
        req.flash('error_msg', 'Recipe not found');
        return res.redirect('back');
      }
  
      const newComment = new Comment({
        text: req.body.text,
        author: req.user._id  // for authenticate user
      });
  
      const savedComment = await newComment.save();
      
      recipe.comments.push(savedComment._id);
      await recipe.save();
  
      req.flash('success_msg', 'Comment added successfully!');
      res.redirect(`/recipes/${req.params.recipeId}`);
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Error adding comment');
      res.redirect('back');
    }
  });

// Route to edit a comment
router.put('/recipes/:recipeId/comments/:commentId', async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      
      if (!comment) {
        req.flash('error_msg', 'Comment not found');
        return res.redirect('back');
      }
  
      // check if the comment's author matches the current user
      if (comment.author.toString() !== req.user._id.toString()) {
        req.flash('error_msg', 'You do not have permission to edit this comment');
        return res.redirect('back');
      }

      comment.text = req.body.text;
      await comment.save();
  
      req.flash('success_msg', 'Comment edited successfully!');
      res.redirect(`/recipes/${req.params.recipeId}`);
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Error editing comment');
      res.redirect('back');
    }
  });

// Route to delete a comment
router.delete('/recipes/:recipeId/comments/:commentId', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipeId);
      const comment = await Comment.findById(req.params.commentId);
  
      if (!recipe || !comment) {
        req.flash('error_msg', 'Recipe or comment not found');
        return res.redirect('back');
      }
  
      //check if the comment's author matches the current user
      if (comment.author.toString() !== req.user._id.toString()) {
        req.flash('error_msg', 'You do not have permission to delete this comment');
        return res.redirect('back');
      }
  
      recipe.comments.pull(comment._id);
      await recipe.save();
      await comment.remove();
  
      req.flash('success_msg', 'Comment deleted successfully!');
      res.redirect(`/recipes/${req.params.recipeId}`);
    } catch (error) {
      console.error(error);
      req.flash('error_msg', 'Error deleting comment');
      res.redirect('back');
    }
  });
  

module.exports = router;
