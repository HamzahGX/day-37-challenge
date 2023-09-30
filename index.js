const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 3000;

// Middleware Configuration
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser()); // Parse cookies

// Passport Configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === 'your-username' && password === 'your-password') {
      return done(null, { username: 'your-username' });
    } else {
      return done(null, false, { message: 'Invalid username or password' });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, { username: username });
});

app.use(passport.initialize());
app.use(passport.session());

// Routes Configuration
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome to the dashboard, ${req.user.username}!`);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
