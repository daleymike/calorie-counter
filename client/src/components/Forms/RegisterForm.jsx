import {
    useState
} from 'react';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../state/actions/userActions';

const RegisterForm = ({className}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        userName : '',
        email : '',
        password : '',
        confirm : ''
    });
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const validateName = () => inputs.userName !== '';
    const validateEmail = () => emailRegex.test(inputs.email);
    const validatePassword = () => inputs.password.length >= 8;
    const validateConfirm = () => validatePassword() && inputs.confirm === inputs.password;

    const canSubmit = () => validateName() && validateEmail() && validatePassword() && validateConfirm();

    const handleInput = (e) => {
        const {name, value} = e.target;
        const setInput = {};
        setInput[name] = value;
        setInputs({...inputs, ...setInput});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Hitting Submit Registration');
        if(canSubmit()){
            console.log('Can submit Registration!!');
            // Registration call here
            const tryRegister = await dispatch(registerUser(inputs));
            if(registerUser.fulfilled.match(tryRegister) && tryRegister.payload.success){
                setInputs({
                    userName : '',
                    email : '',
                    password : '',
                    confirm : ''
                });
                alert('You successfully registered!');
            }else{ alert('Invalid Credentials!'); }
        }
    }
    
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={className}>
            <h2>Register</h2>
            <div className='my-3'>
                <label className='float-start' htmlFor="userName">Name:
                    <span className={validateName() ? 'text-success' : 'text-danger'}>Name is required</span>
                </label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.userName}
                type="text" name="userName" id="userName" />
            </div>
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
                    <span className={validatePassword() ? 'text-success' : 'text-danger'}> Password must have at least 8 characters</span>
                </label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.password}
                type="text" name="password" id="password" />
            </div>
            <div className='my-3'>
                <label className='float-start' htmlFor="confirm">Confirm:
                    <span className={validateConfirm() ? 'text-success' : 'text-danger'}>Passwords must match</span>
                </label>
                <input className='form-control'
                onChange={(e) => handleInput(e)} value={inputs.confirm}
                type="text" name="confirm" id="confirm" />
            </div>
            <input disabled={!canSubmit()} className='btn btn-dark' type="submit" value="Register" />
        </form>
    );
}

export default RegisterForm;