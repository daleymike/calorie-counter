import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";

const Detail = (props) => {
    const [recipe, setRecipe] = useState({});
    const {userId} = useSelector(state => state.user);
    const {recipeId} = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
    	axios.get("http://localhost:8000/api/recipes/" +recipeId)
    	.then((res)=>{
	    console.log(res.data.recipe);
            setRecipe(res.data.recipe);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])



    const deleteRecipe = (recipeId) => {
        
        axios.delete(`http://localhost:8000/api/recipes/${recipeId}`)
        .then((res)=> {
            console.log(res.data);
            console.log("deleted")
            navigate("/user/dashboard")
        })
        .catch((err)=> {
            console.log(err);
        })
    }






    return (
        <div className='container'> 
        
           
            
                
                
                    <h3 className='mt-5 mb-3'>Recipe Details</h3>

                    <div className= "form m-auto">
                        <div className="form-group m-auto mt-2 mb-3" style={{width: 800}}>
                            <p>Ingredients: {recipe.ingredients}</p>
                        </div>
                                <br/>              
                        <div className="form-group m-auto mb-3" style={{width: 800}}>
                            <p>Steps: {recipe.preparation}</p>
                        </div>
                                <br/>
                        <div className="form-group m-auto mb-3 banana" style={{width: 800}}>
                            <p>calories:{recipe.calories}</p>
                        </div>
                                <br/>

                                {userId === recipe.user_id ?
                            <div>                    
                                <button style={{width: 200, marginTop: 30}} className='btn btn-white' type='submit'><Link to= {`/user/recipes/edit/${recipe._id}`}>Edit</Link></button>
                                <button style={{width: 200, marginTop: 30}} className='btn btn-danger' type='submit' onClick={()=> deleteRecipe(recipe._id)}>Delete</button>
                            </div> :''
                                }

                    </div>
                
            
             </div>
    );
           

    };

    export default Detail;
