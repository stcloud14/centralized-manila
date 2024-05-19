import mysql from "mysql";
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios for making HTTP requests
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

let conn2;

function handleDisconnect() {
  conn2 = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
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

// Function to trigger deployment
async function triggerDeployment() {
  const deployHookURL = process.env.DEPLOYHOOK;
    try {
    // Trigger deployment using axios
    await axios.post(deployHookURL);
    console.log('Deployment triggered successfully.');
  } catch (err) {
    console.error('Error triggering deployment:', err);
  }
}

export default conn2;
