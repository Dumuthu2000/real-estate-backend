import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';

const app = express();
// Use cookie-parser middleware
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB is connected')
}).catch((err)=>{
    console.error(err)
});

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }))

app.listen(5000,()=>{
    console.log(`Server is running on port ${5000}`)
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

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