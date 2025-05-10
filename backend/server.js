import express from 'express';
import dotenv from 'dotenv';  
import {connectDB} from './config/db.js';
import userRoute from './routes/user_route.js';



dotenv.config();
const app = express();
const PORT= process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRoute);
console.log(process.env.MONGO_URI);

app.listen(5000,() => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})