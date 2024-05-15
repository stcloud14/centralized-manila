import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database1 = process.env.DB_DATABASE1;


const conn1 = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database1,
  });
  
  conn1.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      return;
    }
    console.log("Connected to the admindatabase");
  });


export default conn1;


