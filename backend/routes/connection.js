import mysql from "mysql";
import dotenv from 'dotenv';
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
      setTimeout(handleDisconnect, 1500);  // Retry connection after 2 seconds
    } else {
      console.log("Connected to the clientdatabase");
    }
  });

  conn2.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();  // Reconnect if the connection is lost
    } else {
      throw err;  // Handle other errors
    }
  });
}

handleDisconnect();

export default conn2;
