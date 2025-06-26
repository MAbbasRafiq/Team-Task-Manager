const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./models/db');
const userModel = require('./models/userModel');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://team-task-manager-ui.onrender.com'  // Frontend URL in production
    : 'http://localhost:5173',          // Development URL
  credentials: true,
}));

// Middleware
app.use(express.json());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'rdnsakmfviojmnuidshkcnmsiods_rvjksfcjkzdmxsnczzn',    // Use the secret from environment variables
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Ensure cookies are secure in production
  },
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await userModel.findByUsername(username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Authentication middleware
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Not authenticated' });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', ensureAuth, teamRoutes);
app.use('/api/tasks', ensureAuth, taskRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running!'));

// Set port dynamically based on environment
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
