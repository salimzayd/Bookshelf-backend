import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/Route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {

})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});

app.use(cors({
    origin:"https://bookshelf-frontend-livid.vercel.app",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json());
app.use('/api',router)


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
