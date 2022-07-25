const User = require('../models/user.model');

module.exports = {
    getUserById: (req, res) => {
        User.findOne({_id: req.params.userId})
        .then((user) => res.json(user))
        .catch((err) => res.json(err))
    },
    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.userId}, req.body, {
            new: true,
            runValidators: true
        })
        .then((updatedUser) => res.json(updatedUser))
        .catch((err) => res.json(err))
    }
}