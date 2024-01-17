const express = require('express');
const route = require.Router();
const Recipe = require('../models/recipe');

//route to display all recipes

route
.get('/',async(req,res)=>{
    const recipes = await Recipe.find({});
    res.render('recipes/index',{recipes})
})