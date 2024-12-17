const User = require('./database/Models/Users.js');
const connectDB = require('./database/connection');
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');
const orderRoutes = require('./routes/Order');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const authRoute = require('./routes/Auth.js')

const express = require('express');
const app = express();
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true, cookie: { secure: false } }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());
connectDB();
app.get('/', (req, res) => {
  res.send('Successful response.');
});
app.use('/api', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/auth', authRoute);
app.listen(8080, () => console.log('Example app is listening on port 3000.'));




