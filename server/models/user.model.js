const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    userRecipes : {
        type : [Schema.Types.ObjectId],
        default : []
    },
    savedRecipes : {
        type : [Schema.Types.ObjectId],
        default : []
    },
    userLogs : {
        type : [Schema.Types.ObjectId],
        default : []
    },
    createdAt : {
        type : Date,
        required : true,
        default : new Date(),
        immutable : true
    },
    updatedAt : {
        type : Date,
        required : true,
        default : new Date()
    }
});

module.exports = model('users', userSchema);