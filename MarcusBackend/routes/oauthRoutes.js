// routes/oauthRoutes.js
import express from 'express';
import passport from '../lib/oauth.js';
import { generateToken } from '../controllers/authController.js';

const router = express.Router();

const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* Google */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) return res.redirect(`${FRONTEND}/login?error=oauth`);
    const token = generateToken(user._id);
    res.cookie('token', token, cookieOpts);
    return res.redirect(`${FRONTEND}/marcus`);
  })(req, res, next);
});

/* GitHub */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) return res.redirect(`${FRONTEND}/login?error=oauth`);
    const token = generateToken(user._id);
    res.cookie('token', token, cookieOpts);
    return res.redirect(`${FRONTEND}/marcus`);
  })(req, res, next);
});

export default router;
