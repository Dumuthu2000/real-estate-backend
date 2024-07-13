import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import listingRouter from './routes/listing.router.js';

const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB is connected')
}).catch((err)=>{
    console.error(err)
});

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }))

app.listen(5000,()=>{
    console.log(`Server is running on port ${5000}`)
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

//Error Handling middleware
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});