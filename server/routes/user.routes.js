const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get("/api/user/:userId", UserController.getUserById);

}