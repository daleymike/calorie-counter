import LoginForm from "./Forms/LoginForm";
import RegisterForm from "./Forms/RegisterForm";

const LoginAndRegisterPage = () => {
    return (
        <div className="row">
            <RegisterForm className='col card mx-5 mt-4 p-3' />
            <LoginForm className='col card mx-5 mt-4 p-3' />
        </div>
    );
}

export default LoginAndRegisterPage;