import mysql from 'mysql2';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

let conn2;

function handleDisconnect() {
  conn2 = mysql.createConnection({
    host: process.env.CLIENT_DB_HOST,
    user: process.env.CLIENT_DB_USER,
    password: process.env.CLIENT_DB_PASSWORD,
    database: process.env.CLIENT_DB_DATABASE,
    port: process.env.CLIENT_DB_PORT,
  });

  conn2.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      // If the database connection is down, trigger deployment
      triggerDeployment();
      setTimeout(handleDisconnect, 1500);  // Retry connection after 1.5 seconds
    } else {
      console.log("Connected to the client database");
    }
  });

  conn2.on('error', (err) => {
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

export default conn2;


