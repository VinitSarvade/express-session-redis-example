const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const morgan = require('morgan');
const createStore = require('connect-redis');

const redisClient = require('./redis-client');

const app = express();
const RedisStore = createStore(session);

app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      ttl: 86400, //One Day
    }),
    secret: 'randomSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400   
    }
  })
);  

app.get('/', (req, res) => {
  res.json({
    session: req.sessionID
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on :${PORT}`));



