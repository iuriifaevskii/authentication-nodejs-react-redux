const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    //Verify this email and password, call done with the user
    //if it is the correct email and password
    //otherwise, call done with false
    User.findOne({ email: email }, function(err, user){
        if(err){ return done(err); }
        if(!user){ return done(null, false); }

        //compare password - is 'password' equel to user.password
        //(user.password field in db with hash password) 
        user.comparePassword(password, function(err, isMatch){
            if(err){ return done(err); }
            if(!isMatch){ return done(null, false); }

            return done(null, user);
        });

    });

});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),//creates a new extractor that looks for the JWT in the given http header
    // in postman try Get to '/' and in Headers insert 'authorization' | 'eyJ0eXAiO...' and respons {"hi": "there"}
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //payload - decoded jwt token(sub:user id and iat:timespan)
    //done - success auth user 

    //See if the user ID in the payload exists in our database
    //If it does, call 'done' with that other
    //otherwise, call done without a user object

    User.findById(payload.sub, function(err, user){
        if(err) { return done(err, false); }

        if(user){
            done(null,user);
        } else {
            done(null, false);
        }

    });
    

});

//Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);