require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const connectDB  = require('./config/db');
const submission = require('./routes/submission');
const upload     = require('./routes/upload');

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/submission', submission);
app.use('/api/upload',     upload);


// const principal = require('./routes/principle');
// app.use('/api/principal', principal);

app.get('/', (req, res) => res.json({ message: 'SAP-2025 Backend running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

