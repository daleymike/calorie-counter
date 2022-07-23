import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Dashboard = () =>{

    // recipes state
    const [recipes, setRecipes] = useState([]);
    
    // Get request to populate recipes state

    useEffect(() => {
        axios.get('http://localhost:8000/api/recipes')
            .then((res) => {
                console.group(res.data.recipes);
                setRecipes(res.data.recipes);
                console.log("recipes set to state!")
            })
            .catch((err) =>{
                console.log(err.res);
            });
    },[]);

    // filter state setting - set to all recipes on default
    const [ filter, setFilter] = useState('all_recipes');
    

    // Change filter setting in state
    const handleChange = e =>{
        console.log(e.target.value+" target value");
        setFilter(e.target.value);
        console.log(filter+" state value")
    }



    return (
        <div className='container'>

            {/* Need to get CSS for padding on label and margin between buttons */}
            <div className="d-flex flex-row justify-content-sm-start mt-3 mb-3" >
                <div className="radio">
                    <input 
                        type="radio" 
                        value="user_recipes" 
                        checked={ filter === "user_recipes"}
                        onChange={handleChange}
                        name="filter"/>My Recipes
                </div>
                <div className="radio">
                    <input 
                        type="radio" 
                        value="user_faves" 
                        checked={ filter === "user_faves"}
                        onChange={handleChange}
                        name="filter"/>My Favorites
                </div>
                <div className="radio">
                    <input 
                        type="radio" 
                        value="all_recipes"
                        checked={ filter === "all_recipes"}
                        onChange={handleChange}
                        name="filter"/>All Recipes
                </div>
            </div>
            <div>
                <table className="table border">
                    <thead className="table-dark">
                        <tr>
                            <th>Recipe Name</th>
                            <th>Ingredients</th>
                            <th>Calories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe,index) =>{
                            return (
                                <tr>
                                    <td>
                                        {/* need to update to route for diplay recipe by id - put in a placeholder for now*/}
                                        <Link to={'/recipes/display/:recipe_id'}>{recipe.name}</Link>
                                    </td>
                                    <td>{recipe.ingredients}</td>
                                    <td>{recipe.calories}</td>
                                    <td className="d-flex justify-content-evenly">

                                        {/* need to update to route to edit recipe by id - put in  placeholder for now */}
                                        <Link to={`/recipe/edit/${recipe._id}`}>
                                            <button>Edit</button>
                                        </Link>

                                        {/* need to update to route to delete recipe by id - put in  placeholder for now */}
                                        <Link to={`/recipe/destroy/${recipe._id}`}>
                                            <button>Delete</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;