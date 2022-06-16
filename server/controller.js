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
  },
  updateRecipe: (req,res) => {
    let {id} = req.params;
    let {type} = req.body;

    let index = recipe.findIndex(elem => Number(elem.id) === Number(id))

    if (recipe[index].rating === 5 && type === 'plus') {
      res.status(400).send('cannot go above 5')
    } else if (recipe[index].rating === 0 && type === 'minus') {
      res.status(400).send('cannot go below 0')
    } else if (type === 'plus') {
      recipe[index].rating++
      res.status(200).send(recipe)
    } else if (type === 'minus') {
      recipe[index].rating--
      res.status(200).send(recipe)
    } else {
      res.sendStatus(400)
    }
  }
};

