import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, Link} from "react-router-dom";

const Detail = (props) => {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();



    useEffect(()=>{
    	axios.get("http://localhost:8000/api/recipes/" +id)
    	.then((res)=>{
	    console.log(res.data);
            setRecipe(res.data);
	})
    	.catch((err)=>{
            console.log(err);
    	})
    }, [])



    return (
        <div className='container'> 
        
           
            
                
                
                    <h3 className='mt-5 mb-3'>Recipe Details</h3>

                    <div className= "form m-auto">
                        <div className="form-group m-auto mt-2 mb-3" style={{width: 800}}>
                            <p>Ingredients: {recipe.ingredients}</p>
                        </div>
                                <br/>              
                        <div className="form-group m-auto mb-3" style={{width: 800}}>
                            <p>Steps: {recipe.steps}</p>
                        </div>
                                <br/>
                        <div className="form-group m-auto mb-3 banana" style={{width: 800}}>
                            <p>calories:{recipe.calories}</p>
                        </div>
                                <br/>


                            <div>                    
                                <button style={{width: 200, marginTop: 30}} className='btn btn-white' type='submit'><Link to= {`/user/recipes/edit/:recipeId`}>Update</Link></button>
                                <button style={{width: 200, marginTop: 30}} className='btn btn-danger ' type='submit'>Delete</button>
                            </div>
                

                    </div>
                
            
             </div>
    );
           

    };

    export default Detail;
