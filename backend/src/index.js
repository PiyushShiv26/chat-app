import express from 'express'; // import express which is a node.js web application framework
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // import cookieParser to parse the incoming requests with cookies

import {connectDB} from "./lib/db.js"

import authRoutes from './routes/auth.route.js'; // import the authRoutes from the auth.route.js file

import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json()); // use express.json() to parse the incoming requests with JSON payloads

app.use(cookieParser()); // use cookieParser() to parse the incoming requests with cookies

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
))

app.use("/api/auth", authRoutes); // use the authRoutes for the /api/auth path

app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port:'+PORT);
  connectDB();
});

//npm run dev