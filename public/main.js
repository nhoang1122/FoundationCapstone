const sandwichContainer = document.querySelector('#sandwiches')
const seafoodContainer = document.querySelector('#seafood')
const meatContainer = document.querySelector('#meat')
const breakfastContainer = document.querySelector('#breakfast')
const pastaContainer = document.querySelector('#pasta')
const container = document.querySelector('#container')
const userContainer = document.querySelector('#user-container')
const profileContainer = document.querySelector('#profile-container')

const baseURL = `http://localhost:9000/api/recipe`;
const userUrl = `http://localhost:9000/api/user`;

const getAllRecipes = () => {
    axios
    .get(baseURL)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const getAllUsers = () => {
    axios
    .get(userUrl)
    .then(({data:user}) => displayUserCard(user))
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

const deleteRecipe = id => {
    axios
    .delete(`${baseURL}/${id}`)
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const updateRecipe = (id,type) => {
    axios
    .put(`${baseURL}/${id}`,{type})
    .then(({data:recipe}) => displayRecipes(recipe))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const createRecipeCard = (recipe) => {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `<img src=${recipe.imageURL} class="recipe-cover"/>
    <p class="recipe-name">${recipe.name}</p>
    <p class="recipe-type">Category : ${recipe.type}</p>
    <div class="btns-container">
        <button onclick="updateRecipe(${recipe.id},'minus')">-</button>
        <p class="recipe-rating">${recipe.rating} STARS</p>
        <button onclick="updateRecipe(${recipe.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteRecipe(${recipe.id})">DELETE</button>
    <button id="add">ADD TO LIST</button>
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

const createUserCard = (user) => {
    const userCard = document.createElement('div')
    userCard.classList.add('user-card')
    userCard.innerHTML = `<img src="${user.userImg}" class="user-cover"/>
    <p class="user-dish">${user.dishName}</p>
    <p class="user-cat">Category : ${user.category}</p>
    <p class="user-title">By : ${user.userName}</p>
    `
    userContainer.appendChild(userCard);
}

const displayUserCard = (arr) => {
    userContainer.innerHTML=``
    for (let i = 0; i <arr.length; i++) {
        createUserCard(arr[i])
    }
}


getAllRecipes()
getAllUsers()