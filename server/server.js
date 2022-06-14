require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const controllerFile = require("./controller");

app.use(express.json())
app.use(cors())

app.get("/api/recipe", controllerFile.getRecipes);
app.delete("/api/recipe:id", controllerFile.deleteRecipe);
app.put("/api/recipe/:id", controllerFile.updateRecipe);

app.listen(SERVER_PORT, () => console.log(`It's OVER ${SERVER_PORT}`))