const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/provinces', require('./routes/provinces'));
app.use('/api/towns', require('./routes/towns'));
app.use('/api/stations', require('./routes/stations'));
app.use('/api/coordinators', require('./routes/coordinators'));
app.use('/api/collectors', require('./routes/collectors'));
app.use('/api/bets', require('./routes/bets'));
app.use('/api/total', require('./routes/total'));
app.use('/api/blocking', require('./routes/blocking'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
