import mysql from 'mysql2';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

let conn1;

function handleDisconnect() {
  conn1 = mysql.createConnection({
    host: process.env.ADMIN_DB_HOST,
    user: process.env.ADMIN_DB_USER,
    password: process.env.ADMIN_DB_PASSWORD,
    database: process.env.ADMIN_DB_DATABASE,
    port: process.env.ADMIN_DB_PORT,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
  });

  conn1.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      // If the database connection is down, trigger deployment
      triggerDeployment();
      setTimeout(handleDisconnect, 1500);  // Retry connection after 1.5 seconds
    } else {
      console.log("Connected to the admin database");
    }
  });

  conn1.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // If the connection is lost, trigger deployment
      triggerDeployment();
      handleDisconnect();  // Reconnect
    } else {
      throw err;  // Handle other errors
    }
  });
}

handleDisconnect();

function triggerDeployment() {
  const deployHookURL = process.env.DEPLOYHOOK;
  // Trigger deployment using axios
  axios.post(deployHookURL)
    .then(() => {
      console.log('Deployment triggered successfully.');
    })
    .catch((err) => {
      console.error('Error triggering deployment:', err);
    });
}

export default conn1;
