import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Dashboard = () =>{

    // set state for the id of the user logged in - needs futher input from REDUX to complete
    const { userId } = useSelector(state => state.user);

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
    }

    // Delete query and recipe state update to remove deleted item

    const deleteFilter = (idFromBelow) => {
        
        axios.delete(`http://localhost:8000/api/recipes/${idFromBelow}`)
        .then((res)=> {
            console.log(res.data);
            const updatedRecipes = recipes.filter((recipes)=> {
                return recipes._id !==idFromBelow});
            console.log("DELETE DONE")
            setRecipes(updatedRecipes);
            console.log(updatedRecipes);

        })
        .catch((err)=> {
            console.log(err);
        })
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
                        {/* need to write if loop to run different queries based on filer state */}

                        {/* below is if loop for show all recipes -- still need to put conditional if loop for the link buttons */}
                        {recipes.map((recipe,index) =>{
                            return (
                                <tr key={recipe._id}>
                                    <td>
                                        {/* need to update to route for diplay recipe by id - put in a placeholder for now*/}
                                        <Link to={`/recipes/display/${recipe._id}`}>{recipe.name}</Link>
                                    </td>
                                    <td>{recipe.ingredients}</td>
                                    <td>{recipe.calories}</td>
                                    {userId === recipe.user_id ?
                                        <td className="d-flex justify-content-evenly">
                                            <button onClick={()=> deleteFilter(recipe._id)}>Delete</button>
                                            <Link to={`/user/recipes/edit/${recipe._id}`}>
                                                <button>Edit</button>
                                            </Link>
                                        </td> : ''
                                    }
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