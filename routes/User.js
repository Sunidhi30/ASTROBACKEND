// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

// Generate referral code
const generateReferralCode = () => uuidv4().substring(0, 8).toUpperCase();

router.post('/register', 
    // [
    //   check('firstName', 'First name is required').not().isEmpty(),
    //   check('email', 'Please include a valid email').isEmail(),
    //   check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    //   check('dateOfBirth', 'Date of birth is required').not().isEmpty()
    // ],
    async (req, res) => {
      try {
        // First check if body exists
        if (!req.body) {
          return res.status(400).json({
            success: false,
            message: 'Request body is missing'
          });
        }
  
        const {
          firstName,
          lastName = '', // default empty string if not provided
          email,
          phone = '', // default empty string if not provided
          password,
          dateOfBirth,
          timeOfBirth = '', // default empty string if not provided
          placeOfBirth = {}, // default empty object if not provided
          referredByCode = null // default null if not provided
        } = req.body;
  
       
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Email already in use'
    });
  }

  // Handle referral
  let referredBy = null;
  if (referredByCode) {
    const referrer = await User.findOne({ referralCode: referredByCode });
    referredBy = referrer?._id;
  }

  // Create user
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    referralCode: generateReferralCode(),
    referredBy
  });

  await newUser.save();

  // Generate token
  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Remove sensitive data
  const userResponse = newUser.toObject();
  delete userResponse.password;
  delete userResponse.emailVerificationToken;
  delete userResponse.emailVerificationExpires;
  delete userResponse.resetPasswordToken;
  delete userResponse.resetPasswordExpires;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: userResponse
  });

} catch (error) {
  console.error('Registration error:', error);
  res.status(500).json({
    success: false,
    message: 'Registration failed',
    error: error.message
  });
}
}
);

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 1. Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }
  
      // 2. Find user WITH password (since it's select: false in schema)
      const user = await User.findOne({ email }).select('+password +emailVerificationToken');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // 3. Verify password exists in user object
      if (!user.password) {
        console.error('User found but password missing:', user.email);
        return res.status(500).json({
          success: false,
          message: 'Authentication system error'
        });
      }
  
      // 4. Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // 5. Check account status
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is inactive'
        });
      }
  
      // 6. Generate token
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      // 7. Update login info (without triggering password hash)
      await User.findByIdAndUpdate(user._id, {
        $set: {
          lastLogin: new Date()
        },
        $inc: {
          loginCount: 1
        }
      });
  
      // 8. Prepare response
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.emailVerificationToken;
      delete userResponse.emailVerificationExpires;
      delete userResponse.resetPasswordToken;
      delete userResponse.resetPasswordExpires;
  
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: userResponse
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  });

module.exports = router;