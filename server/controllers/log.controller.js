const Log = require('../models/Log.model');
const User = require('../models/user.model');

// create a new log
module.exports.createLog = (req, res) => {
    Log.create(req.body)
        .then(Log => {
            User.findOne({_id: Log.user_id})
            .then(user => {
                user.userLogs.push(Log._id);
                return user;
            }) .then(user => user.save());
            res.json({Log: Log});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
}       

// get all logs
module.exports.getAllLogs = (req, res) => {
    Log.find()
        .then(Logs => {
            res.json({Logs: Logs});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })  
}


//Get a log by id
module.exports.getLogById = (req, res) => {
    Log.findOne({_id: req.params.id})
        .then(Log =>  {
            res.json({Log: Log});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
}

//Update a log

module.exports.updateLog = (req, res) => {
    Log.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators:true}
    )
        .then(Log => {
            res.json({Log: Log});
    })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
    
}

//Delete a log
module.exports.deleteLog = (req, res) => {
    Log.findOneAndDelete({_id: req.params.id})
        .then(Log => {
            res.json({Log: Log});
        })
        .catch((err) => {
            res.json({error: err});
            console.log({message: "something went wrong"});
        })
}





