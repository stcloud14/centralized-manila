// import mysql from 'mysql2/promise';
import mysql from 'mysql2/promise';
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();


const conn2 = mysql.createPool({
  connectionLimit: 70,
  host: process.env.CLIENT_DB_HOST,
  user: process.env.CLIENT_DB_USER,
  password: process.env.CLIENT_DB_PASSWORD,
  database: process.env.CLIENT_DB_DATABASE,
  port: process.env.CLIENT_DB_PORT,
});


async function testConnection() {
  try {
    const connection = await conn2.getConnection();
    console.log("Connected to the clientdatabase");
    // connection.release();
  } catch (err) {
    console.error("Error connecting to the database: " + err);
  }
}

testConnection();

// Close the pool when the application terminates
process.on('exit', async () => {
  try {
    await conn2.end();
    console.log('Pool closed.');
  } catch (err) {
    console.error('Error ending the pool: ' + err);
  }
});


export default conn2;




// let conn2;

// function handleDisconnect() {
//   conn2 = mysql.createConnection({
//     host: process.env.CLIENT_DB_HOST,
//     user: process.env.CLIENT_DB_USER,
//     password: process.env.CLIENT_DB_PASSWORD,
//     database: process.env.CLIENT_DB_DATABASE,
//     port: process.env.CLIENT_DB_PORT,
//   });

//   conn2.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the database: " + err);
//       // If the database connection is down, trigger deployment
//       triggerDeployment();
//       setTimeout(handleDisconnect, 1500);  // Retry connection after 1.5 seconds
//     } else {
//       console.log("Connected to the client database");
//     }
//   });

//   conn2.on('error', (err) => {
//     console.error('Database error:', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // If the connection is lost, trigger deployment
//       triggerDeployment();
//       handleDisconnect();  // Reconnect
//     } else {
//       throw err;  // Handle other errors
//     }
//   });
// }

// handleDisconnect();

// function triggerDeployment() {
//   const deployHookURL = process.env.DEPLOYHOOK;
//   // Trigger deployment using axios
//   axios.post(deployHookURL)
//     .then(() => {
//       console.log('Deployment triggered successfully.');
//     })
//     .catch((err) => {
//       console.error('Error triggering deployment:', err);
//     });
// }

// export default conn2;


