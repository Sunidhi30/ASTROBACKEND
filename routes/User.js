// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { auth } = require('../middlewares/auth');
const storage = multer.memoryStorage();
const getZodiacSign = require('../utils/zodiac');
const upload = multer({ storage });
const cloudinary = require('../utils/cloudinary'); // assuming this is your cloudinary setup

require('dotenv').config(); 

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
  console.log('Saved user in DB:', await User.findById(newUser._id).select('+password'));


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
      console.log('Password in DB:', user.password);
      console.log('Password from request:', password);
      
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
// Get authenticated user's profile
router.get('/profile', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id)

        .select('-password -emailVerificationToken -resetPasswordToken')
        .populate('referredBy', 'firstName lastName email')
        // .populate('savedReports favoriteServices', 'title description');
      console.log(user)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      res.json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user details'
      });
    }
});
// Get user by ID (public profile)
router.get('/profile/:id',auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .select('firstName lastName profilePhoto role')
        // .where('preferences.privacySettings.profileVisibility').equals('public');
      console.log("users is " ,req.params.id)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found or profile is private'
        });
      }
  
      res.json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Get public profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile'
      });
    }
});

// Upload profile image
// router.put('/upload-profile-image', auth, upload.single('profileImage'), async (req, res) => {
//   try {
//     // Check if a file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image file uploaded' });
//     }

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       { folder: 'user_profiles' },
//       async (error, result) => {
//         if (error) {
//           console.error('Cloudinary Error:', error);
//           return res.status(500).json({ message: 'Image upload failed', error });
//         }

//         // Update user in DB
//         const user = await User.findByIdAndUpdate(
//           req.user._id,
//           { profilePhoto: result.secure_url },
//           { new: true }
//         ).select('-password');

//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'Profile image updated successfully', user });
//       }
//     );

//     // Pipe the image buffer into Cloudinary stream
//     result.end(req.file.buffer);

//   } catch (err) {
//     console.error('Upload Profile Error:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
//upload profile image 
router.put('/update-profile', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const updates = {};
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      timeOfBirth,
      password,
      preferences,
      placeOfBirth
    } = req.body;

    // 🔐 Handle optional password update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updates.password = hashedPassword;
    }

    // 📝 Update basic info
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (dateOfBirth) updates.dateOfBirth = new Date(dateOfBirth);
    if (timeOfBirth) updates.timeOfBirth = timeOfBirth;

    // 🗺️ Nested location
    if (placeOfBirth) {
      updates.placeOfBirth = JSON.parse(placeOfBirth); // if sent as stringified JSON
    }

    // ⚙️ Preferences
    if (preferences) {
      updates.preferences = JSON.parse(preferences); // stringified JSON if sent from frontend
    }

    // 🖼️ If file is uploaded, upload image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'user_profiles' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updates.profilePhoto = result.secure_url;
    }

    // 🛠️ Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/calculators/zodiac
router.get('/zodiac', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // from auth middleware
    if (!user || !user.dateOfBirth) {
      return res.status(400).json({ message: 'Birth date not found in profile' });
    }

    const zodiac = getZodiacSign(user.dateOfBirth);
    return res.json({ zodiac });
  } catch (err) {
    console.error('Error calculating zodiac:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /users?page=1&limit=10
router.get("/users", async (req, res) => {
  try {
    // Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional sorting
    const sort = { createdAt: -1 }; // Newest first

    // Total number of users
    const totalItems = await User.countDocuments();

    // Fetch paginated users
    const users = await User.find()
      .select("-password") // Don't send password
      .skip(skip)
      .limit(limit)
      .sort(sort);

    // Response
    res.json({
      items: users,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;