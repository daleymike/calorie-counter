const Recipe = require('../models/recipe.model');


// create a new recipe
module.exports.createRecipe = (req, res) => {
    Recipe.create(req.body)
        .then(recipe => {
            res.json({recipe: recipe});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })


}

// get all recipes
module.exports.getAllRecipes = (req, res) => {
    Recipe.find()
        .then(recipes => {
            res.json({recipes: recipes});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })  
}

// get a recipe by id
module.exports.getRecipeById = (req, res) => {
    Recipe.findOne({_id: req.params.id})
        .then(recipe =>  {
            res.json({recipe: recipe});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
}

// update a recipe **updated controller to run validators
module.exports.updateRecipe = (req, res) => {
    Recipe.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators:true}
    )
        .then(recipe => {
            res.json({recipe: recipe});
    })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
    
}

// delete a recipe
module.exports.deleteRecipe = (req, res) => {
    Recipe.deleteOne({_id: req.params.id})
        .then(recipe => {
            res.json({recipe: recipe});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
}



