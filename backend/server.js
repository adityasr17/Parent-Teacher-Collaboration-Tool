import express from 'express';
import dotenv from 'dotenv';  
import {connectDB} from './config/db.js';
import announcementRoute from './routes/announcement_route.js';
import marksRoute from './routes/marks_route.js';
import teacherRoute from './routes/teacher_route.js';
import studentRoute from './routes/student_route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT= process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/teachers', teacherRoute);
app.use('/api/students', studentRoute);
app.use('/api/announcements', announcementRoute);
app.use('/api/marks', marksRoute);
console.log(process.env.MONGO_URI);

app.listen(5000,() => {
    connectDB()
    console.log("Server started at http://localhost:" + PORT);
})