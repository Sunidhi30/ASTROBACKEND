const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./utils/db')
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/Admin');
const userRoutes = require("./routes/User");
const PORT = process.env.PORT || 9000;
// Add these lines before your routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config(); 
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
db();
db().then(function (db) {
  console.log(`Db connnected`)
})
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
