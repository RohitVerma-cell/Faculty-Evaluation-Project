require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const path        = require('path');
const connectDB   = require('./config/db');
const submission  = require('./routes/submission');
const upload      = require('./routes/upload');
const adminRouter = require('./routes/adminRoutes/adminRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api/submission', submission);
app.use('/api/upload',     upload);
app.use('/api/admin',     adminRouter);

app.get('/', (req, res) => res.json({ message: 'SAP-2025 Backend running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT,"0.0.0.0", () => console.log(`Server running http://localhost:${PORT}`));

