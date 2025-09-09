// lib/oauth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import fetch from 'node-fetch';
import crypto from 'crypto';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();
// helper to create user if missing
async function findOrCreateOAuthUser({ name, email }) {
  if (!email) throw new Error('No email from provider');
  let user = await userModel.findOne({ email });
  if (!user) {
    const randomPass = crypto.randomBytes(16).toString('hex');
    user = await userModel.create({ name, email, password: randomPass });
  }
  return user;
}

/* ---------- Google ---------- */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName || `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim();
    const user = await findOrCreateOAuthUser({ name, email });
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

/* ---------- GitHub ---------- */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let email = profile.emails?.[0]?.value;
    const name = profile.displayName || profile.username;
    if (!email) {
      try {
        const resp = await fetch('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'User-Agent': 'Marcus-App'
          }
        });
        const emails = await resp.json();
        const primary = Array.isArray(emails) ? emails.find(e => e.primary && e.verified) || emails.find(e => e.verified) || emails[0] : null;
        email = primary?.email;
      } catch (e) {
        // ignore and fall through
      }
    }
    if (!email) {
      return done(new Error('No email returned from GitHub account'));
    }
    const user = await findOrCreateOAuthUser({ name, email });
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

export default passport;
