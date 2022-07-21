const mongoose = require("mongoose");

// Create a new schema for our Recipe model

const RecipeSchema = new mongoose.Schema(
    {
        ingredients :{
            type: String,
            required: [true, "Ingredients are required"],
            minLength: [3, "Ingredients must be at least 3 characters long"]
        },
        prepartion :{
            type: String,
            required: [true, "Preparation is required"],
            minLength: [1, "Preparation must have at least one step"]
        },
        calories :{
            type: Number,
            required: [true, "Calories are required"],
            min: [0, "Calories must be have at least 0 calories"],
        },
        // Not sure if this is the best way to do this
        user_id :[{
            type: UserSchema.Types.ObjectId, ref: "User"
        }],

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





    
    
    
    
