const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
    console.log('Hitting Registration');
    try{
        const {
            userName,
            email,
            password,
            confirm
        } = req.body;
        const errors = validateUserRegistration(req.body);
        if(errors.isValid){
            const user = new User({
                userName,
                email,
                password : await bcrypt.hash(password, 15)
            });
        }
    }catch(errors){
        console.log(`Errors trying to register user: ${errors}`);
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
    return res.send(JSON.stringify({debug:true}));
}

exports.loginUser = (req, res) => {
    console.log('Hitting Login');
    return res.send(JSON.stringify({debug:true}));
}

const validateUserRegistration = async ({userName, email, password, confirm}) => {
    let isValid = true;
    const validations = {};
    const checkEmail = await User.findOne({email});
    if(email === ''){
        isValid = false;
        validations.email = {userNameRequired : true}
    }
    if(checkEmail){
        isValid = false;
        validations.email = {...validations.email, emailTaken : true}
    }
    if(userName === ''){
        isValid = false;
        validations.userName = {userNameRequired : true}
    }
    if(password.length < 8){
        isValid = false;
        validations.password = {passwordLength : true}
    }
    if(confirm !== password){
        isValid = false;
        validations.confirm = {matchPassword : true}
    }
    validations.isValid = isValid;
    return validations;
}