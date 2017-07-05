const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),//creates a new extractor that looks for the JWT in the given http header
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