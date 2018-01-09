const mongoose = require('mongoose');

const jwt = require('jwt-simple');

const passport = require('passport');

const User = mongoose.model('users');

const requireAuth = passport.authenticate('jwt', {session: false});

const requireSignin = passport.authenticate('local', {session: false});


const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, 'superdupersecret')
}

module.exports = app => {
  
  app.get('/secured',requireAuth, (req, res, next) => {
    res.send('Secured route.')
  })

  app.post('/api/auth/login',requireSignin, (req, res, next) => {
    res.send({token: tokenForUser(req.user)});
  });

  app.post('/api/auth/register', (req, res, next) => {

    const {username, password, provider} = req.body;

    const user = new User({username, password, provider});

    user.save().then(() => {
      res.send(user)
    }).catch(err => {
      res.status(400).send(err);
    })
  });

}