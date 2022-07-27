import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const LogDetails = () => {
    const nav = useNavigate();
    const {logId} = useParams();
    const { userId } = useSelector(state => state.user);
    const [logData, setLogData] = useState({});
    const [recipeData, setRecipeData] = useState({});
    // 62e06e573a5fd3bb8bcf5bc5

    useEffect(() => {
        axios.get(`http://localhost:8000/api/logs/${logId}`)
            .then(res => {
                // console.log(res.data.Log);
                setLogData(res.data.Log);
            });
        axios.get('http://localhost:8000/api/recipes')
            .then(res => res.data)
            .then(res => {
                const setRecipes = {};
                res.recipes.forEach(rec => {
                    setRecipes[rec._id] = rec.name;
                });
                setRecipeData(setRecipes);
            })
    }, []);

    const deleteLog = () => {
        axios.delete(`http://localhost:8000/api/logs/${logData._id}`)
            .then(res => {
                nav('/user/dashboard');
            });
    }


    return (
        <div className="card container">
            <h3>Log Date: <span>{logData.logDate.split('T')[0]}</span></h3>
            <hr/>
            <ul className="list-unstyled">
                <h3>Recipes for the Day:</h3>
                {logData.recipesEaten ? logData.recipesEaten.map(rec => <li key={rec}>{recipeData[rec] ? recipeData[rec] : 'Deleted Recipe'}</li>) : ''}
            </ul>
            <hr/>
            <h3>Total Calories for the Day: <span>{logData.caloriesEaten}</span></h3>
            <hr/>
            <div>
                <button onClick={()=>deleteLog()} className="mx-4 btn btn-danger">Delete</button>
                <Link to={`/user/logs/edit/${logId}`} className="mx-4 btn btn-info">Edit</Link>
            </div>
        </div>
    )
}

export default LogDetails;