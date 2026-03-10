require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const submissionRoutes = require('./routes/submission');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());                    // allows React frontend to call this API
app.use(express.json());            // parse JSON request bodies

// Routes
app.use('/api/submission', submissionRoutes);

// Health check
app.get('/', (req, res) => res.send('SAP-2025 API running ✅'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));