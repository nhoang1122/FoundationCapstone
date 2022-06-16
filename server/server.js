require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require("axios")

const app = express()
const controllerFile = require("./controller");
const userControllerFile = require("./userController")

const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())

app.get("/api/recipe", controllerFile.getRecipes);
app.delete("/api/recipe/:id", controllerFile.deleteRecipe);

app.get("/api/user", userControllerFile.getUser);
app.post("/api/user", userControllerFile.createUserPost);
app.put("/api/user/:id", userControllerFile.updateUserLikes);

app.listen(SERVER_PORT, () => console.log(`It's OVER ${SERVER_PORT}`))