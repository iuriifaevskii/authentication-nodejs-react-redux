const User = require('../models/user')

exports.signup = function(req, res, next){
    //res.send({success:true});

    console.log(req.body); // in postman send body json {"email":"test@example.com","password":"123"}
    const email = req.body.email;
    const password = req.body.password;

    //See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser){
        
    });

    //If a user with email does exist, return an error

    //If a user with email dose NOT exist, create and save user record

    //Respond to request indicating the user was created


}