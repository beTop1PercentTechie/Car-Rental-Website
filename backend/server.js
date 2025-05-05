const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();
connectDB();
// will connect db latter 


const app = express()

// CORS config
app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening to ${PORT}`))