import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let conn1;


async function createPool() {
  conn1 = mysql.createPool({
    host: process.env.ADMIN_DB_HOST,
    user: process.env.ADMIN_DB_USER,
    password: process.env.ADMIN_DB_PASSWORD,
    database: process.env.ADMIN_DB_DATABASE,
    port: process.env.ADMIN_DB_PORT,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
  });

  console.log("Database conn1 created");
}

async function queryDatabase(query, params) {
  let connection;
  try {
    connection = await conn1.getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
}

async function handleDisconnect() {
  try {
    await createPool();
    console.log("Connected to the client database");
  } catch (err) {
    console.error("Error connecting to the database: " + err);
    setTimeout(handleDisconnect, 1500);  // Retry connection after 1.5 seconds
  }
}

handleDisconnect();

export default { queryDatabase };

