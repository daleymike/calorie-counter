import {
    useState
} from 'react';

const LoginForm = ({className}) => {
    const [inputs, setInputs] = useState({
        email : '',
        password : ''
    });
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const validateEmail = () => emailRegex.test(inputs.email);
    const validatePassword = () => inputs.password.length >= 8;

    const handleInput = (e) => {
        const {name, value} = e.target;
        const setInput = {};
        setInput[name] = value;
        setInputs({...inputs, ...setInput});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Hitting Submit Login');
        if(validateEmail() && validatePassword()){
            console.log('Can submit Login Request');
        }
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <h2>Register</h2>
            <div className='my-3'>
                <label className='float-start' htmlFor="email">Email:
                    <span className={validateEmail() ? 'text-success' : 'text-danger'}> Must have valid email address</span>
                </label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.email}
                type="text" name="email" id="email" />
            </div>
            <div className='my-3'>
                <label className='float-start' htmlFor="password">Password:
                    <span className={validatePassword() ? 'text-success' : 'text-danger'}> Must have valid email address</span>
                </label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.password}
                type="text" name="password" id="password" />
            </div>
            <input disabled={!validateEmail() && !validatePassword()} className='btn btn-dark' type="submit" value="Login" />
        </form>
    );
}

export default LoginForm;