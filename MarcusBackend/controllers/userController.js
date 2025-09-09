import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ success:false, message: 'Not authenticated' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ success:false, message: 'User not found' });
    return res.json({ success:true, user });
  } catch (err) {
    return res.status(401).json({ success:false, message: 'Invalid token' });
  }
};
