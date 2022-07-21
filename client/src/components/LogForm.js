import React, {useState} from 'react';

const LogForm = () => {
    const [logDate, setLogDate] = useState("");
    const [logRecipes, setLogRecipes] = useState([]);
    const [logCalories, setLogCalories] = useState(0);
    const today = new Date();
    
    

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

    return (
        <div className='container'>
            <h3 className='mt-5 mb-3'>Create Log</h3>
            <form className='form m-auto' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logDate">Date of Log: <span className={validateLogDate() ? 'text-success' : 'text-danger'} >Date cannot be in the future</span></label>
                    <input className='form-control' type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)}/>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logRecipes">Recipes: <span className={validateLogRecipes() ? 'text-success' : 'text-danger'} >Recipes are Required</span></label>
                    <input className='form-control' type="text" value={logRecipes} onChange={(e) => setLogRecipes(e.target.value)}/>
                </div>
                <div className='form-group m-auto mt-2 mb-3'>
                    <label htmlFor="logCalories">Total Caloires: <span className={validateLogCalories() ? 'text-success' : 'text-danger'} >Calories are required</span></label>
                    <input className='form-control' type="text" value={logCalories} onChange={(e) => setLogCalories(e.target.value)}/>
                </div>
                <div>
                    <button style={{width: 200, marginTop: 30}} className='btn btn-outline-dark form-control' type='submit'>Submit Log</button>
                </div>
            

            </form>

        </div>
    )
}

export default LogForm;