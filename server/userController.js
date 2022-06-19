const user = require('./user.json')

let globalId = 8;

module.exports = {
  getUser: (req,res) => {
    res.status(200).send(user)
  },
  createUserPost: (req,res) => {
    let {userName, category, dishName,userImg} = req.body;

    let newUser = {
      id: globalId,
      userName: userName,
      category: category,
      dishName: dishName,
      userImg: userImg,
      likes: 0
      };
        
      user.push(newUser);
      globalId++;
      res.status(200).send(user)
  }, 
  updateUserLikes: (req,res) => {
    let {id} = req.params;
    let {type} = req.body;
    
    let index = user.findIndex(elem => Number(elem.id) === Number(id))
    
    if (user[index].likes === 5 && type === 'plus') {
      res.status(400).send('cannot go above 5')
    } else if (user[index].likes === 0 && type === 'minus') {
      res.status(400).send('cannot go below 0')
    } else if (type === 'plus') {
      user[index].likes++
      res.status(200).send(user)
    } else if (type === 'minus') {
      user[index].likes--
      res.status(200).send(user)
    } else {
      res.sendStatus(400)
    }
 }
}