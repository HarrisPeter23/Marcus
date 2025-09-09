import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import oauthRoutes from './routes/oauthRoutes.js';
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./lib/db.js";
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies
}))
const PORT=process.env.PORT || 5000

connectDB()
app.use("/api/auth",authRoutes)
app.use('/api/auth', oauthRoutes); 



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});