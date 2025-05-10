import express from 'express';
import dotenv from 'dotenv';  
import {connectDB} from './config/db.js'; 

dotenv.config();
const app = express();

app.post('/api/users', async(req, res) => {
    const user = req.body;

    if (!user.name || !user.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json({success: true , data: newUser});
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
})

console.log(process.env.MONGO_URI);

app.listen(5000,() => {
    connectDB()
    console.log("Server started at http://localhost:5000");
})