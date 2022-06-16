require("dotenv").config();

const recipe = require('./db.json')

module.exports = {
  getRecipes: (req,res) => {
    res.status(200).send(recipe);
  },
  deleteRecipe: (req,res) => {
    let index = recipe.findIndex((elem) => elem.id === +req.params.id);
    recipe.splice(index,1)
    res.status(200).send(recipe)
  }
};

