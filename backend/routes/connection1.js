import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST1;
const user = process.env.DB_USER1;
const password = process.env.DB_PASSWORD1;
const database = process.env.DB_DATABASE1;

let conn1;

function handleDisconnect() {
  conn1 = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });

  conn1.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      setTimeout(handleDisconnect, 2000);  // Retry connection after 2 seconds
    } else {
      console.log("Connected to the admindatabase");
    }
  });

  conn1.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();  // Reconnect if the connection is lost
    } else {
      throw err;  // Handle other errors
    }
  });
}

handleDisconnect();

export default conn1;
