const LogController = require('../controllers/log.controller');

module.exports = (app) => {
    app.get('/api/logs', LogController.getAllLogs);
    app.get('/api/logs/:id', LogController.getLogById);
    app.post('/api/logs', LogController.createLog);
    app.put('/api/logs/:id', LogController.updateLog);
    app.delete('/api/logs/:id', LogController.deleteLog);
}

