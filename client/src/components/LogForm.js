import React, {useState, useEffect} from 'react';
import axios from 'axios';

const LogForm = () => {
    const [logDate, setLogDate] = useState("");
    const [logRecipes, setLogRecipes] = useState([]);
    const [logRecipeNames, setLogRecipeNames] = useState([]);
    const [logCalories, setLogCalories] = useState(0);
    const today = new Date();
    const [allRecipes, setAllRecipes] = useState([]);
    
    

    const validateLogDate = () => logDate <= today.toISOString().split('T')[0] && logDate !== "";
    const validateLogRecipes = () => logRecipes.length >= 1;
    const validateLogCalories = () => logCalories > 0;

    const canSubmit = () => validateLogDate() && validateLogRecipes() && validateLogCalories();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hitting log submit");

        if (canSubmit()){
            console.log("Log Submitted")
            // Add log to User Logs
        }
    }

    const handleClick = (e, recipe) => {
        e.preventDefault()
        setLogRecipeNames([...logRecipeNames, recipe.name]);
        const totalCals = (logCalories + recipe.calories)
        setLogCalories(totalCals);
        // store recipe names and recipe ids seperate in state, push the ids through on submit
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes")
        .then((res) => {
            console.log(res.data.recipes)
            setAllRecipes(res.data.recipes)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return (
        <div className='container d-flex'>
            <div className="container w-75">
            <h3 className='mt-5'>Recipes</h3>
            <p>Click to Add Recipe to Log</p>
            <ul className='list-group'>
                {allRecipes.map((recipe, index) => {
                   return( <li key={index} className='list-group-item' onClick={(e) => handleClick(e, recipe)} >{recipe.name} </li>)
                })}
                
            </ul>
            </div>
            <div className="container">
            <h3 className='mt-5 mb-3'>Create Log</h3>
            <form className='form m-auto w-75' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logDate">Date of Log: <span className={validateLogDate() ? 'text-success' : 'text-danger'} >Date cannot be in the future</span></label>
                    <input className='form-control' type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)}/>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logRecipes">Recipes: <span className={validateLogRecipes() ? 'text-success' : 'text-danger'} >Recipes are Required</span></label>
                    <input className='form-control' type="text" value={logRecipeNames} onChange={(e) => setLogRecipes(e.target.value)}/>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logCalories">Total Caloires: <span className={validateLogCalories() ? 'text-success' : 'text-danger'} >Calories are required</span></label>
                    <input className='form-control' type="number" value={logCalories} onChange={(e) => setLogCalories(e.target.value)}/>
                </div>
                <div>
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>Submit Log</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LogForm;