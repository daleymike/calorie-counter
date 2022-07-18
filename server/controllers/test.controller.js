const Test = require('../models/test.model');

module.exports.test = (req, res) => {
    res.json({message: 'test'})
}

module.exports.createTest = (req, res) => {
    Test.create(req.body)
    .then((test) => res.json(test))
    .catch((err) => res.json(err))
};