import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecipeForm = () => {
    const { userId } = useSelector(state => state.user);
    const { recipeId } = useParams();
    
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [calories, setCalories] = useState(0);

    const validateName = () => name.length > 0;
    const validateIngredients = () => ingredients.length >= 1;
    const validateSteps = () => steps.length >= 1;
    const validateCalories = () => calories > 0;

    const canSubmit = () => validateIngredients() && validateSteps() && validateCalories();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Hitting Recipe Submit")
        if(canSubmit()){
            console.log("Recipe Submitted")
            const submitData = {
                name,
                ingredients,
                preparation : steps,
                calories,
                user_id : userId
            };
            const result = await fetch('http://localhost:8000/api/recipes',{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accepts' : 'application/json'
                },
                method : 'POST',
                body : JSON.stringify(submitData)
            }).then(res => res.json());
            console.log(result);
        }
    }


    return (
        <div className='container'>
            <h3 className='mt-5 mb-3'>Add Recipe</h3>
            <form className='form m-auto' onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group m-auto mt-2 mb-3" style={{width: 800}}>
                    <label htmlFor="name">Recipe Name: <span className={validateName() ? 'text-success' : 'text-danger'} >Name is Required</span></label>
                    <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group m-auto mt-2 mb-3" style={{width: 800}}>
                    <label htmlFor="ingredients">Ingredients: <span className={validateIngredients() ? 'text-success' : 'text-danger'} >Ingredients are Required</span></label>
                    <input className='form-control' type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                </div>
                <div className="form-group m-auto mb-3" style={{width: 800}}>
                    <label htmlFor="steps">Steps: <span className={validateSteps() ? 'text-success' : 'text-danger'} >Steps are Required</span></label>
                    <input className='form-control' type="text" value={steps} onChange={(e) => setSteps(e.target.value)}/>
                </div>
                <div className="form-group m-auto mb-3 banana" style={{width: 800}}>
                    <label htmlFor="calories">Calories: <span className={validateCalories() ? 'text-success' : 'text-danger'} >Calories are Required</span></label>
                    <input className='form-control' type="number" value={calories} onChange={(e) => setCalories(e.target.value)}/>
                </div>
                <div>
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>Submit Recipe</button>
                </div>



            </form>
        </div>
    )
}

export default RecipeForm;