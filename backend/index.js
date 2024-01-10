import express from "express";
import cors from 'cors';

import login from './routes/login.js'
import register from './routes/register.js'
import profileHandler from './routes/profileHandler.js';
import rptaxHandler from './routes/rptaxHandler.js';
import transactionHandler from './routes/transactionHandler.js';
import birthCertHandler from './routes/birthCertHandler.js';
import deathCertHandler from './routes/deathCertHandler.js';
import marriageCertHandler from './routes/marriageCertHandler.js';
import cedulaHandler from './routes/cedulaHandler.js';
import busPermitHandler from './routes/busPermitHandler.js';
import paymentMethod from './routes/paymentMethod.js';
import userSettings from './routes/userSettings.js'

import adminDashboard from './routes/adminDashboard.js'
import Admin from './routes/admin.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/register', register);
app.use('/profile', profileHandler);
app.use('/rptax', rptaxHandler);
app.use('/buspermit', busPermitHandler);
app.use('/cedula', cedulaHandler);
app.use('/birthcertificate', birthCertHandler);
app.use('/deathcertificate', deathCertHandler);
app.use('/marriagecertificate', marriageCertHandler)
app.use('/transachistory', transactionHandler);
app.use('/usersettings', userSettings);
app.use('/payment', paymentMethod);


app.use('/admin', adminDashboard);
app.use('/login', Admin);




app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});


app.listen(8800, () => {
  console.log("Connected to backend");
});