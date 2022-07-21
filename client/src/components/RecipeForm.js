import React, {useState} from 'react'

const RecipeForm = () => {
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [calories, setCalories] = useState(0);

    const validateIngredients = () => ingredients.length >= 1;
    const validateSteps = () => steps.length >= 1;
    const validateCalories = () => calories > 0;

    const canSubmit = () => validateIngredients() && validateSteps() && validateCalories();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hitting Recipe Submit")
        if(canSubmit()){
            console.log("Recipe Submitted")
            // Recipe Post Here
        }
    }


    return (
        <div className='container'>
            <h3 className='mt-5 mb-3'>Add Recipe</h3>
            <form className='form m-auto' onSubmit={(e) => handleSubmit(e)}>
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
                    <input className='form-control' type="text" value={calories} onChange={(e) => setCalories(e.target.value)}/>
                </div>
                <div>
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>Submit Recipe</button>
                </div>



            </form>
        </div>
    )
}

export default RecipeForm;