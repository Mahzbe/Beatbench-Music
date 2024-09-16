const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// In-memory user store
const users = {};

app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.status(400).json({ message: 'Username already exists' });
  } else {
    users[username] = password;
    res.status(201).json({ message: 'User created' });
  }
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.cookie('token', 'some-token');
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
});

// Create server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
