import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
const LogForm = () => {
    const [logDate, setLogDate] = useState("");
    const [logRecipes, setLogRecipes] = useState([]);
    const [logRecipeNames, setLogRecipeNames] = useState([]);
    const [logCalories, setLogCalories] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const today = new Date();
    const [allRecipes, setAllRecipes] = useState([]);
    const { userId } = useSelector(state => state.user);
    const navigate = useNavigate();
    const {logId} = useParams();
    
    

    const validateLogDate = () => logDate <= today.toISOString().split('T')[0] && logDate !== "";
    const validateLogRecipeNames = () => logRecipeNames.length >= 1;
    const validateLogCalories = () => logCalories > 0;

    const canSubmit = () => validateLogDate() && validateLogRecipeNames() && validateLogCalories();


    const handleClick = (e, recipe) => {
        e.preventDefault()
        setLogRecipes([...logRecipes, recipe._id]);
        setLogRecipeNames([...logRecipeNames, recipe.name]);
        const totalCals = (logCalories + recipe.calories)
        setLogCalories(totalCals);
        // store recipe names and recipe ids seperate in state, push the ids through on submit
    }

    const handleClearRecipes = () => {
        setLogRecipeNames([]);
        setLogRecipes([]);
        setLogCalories(0);
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/recipes")
        .then((res) => {
            const setVal = {};
            res.data.recipes.forEach(rec => {
                setVal[rec._id] = rec;
            });
            setAllRecipes(res.data.recipes);
            if(logId){
                const { recipes } = res.data;
                axios.get(`http://localhost:8000/api/logs/${logId}`)
                    .then(result => {
                        const log = result.data.Log;
                        if(log.user_id === userId){
                            setLogDate(log.logDate.split('T')[0]);
                            setLogRecipes(log.recipesEaten);
                            setLogRecipeNames(log.recipesEaten.map(rec => {
                                const findRec = recipes.filter(r => r._id === rec)[0];
                                return findRec.name;
                            }));
                            setLogCalories(log.caloriesEaten);
                            setEditMode(true);
                        }
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    useEffect(() => {
        if(logId){
            axios.get(`http://localhost:8000/api/logs/${logId}`)
                .then(result => {
                    const log = result.data.Log;
                    if(log.user_id === userId){
                        setLogDate(log.logDate.split('T')[0]);
                        setLogRecipes(log.recipesEaten);
                        setLogCalories(log.caloriesEaten);
                    }
                })
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hitting log submit");

        if (canSubmit()){
            console.log("log able to be submitted")
            if(editMode){
                axios.put(`http://localhost:8000/api/logs/${logId}`, {
                    logDate: logDate,
                    recipesEaten: logRecipes,
                    caloriesEaten: logCalories,
                    user_id: userId
                }
                )
                .then((res) => {
                    console.log("SUCCESS")
                    setLogDate("");
                    setLogRecipes([]);
                    setLogRecipeNames([]);
                    setLogCalories(0);
                    navigate('/user/logs')
                })
                .catch((err) => {console.log(err)})
                }
            }else{
                axios.post("http://localhost:8000/api/logs", {
                    logDate: logDate,
                    recipesEaten: logRecipes,
                    caloriesEaten: logCalories,
                    user_id: userId
                }
                )
                .then((res) => {
                    console.log("SUCCESS")
                    setLogDate("");
                    setLogRecipes([]);
                    setLogRecipeNames([]);
                    setLogCalories(0);
                    navigate('/user/logs')
                })
                .catch((err) => {console.log(err)})
                }
            }

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
            <h3 className='mt-5 mb-3'>{editMode ? 'Edit' : 'Create'} Log</h3>
            <form className='form m-auto w-75' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logDate">Date of Log: <span className={validateLogDate() ? 'text-success' : 'text-danger'} >Date cannot be in the future</span></label>
                    <input className='form-control' type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)}/>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logRecipes">Recipes: <span className={validateLogRecipeNames() ? 'text-success' : 'text-danger'} >Recipes are Required</span> </label>
                    <input className='form-control' type="text" value={logRecipeNames} onChange={(e) => setLogRecipes(e.target.value)} placeholder="Please Select Recipes from List"/>
                    <small className='clear-recipes form-text text-primary' onClick={() => {handleClearRecipes()}}>[Clear Recipes]</small>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logCalories">Total Caloires: <span className={validateLogCalories() ? 'text-success' : 'text-danger'} >Calories are required</span></label>
                    <input className='form-control' type="number" value={logCalories} onChange={(e) => setLogCalories(e.target.value)}/>
                </div>
                <div>
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>{editMode ? 'Edit' : 'Submit'} Log</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default LogForm;