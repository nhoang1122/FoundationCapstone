const user = require('./user.json')

module.exports = {
    getUser: (req,res) => {
        res.status(200).send(user)
      }
}