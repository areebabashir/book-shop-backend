import JWT from 'jsonwebtoken';
import userModel from '../models/authModel.js';

// Protected Routes: Token-based authentication middleware
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if the Authorization header is provided
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    // Extract token from the header
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT Error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

// Admin Access Middleware
export const isAdmin = async (req, res, next) => {
  try {
    // Find user by ID, which is decoded from JWT and attached to req.user
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if the user has admin privileges (role = 1)
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Admin access only',
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    res.status(500).json({
      success: false,
      error,
      message: 'Server error in admin middleware',
    });
  }
};
