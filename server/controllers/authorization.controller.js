exports.registerUser = (req, res) => {
    console.log('Hitting Registration');
    return res.send(JSON.stringify({debug:true}));
}

exports.loginUser = (req, res) => {
    console.log('Hitting Login');
    return res.send(JSON.stringify({debug:true}));
}

const validateUserInfo = () => {
    
}