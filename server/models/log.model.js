const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
    {
        recipesEaten :{
            type: [mongoose.Schema.Types.ObjectId],
            required: [true, "Recipes Eaten are required"],
            minLength: [3, "Recipes Eaten must be at least 3 characters long"]
        },
        caloriesEaten :{
            type: Number,
            required: [true, "Calories Eaten are required"],
            min: [0, "Calories Eaten must be have at least 0 calories"],
        },
        logDate : {
            type : Date,
            required : true,
            default : new Date()
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
            default : new Date(),
            immutable : true
        }
});


module.exports = mongoose.model("Log", LogSchema);