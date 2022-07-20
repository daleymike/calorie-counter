import {
    useState
} from 'react';

const RegisterForm = ({className}) => {
    const [inputs, setInputs] = useState({
        userName : '',
        email : '',
        password : '',
        confirm : ''
    });

    const handleInput = (e) => {
        const {name, value} = e.target;
        const setInput = {};
        setInput[name] = value;
        setInputs({...inputs, ...setInput});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Hitting Submit Login');
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <h2>Register</h2>
            <div className='my-3'>
                <label className='float-start' htmlFor="userName">Name:</label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.userName}
                type="text" name="userName" id="userName" />
            </div>
            <div className='my-3'>
                <label className='float-start' htmlFor="email">Email:</label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.email}
                type="text" name="email" id="email" />
            </div>
            <div className='my-3'>
                <label className='float-start' htmlFor="password">Password:</label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.password}
                type="text" name="password" id="password" />
            </div>
            <div className='my-3'>
                <label className='float-start' htmlFor="confirm">Confirm:</label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.confirm}
                type="text" name="confirm" id="confirm" />
            </div>
            <input className='btn btn-dark' type="submit" value="Register" />
        </form>
    );
}

export default RegisterForm;