import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecipeForm = () => {
    const nav = useNavigate();
    const { userId } = useSelector(state => state.user);
    const { recipeId } = useParams();
    
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [calories, setCalories] = useState(0);

    const [editMode, setEditMode] = useState(false);

    const validateName = () => name.length > 0;
    const validateIngredients = () => ingredients.length >= 1;
    const validateSteps = () => steps.length >= 1;
    const validateCalories = () => calories > 0;

    const canSubmit = () => validateIngredients() && validateSteps() && validateCalories();

    useEffect(() => {
        const getRecipe = async () => {
            if(recipeId){
                const {recipe} = await fetch(`http://localhost:8000/api/recipes/${recipeId}`)
                    .then(res => res.json());
                console.log(recipe);
                if(userId === recipe.user_id){
                    console.log('Can Edit!!!');
                    setName(recipe.name);
                    setIngredients(recipe.ingredients);
                    setSteps(recipe.preparation);
                    setCalories(recipe.calories);
                    setEditMode(true);
                }else{ nav('/user/dashboard')}
            }
            else{ setEditMode(false); }
        }
        getRecipe();
    }, []);


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
            const result = await fetch(`http://localhost:8000/api/recipes${editMode ? `/${recipeId}`:''}`,{
                headers : {
                    'Content-Type' : 'application/json',
                    'Accepts' : 'application/json'
                },
                method : editMode ? 'PUT' : 'POST',
                body : JSON.stringify(submitData)
            }).then(res => res.json());
            console.log(result);
        }
    }


    return (
        <div className='container'>
            <h3 className='mt-5 mb-3'>{editMode ? 'Edit' : 'Create'} Recipe</h3>
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
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>{editMode ? 'Submit Recipe Updates' : 'Submit New Recipe'}</button>
                </div>



            </form>
        </div>
    )
}

export default RecipeForm;