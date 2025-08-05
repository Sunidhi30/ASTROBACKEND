

// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
const { adminAuth } = require('../middlewares/auth');
const upload = require("../utils/upload");
require('dotenv').config(); // 👈 this should be on top
const cloudinary = require("../utils/cloudinary"); // ✅ use pre-configured one

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'user_profiles' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(fileBuffer);
    });
  };
// === ADMIN SIGNUP ===
router.post('/signup', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if username or email already exists
      const existingAdmin = await Admin.findOne({
        $or: [{ username }, { email }]
      });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      // Create new admin
      const admin = new Admin({
        username,
        email,
        password,  // Will be hashed by the pre-save middleware
        role: 'admin' // Fixed role
      });
  
      await admin.save();
  
      res.status(201).json({
        message: 'Admin registered successfully',
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});
  // === ADMIN LOGIN ===
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      // Find admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Update last login
      admin.lastLogin = new Date();
      await admin.save();
  
      // Generate JWT Token
      const token = jwt.sign(
        { adminId: admin._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Change Password
router.post('/change-password', adminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const admin = await Admin.findById(req.admin.id);
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.put('/update', adminAuth, upload.single('profileImage'), async (req, res) => {
  try {
    const {
      username,
      email,
      isActive
    } = req.body;

    const admin = req.admin; // Get logged-in admin from token

    // ✅ Upload profile image to Cloudinary if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      admin.profileImage = result.secure_url; // Save Cloudinary URL
    }

    // ✅ Update other fields
    if (username) admin.username = username;
    if (email) admin.email = email.toLowerCase();
    if (isActive !== undefined) admin.isActive = isActive;

    await admin.save();

    res.status(200).json({
      message: 'Admin profile updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ message: 'Server error while updating admin', error: error.message });
  }
});
module.exports = router; // ✅ This line is crucial
