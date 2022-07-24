const mongoose = require("mongoose");

// Create a new schema for our Recipe model

const RecipeSchema = new mongoose.Schema(
    {
        // I added Name as it was missing
        name :{
            type:String,
            required: [true, "Name is required"],
            minLength: [3, "Name must be at least 3 characters long"]
        },
        ingredients :{
            type: String,
            required: [true, "Ingredients are required"],
            minLength: [3, "Ingredients must be at least 3 characters long"]
        },
        preparation :{
            type: String,
            required: [true, "Preparation is required"],
            minLength: [1, "Preparation must have at least one step"]
        },
        calories :{
            type: Number,
            required: [true, "Calories are required"],
            min: [0, "Calories must be have at least 0 calories"],
        },
        // REDUX user ID login needs to be finished first for below to be edited

        // user_id :{
        //     type: mongoose.Schema.Types.ObjectId, ref: "User"
        // },

        user_id :{
            type:String,
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

    module.exports = mongoose.model("Recipe", RecipeSchema);





    
    
    
    
