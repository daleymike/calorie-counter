Name: Calorie Counter

Project Title: calorie-counter

Project Stack: MERN, Context API, Bootstrap(Maybe React Materials package if time permits)

GitHub Repo Link: 

Project Description: This application will act as a library of recipes that users can contribute
to. Part of each recipe, will be the nutritional information(calories), which the user can then use to track
their own calories for the day. Users will be able to create a log and add in the recipes that
they ate during that day. Users will also be able to edit their logs and delete logs. Recipes
will also have full CRUD functionality.

New Programming Concecpts: 
    Utilizing Context API for state management throughout the application, using jsonwebtoken
to authorize users either within session or past session.
    If time permits, use a materials package designed for react to improve the visuals
of the application.
    Utilize .env files to hide sensitive information

Week 1 Features
    - Backend will be able to register and login users through Postman
    - Backend will be able to have full CRUD functionality for recipes
        - Create Functionality for recipes
        - Update
        - delete

    - Backend will have full CRUD functionality for logs
    - Some Front-end components will be made without backend functionality
        - Form Component for Add / Edit Recipes
        - Log Form
Week 2 Features
    - Users will be able to register and login through application front end
    - Users will have full CRUD functionality over recipes on the front end
    - Users will have full CRUD functionality over calorie log on the front end
BackLog
    - React Materials to beautify the application
    - Allowing User to upload images
    - Users will be able to save (Like) other recipes to reference later
    

User
    - Name String
    - email String
    - password String
        -minLength : 8
    - userRecipes [Recipe]
    - savedRecipes [Recipe]
    - Logs [Logs]
    - createdAt Date
    - updatedAt Date

Recipe
    - Ingredients [String]
        - Min 1
    - Steps [String]
        - Min 1
    - Calories Number
        - Min 0
    - createdBy Object.Id (Id of the user that made the recipe)
    - createdAt Date
    - updatedAt Date

Log
    - recipesEaten [Recipe]
    - logDate Date
        - No future dates
    - createdAt Date
    - updatedAt Date