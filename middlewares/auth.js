const jwt = require('jsonwebtoken');
const User = require('../models/User');
const  Admin = require('../models/Admin'); 
require('dotenv').config(); 

const auth = async (req, res, next) => {
  try {
    // 1. Check for Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required: No token provided' 
      });
    }

    // 2. Extract token
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required: Malformed token' 
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Find user (with active status check)
    const user = await User.findOne({
      _id: decoded.userId,
      isActive: true
    }).select('-password');

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed: User not found or inactive' 
      });
    }

    // 5. Attach user to request
    req.user = user;
    req.token = token;
    next();

  } catch (error) {
    console.error('Authentication error:', error.message);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed: Invalid token' 
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication failed: Token expired' 
      });
    }

    // Generic error response
    res.status(401).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
};
// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };
// if the admin is not static then use this below authorisation middleware
const adminAuth = async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // 🛠 Use the correct key here
      const admin = await Admin.findById(decoded.adminId);
  
      if (!admin || !admin.isActive) {
        return res.status(401).json({ message: 'Invalid admin token' });
      }
  
      req.admin = admin;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  


module.exports = { auth, adminAuth };