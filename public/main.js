const sandwichContainer = document.querySelector('#sandwiches')
const seafoodContainer = document.querySelector('#seafood')
const meatContainer = document.querySelector('#meat')
const breakfastContainer = document.querySelector('#breakfast')
const pastaContainer = document.querySelector('#pasta')
const container = document.querySelector('#container')
const userContainer = document.querySelector('#user-container')
const profileContainer = document.querySelector('#profile-container')
const form = document.querySelector('form')

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

const createUserPost = body => {
    axios
    .post(userUrl, body)
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

const updateUserLikes = (id,type) => {
    axios
    .put(`${userUrl}/${id}`,{type})
    .then(({data:user}) => displayUserCard(user))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const submitHandler = (e) => {
    e.preventDefault()

    let dishName = document.querySelector('#dish-name');
    let userName = document.querySelector('#your-name');
    let category = document.querySelector('#cat');
    let userImg = document.querySelector('#dish-pic');

    let bodyObj = {
        dishName: dishName.value,
        userName: userName.value,
        category: category.value,
        userImg: userImg.value
    }

    createUserPost(bodyObj)

    dishName.value=''
    userName.value=''
    category.value=''
    userImg.value=''
}

const createRecipeCard = (recipe) => {

    let title = recipe.name;

    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `<img src=${recipe.imageURL} class="recipe-cover"/>
    <p class="recipe-name">${recipe.name}</p>
    <p class="recipe-type">Category : ${recipe.type}</p>
    <button type="button" class="btn-read"  data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Join Our Subscription!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            Would you like to learn how to make this recipe?
            <pre>
            </pre>

            Subscribe for a low price of $12.99/month!

            <pre>
            </pre>

        </div>
        <div class="modal-footer">
            <a id="join-btn" href="./join.html">JOIN</a>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    <button class="btn-read" onclick="deleteRecipe(${recipe.id})">NOT INTERESTED</button>
    `
    container.appendChild(recipeCard)
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
    <div class="like-container">
        <button class="btn-like" onclick="updateUserLikes(${user.id},'minus')">-</button>
        <p class="">${user.likes} LIKES</p>
        <button class="btn-like" onclick="updateUserLikes(${user.id}, 'plus')">+</button>
    </div>
    `
    userContainer.appendChild(userCard);
}

const displayUserCard = (arr) => {
    userContainer.innerHTML=``
    for (let i = 0; i <arr.length; i++) {
        createUserCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllRecipes()
getAllUsers()




{/* <button onclick="deleteRecipe(${recipe.id})">DELETE</button> */}