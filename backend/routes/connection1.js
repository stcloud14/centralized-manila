import mysql from "mysql";

const conn1 = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "admindatabase",
  });
  
  conn1.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: " + err);
      return;
    }
    console.log("Connected to the admindatabase");
  });


export default conn1;


