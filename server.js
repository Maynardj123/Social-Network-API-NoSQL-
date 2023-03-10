const express = require('express');
const db = require('./config/connection');
// Require mode
const { reactionSchema, Thought, User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

const routes = require("./routes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
