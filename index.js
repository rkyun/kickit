const express = require('express');

const mongoose = require('mongoose');

const passport = require('passport');

const bodyParser = require('body-parser');

const keys = require('./config/keys');

const app = express();

require('./models/User');

require('./services/passport');

mongoose.connect(keys.mongoURI, {useMongoClient: true});

app.use(bodyParser.json());

app.use(passport.initialize());



require('./routes/testRoutes')(app);
require('./routes/authRoutes')(app);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listen at ${PORT}`);
});