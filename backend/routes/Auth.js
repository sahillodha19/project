const express = require('express');
const User = require('../database/Models/Users.js'); 
const jwt = require('jsonwebtoken');
const router = express.Router();

const axios = require('axios');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;



// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: 'Ov23liAW12OGLaKmSppQ',
  clientSecret: '2a47bb91b1a1c972d75a6f6de423c1f7a3b871e0',
  callbackURL: 'http://localhost:8080/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Handle the GitHub user profile here; save to the database if needed
  let email = profile.emails && profile.emails[0].value;
  let name = profile.displayName;
  if (!email) {
    const { data } = await axios.get(`https://api.github.com/user/emails`, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });
    profile = {...profile, email: data[0].email, name};
  }
  return done(null, profile);
}));


passport.use(new GoogleStrategy({
   clientID: '604196178059-8sc3l3p4klue716c0b2lr1qc7gsomv87.apps.googleusercontent.com',
   clientSecret: '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',
   callbackURL: 'http://localhost:8080/auth/google/callback'
 }, async (accessToken, refreshToken, profile, done) => {
   const email = profile.emails && profile.emails[0].value;
   const name = profile.displayName;
   return done(null, { name, email, provider: profile.provider });
 }));



// Serialize user into the session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Route to start the GitHub OAuth flow
router.get('/github', (req, res, next) => {
  const redirect = req.query.redirect || 'http://localhost:5173/dashboard'; // Default to dashboard if no redirect specified
  console.log(redirect);
  req.session.redirectUrl = redirect; // Store the redirect URL in the session
  console.log(req.session.redirectUrl);
  next();
}, passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback URL
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    const { name, email, pwd, phone } = req.body;
    let redirectUrl = req.session.redirectUrl || 'http://localhost:5173/authenticate';
    console.log(redirectUrl);
    console.log(req.session.redirectUrl);
    delete req.session.redirectUrl; 
    if (checkExistingUser(email)){
      const jwtToken = jwt.sign({ email: email }, 'JWT_SECRET', { expiresIn: '1h' });
      redirectUrl += `?token=${jwtToken}`;
      res.redirect(redirectUrl);
      return;
    };
    const newUser = new User({
      name: req.user.displayName,
      email: req.user.email,
      account_type : 'customer',
      auth_type: req.user.provider,
    });
    await newUser.save();
    const jwtToken = jwt.sign({ email: email }, 'JWT_SECRET', { expiresIn: '1h' });
    redirectUrl += `?token=${jwtToken}`;
    res.redirect(redirectUrl);
  }
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    const { name, email, provider } = req.user;
    if (await checkExistingUser(email)){
      res.redirect('http://localhost:5173/dashboard'); 
      return;
    };
    const newUser = new User({
      name,
      email,
      account_type: 'customer',
      auth_type: provider,
    });
    await newUser.save();
    res.redirect('http://localhost:5173/dashboard');
  }
);

async function checkExistingUser(email){
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      return true;
   }
}

module.exports = router;

