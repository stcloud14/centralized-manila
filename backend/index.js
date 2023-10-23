import express from "express";
import cors from 'cors';

import login from './routes/login.js'
import profileHandler from './routes/profileHandler.js';
import register from './routes/register.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/profile', profileHandler);
app.use('/register', register);


app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});


app.listen(8800, () => {
  console.log("Connected to backend");
});