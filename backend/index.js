import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

import login from './routes/login.js';
import register from './routes/register.js';
import profileHandler from './routes/profileHandler.js';
import rptaxHandler from './routes/rptaxHandler.js';
import transactionHandler from './routes/transactionHandler.js';
import birthCertHandler from './routes/birthCertHandler.js';
import deathCertHandler from './routes/deathCertHandler.js';
import marriageCertHandler from './routes/marriageCertHandler.js';
import cedulaHandler from './routes/cedulaHandler.js';
import busPermitHandler from './routes/busPermitHandler.js';
import paymentMethod from './routes/paymentMethod.js';
import userSettings from './routes/userSettings.js';
import notifications from './routes/notifications.js';
import forgotPassword from './routes/forgotPassword.js';
import emailHandler from './routes/emailHandler.js';
import generateSOAHandler from './routes/generateSOAHandler.js';
import jwttoken from './routes/token.js';

import adminProfileHandler from './routes/adminProfileHandler.js';
import adminRptaxHandler from './routes/adminRptaxHandler.js';
import adminBPHandler from './routes/adminBPHandler.js';
import adminURHandler from './routes/adminURHandler.js';
import adminLcrHandler from './routes/adminLcrHandler.js';
import adminCedulahandler from './routes/adminCedulahandler.js';
import adminDashboard from './routes/adminDashboard.js';
import auditTrailHandler from './routes/auditTrailHandler.js';
import generateREPHandler from './routes/generateREPHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

// CORS middleware
app.use(cors({
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}));

// Logging middleware
app.use((req, res, next) => {
  // Set Content-Type header to JSON for all responses
  res.setHeader("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  // Set Access-Control headers
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization, Cross-Origin-Opener-Policy"
  );

  console.log(req.path, req.method);
  next();
});

// Serve static files (frontend)
// if (process.env.NODE_ENV === 'production') {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const staticPath = path.join(__dirname, '../frontend/dist');
//   app.use(express.static(staticPath));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(staticPath, 'index.html'));
//   });
// }

// API routes
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/profile', profileHandler);
app.use('/api/rptax', rptaxHandler);
app.use('/api/buspermit', busPermitHandler);
app.use('/api/cedula', cedulaHandler);  
app.use('/api/birthcertificate', birthCertHandler);
app.use('/api/deathcertificate', deathCertHandler);
app.use('/api/marriagecertificate', marriageCertHandler);
app.use('/api/transachistory', transactionHandler);
app.use('/api/usersettings', userSettings);
app.use('/api/payment', paymentMethod);
app.use('/api/notifications', notifications);
app.use('/api/forgotpass', forgotPassword);
app.use('/api/email', emailHandler);
app.use('/api/soa', generateSOAHandler);
app.use('/api/token', jwttoken);

// Admin routes
app.use('/api/adminprofile', adminProfileHandler);
app.use('/api/adminrptax', adminRptaxHandler);
app.use('/api/adminbp', adminBPHandler);
app.use('/api/adminlcr', adminLcrHandler);
app.use('/api/adminctc', adminCedulahandler);
app.use('/api/adminur', adminURHandler);
app.use('/api/admin', adminDashboard);
app.use('/api/audittrail', auditTrailHandler);
app.use('/api/report', generateREPHandler);

// Root endpoint
app.get("*", (req, res) => {
  res.json("hello, this is the backend");
});

app.listen(8080, () => {
  console.log("Connected to backend");
});
