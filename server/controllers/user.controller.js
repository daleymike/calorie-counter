const User = require('../models/user.model');

module.exports = {
    getUserById: (req, res) => {
        User.findOne({_id: req.params.userId})
        .then((user) => res.json(user))
        .catch((err) => res.json(err))
    }
}