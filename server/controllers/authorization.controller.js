const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.registerUser = async (req, res) => {
    console.log('Hitting Registration');
    console.log(req.body);
    try{
        const {
            userName,
            email,
            password,
            confirm
        } = req.body;
        const errors = await validateUserRegistration(req.body);
        if(errors.isValid){
            const hashedPassword = await bcrypt.hash(password, 15);
            const user = new User({
                userName,
                email,
                password : hashedPassword
            });
            const savedUser = await user.save();
            return res.send({
                success : true,
                savedUser
            });
        }
        else{
            console.log('Invalid Registration Credentials');
            return res.send(JSON.stringify({
                success : false,
                errors
            }));
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

exports.loginUser = async (req, res) => {
    console.log('Hitting Login');
    try{
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({email});
        const testPassword = await bcrypt.compare(password, user.password);
        if(user && testPassword){
            // SETUP JSON TOKEN HERE
            // GET NECESSARY STARTING DATA FOR USER HERE TOO.
            const token = jwt.sign({
                _id : user._id
            }, `${process.env.JWT_SECRET}`,
            {
                expiresIn : '2 days'
            });
            return res.send(JSON.stringify({
                success : true,
                userId : user._id,
                token
            }));
        }else{
            console.log('Invalid Login Attempt.');
            return res.send(JSON.stringify({
                success : false
            }));
        }
    }catch(errors){
        console.log(`Errors trying to login user: ${errors}`);
        return res.send(JSON.stringify({
            success : false,
            errors
        }));
    }
    return res.send(JSON.stringify({debug:true}));
}

exports.verifyToken = async (req, res) => {
    try{
        console.log('Hitting Verify');
        const token = req.headers.authorization.split(' ')[1];
        const {_id} = jwt.verify(token, `${process.env.JWT_SECRET}`);
        const user = await User.findOne({_id});
        if(user){
            console.log('Token Verified!');
            const newToken = jwt.sign({_id : user._id}, `${process.env.JWT_SECRET}`,{
                expiresIn : '2 days'
            });
            return res.send({
                success : true,
                userId : user._id,
                token : newToken
            });
        }
        else{ return res.send(JSON.stringify({success : false}))}
    }catch(errors){
        console.log(`Error Verifying token ${errors}`);
        return res.send(JSON.stringify({
            success : false
        }));
    }
}

const validateUserRegistration = async ({userName, email, password, confirm}) => {
    let isValid = true;
    const validations = {};
    const checkEmail = await User.findOne({email});
    if(email === ''){
        isValid = false;
        validations.email = {emailRequired : true}
    }
    if(!emailRegex.test(email)){
        isValid = false;
        validations.email = {...validations.email, emailFormat : true}
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