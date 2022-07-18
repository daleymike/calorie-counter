const TestController = require('../controllers/test.controller');

module.exports = (app) => {
    app.get('/api', TestController.test);
    app.post('/api/test', TestController.createTest);
}