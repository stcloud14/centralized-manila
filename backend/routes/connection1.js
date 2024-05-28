// import mysql from 'mysql2/promise';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conn1 = mysql.createPool({
  connectionLimit: 70,
  host: process.env.ADMIN_DB_HOST,
  user: process.env.ADMIN_DB_USER,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.ADMIN_DB_DATABASE,
  port: process.env.ADMIN_DB_PORT,
});


async function testConnection() {
  try {
    const connection = await conn1.getConnection();
    console.log("Connected to the admindatabase");
    // connection.release();
  } catch (err) {
    console.error("Error connecting to the database: " + err);
  }
}

testConnection();

// Close the pool when the application terminates
process.on('exit', async () => {
  try {
    await conn1.end();
    console.log('Pool closed.');
  } catch (err) {
    console.error('Error ending the pool: ' + err);
  }
});


export default conn1;




// let conn1;

// function handleDisconnect() {
//   conn1 = mysql.createConnection({
//     host: process.env.ADMIN_DB_HOST,
//     user: process.env.ADMIN_DB_USER,
//     password: process.env.ADMIN_DB_PASSWORD,
//     database: process.env.ADMIN_DB_DATABASE,
//     port: process.env.ADMIN_DB_PORT,
//     waitForConnections: true,
//     connectionLimit: 15,
//     queueLimit: 0,
//   });

//   conn1.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the database: " + err);
//       // If the database connection is down, trigger deployment
//       triggerDeployment();
//       setTimeout(handleDisconnect, 1500);  // Retry connection after 1.5 seconds
//     } else {
//       console.log("Connected to the admin database");
//     }
//   });

//   conn1.on('error', (err) => {
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

// export default conn1;
