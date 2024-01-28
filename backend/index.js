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
import notifications from './routes/notifications.js'
import forgotPassword from './routes/forgotPassword.js'
import emailHandler from './routes/emailHandler.js'


import adminRptaxHandler from './routes/adminRptaxHandler.js'
import adminBPHandler from './routes/adminBPHandler.js'
import adminURHandler from './routes/adminURHandler.js'
import adminLcrHandler from './routes/adminLcrHandler.js'
import adminCedulahandler from './routes/adminCedulahandler.js'
import adminDashboard from './routes/adminDashboard.js'

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
app.use('/notifications', notifications);
app.use('/forgotpass', forgotPassword);
app.use('/email', emailHandler)



app.use('/adminrptax', adminRptaxHandler);
app.use('/adminbp', adminBPHandler);
app.use('/adminlcr', adminLcrHandler);
app.use('/adminctc', adminCedulahandler);

app.use('/adminur', adminURHandler);

app.use('/admin', adminDashboard);



app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});


app.listen(8800, () => {
  console.log("Connected to backend");
});