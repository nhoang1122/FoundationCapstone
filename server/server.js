require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require("axios")
const path = require('path')

const app = express()
const controllerFile = require("./controller");
const userControllerFile = require("./userController")

const {SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.get("/api/recipe", controllerFile.getRecipes);
app.delete("/api/recipe/:id", controllerFile.deleteRecipe);

app.get("/api/user", userControllerFile.getUser);
app.post("/api/user", userControllerFile.createUserPost);
app.put("/api/user/:id", userControllerFile.updateUserLikes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`It's OVER ${port}`))