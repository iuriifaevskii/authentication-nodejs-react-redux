const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session:false});
const requireSignin = passport.authenticate('local', {session: false });

module.exports = function(app){
    
    app.get('/', requireAuth, function(req, res){
        res.send({hi:'there'});
    }); // in postman try Get to '/' and in Headers insert 'authorization' | 'eyJ0eXAiO...' and respons {"hi": "there"}
    
    app.post('/signin', requireSignin, Authentication.signin);

    app.post('/signup', Authentication.signup);

}