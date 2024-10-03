import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import listingRouter from './routes/listing.router.js';
import path from 'path'

const app = express();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB is connected')
}).catch((err)=>{
    console.error(err)
});

const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
  }))
const PORT = process.env.PORT
app.listen(PORT || 5000,()=>{
    console.log(`Server is running on port ${PORT}`)
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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