const RecipeController = require('../controllers/recipe.controller');

module.exports = (app) => {
    app.get('/api/recipes', RecipeController.getAllRecipes);
    app.get('/api/recipes/:id', RecipeController.getRecipeById);
    app.post('/api/recipes', RecipeController.createRecipe);
    app.put('/api/recipes/:id', RecipeController.updateRecipe);
    app.delete('/api/recipes/:id', RecipeController.deleteRecipe);
}



