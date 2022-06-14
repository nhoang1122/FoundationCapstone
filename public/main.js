const sandwichContainer = document.querySelector('#sandwiches')
const seafoodContainer = document.querySelector('#seafood')
const meatContainer = document.querySelector('#meat')
const breakfastContainer = document.querySelector('#breakfast')
const pastaContainer = document.querySelector('#pasta')
const container = document.querySelector('#container')

const baseURL = `http://localhost:9000/api/recipe`

const getAllRecipes = () => {
    axios
    .get(baseURL)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const createRecipe = body => {
    axios
    .post(baseURL, body)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const deleteRecipe = (id) => {
    axios
    .delete(`${baseURL}/${id}`)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const updateRecipe = (id,type) => {
    axios
    .put(`${baseURL}/${id}`,`${type}`)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const createRecipeCard = (recipe) => {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `<p class="recipe-name">${recipe.name}</p>
    <p class"recipe-type">${recipe.type}</p>
    <div class="btns-container">
        <button onclick="updateRecipe(${recipe.id}, 'minus')">-</button>
        <p class="recipe-rating">${recipe.rating} STARS</p>
        <button onclick="updateRecipe(${recipe.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteRecipe(${recipe.id})">DELETE</button>
    `

    container.appendChild(recipeCard)
    // if(recipe.type === "Meat") {
    //     meatContainer.appendChild(recipeCard)
    // } else if(recipe.type === "Pasta") {
    //     pastaContainer.appendChild(recipeCard) 
    // } else if(recipe.type === "Sandwich") {
    //     sandwichContainer.appendChild(recipeCard) 
    // } else if(recipe.type === "Seafood") {
    //     seafoodContainer.appendChild(recipeCard) 
    // } else if(recipe.type === "Breakfast") {
    //     breakfastContainer.appendChild(recipeCard)
    // }
}

const displayRecipes = (arr) => {
    
    container.innerHTML = ``
    
    for (let i = 0; i < arr.length; i++) {
        createRecipeCard(arr[i])
    }

}

getAllRecipes()