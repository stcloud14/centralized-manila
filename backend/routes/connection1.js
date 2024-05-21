import mysql from 'mysql2';
// import mysql from 'mysql';
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios for making HTTP requests
dotenv.config();


let conn1;

function handleDisconnect() {
  conn1 = mysql.createConnection({
    host: process.env.ADMIN_DB_HOST,
    user: process.env.ADMIN_DB_USER,
    password: process.env.ADMIN_DB_PASSWORD,
    database: process.env.ADMIN_DB_DATABASE,
    port: process.env.ADMIN_DB_PORT,
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

export default conn1;
