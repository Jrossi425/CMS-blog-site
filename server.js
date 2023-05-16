const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utilities/helpers');
const path = require('path');


const sequelize = require('./config/connection');
const sessionConfig = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};

const app = express();

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers
});


app.use(session(sessionConfig));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });