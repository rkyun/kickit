const mongoose = require('mongoose');

const passport = require('passport');

const Venue = mongoose.model('venues');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = app => {

  app.get('/api/venues', (req, res, next) => {
    Venue.find().then(venues => {
      if(!venues){
        return res.send({});
      }
      return res.send(venues);
    })
  })

  app.post('/api/venues', requireAuth, (req, res, next) => {
    const { name, address, description, coordinates } = req.body;

    if ( !name || !address || !description || !coordinates){
      return res.status(409).send({error: 'Missing parameters'})
    }

    const venue = new Venue({name, address, description, coordinates});

    venue.save().then(() => {
        res.send(venue);
      }).catch(error => {
        return res.status(422).send({error: error._message});
      })
  });

}