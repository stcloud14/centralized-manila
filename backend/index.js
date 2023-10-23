import express from "express";
import mysql from "mysql";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL connection
const conn2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lagaras123",
  database: "clientdatabase",
});

conn2.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }
  console.log("Connected to the database");
});

// Define a route for user authentication



        // //Profile Information
        // app.get("/profile", (req, res)=>{
        //   const q= "SELECT * FROM user_personal WHERE user_id = 'RL1741'"
        //   conn2.query(q,(err, data)=>{
        //           if(err) return res.json(err)
        //           return res.json(data)
        //   })
        // })
        app.get('/profile/:user_id', (req, res) => {
          const user_id = req.params.user_id;

          // SQL query to fetch the user's profile data
          const sql = "SELECT * FROM user_personal WHERE user_id = ?";

          conn2.query(sql, [user_id], (err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error retrieving data');
            } else {
              res.json(result);
            }
          });
        });
            


      // Contact Info
      app.get('/profile/contact/:user_id', (req, res) => {
        const user_id = req.params.user_id;
        
        const sql = "SELECT * FROM user_contact WHERE user_id = ?";
        
        conn2.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving contact info');
            } else {
                res.json(result);
            }
        });
    });

    // Government ID
    app.get("/profile/govinfo/:user_id", (req, res) => {
        const user_id = req.params.user_id;
        const sql = "SELECT * FROM user_gov_id WHERE user_id = ?";
        conn2.query(sql, [user_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving government info');
            } else {
                res.json(result);
            }
        });
    });







    app.get("/register", async (req, res) => {
      const query = "SELECT * FROM user_reg";
      const query1 = "SELECT * FROM user_auth";
    
      try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
        
        res.json({ user_reg: result, user_auth: result1 });
      } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
      }
    });
    
    
    app.post('/register', async (req, res) => {
      const primaryKey = generatePrimaryKey(req.body.f_name, req.body.l_name, req.body.mobile_no);
    
      const query = "INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)";
      const values = [req.body.f_name, req.body.l_name, req.body.mobile_no, primaryKey];
    
      const query1 = "INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)";
      const values1 = [req.body.mobile_no, req.body.user_pass, primaryKey];
    
      try {
        const result = await queryDatabase(query, values);
        const result1 = await queryDatabase(query1, values1);
    
        res.json({
          message: "Successfully executed",
          user_reg_result: result,
          user_auth_result: result1,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
      }
    });
    
    
    function queryDatabase(query, values) {
      return new Promise((resolve, reject) => {
        conn2.query(query, values, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
    
        
    function generatePrimaryKey(firstName, lastName, mobileNo) {
          // Extract the first letter of the first name
          const firstLetterFirstName = firstName.charAt(0).toUpperCase();
        
          // Extract the first letter of the last name
          const firstLetterLastName = lastName.charAt(0).toUpperCase();
        
          // Extract the last 4 digits of the mobile number
          const last4DigitsMobile = mobileNo.slice(-4);
        
          // Concatenate the components to create the primary key
          const primaryKey = `${firstLetterFirstName}${firstLetterLastName}${last4DigitsMobile}`;
        
          console.log(primaryKey)
          return primaryKey;
        }




        
// app.post("/furns", (req, res)=>{
//     const q= "INSERT INTO furnitures (`id`, `prod_name`, `prod_desc`, `prod_image`, `prod_price`) VALUES(?)";
//     const values= [
        
//         req.body.id,
//         req.body.prod_name,
//         req.body.prod_desc,
//         req.body.prod_image,
//         req.body.prod_price
       
//     ];
//     db.query(q, [values], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("Successfully executed")
//     })
// })

// app.delete("/furns/:id", (req, res)=>{
//     const furnId= req.params.id;
//     const q= "DELETE FROM furnitures WHERE id= ?"

//     db.query(q, [furnId], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("Successfully deleted")
//     })
// })


// app.put("/furns/:id", (req, res)=>{
//     const furnId= req.params.id;
//     const q= "UPDATE furnitures SET `prod_name`=?, `prod_desc`=?, `prod_image`=?, `prod_price`=? WHERE id=?"
//     const values= [
            
//         req.body.prod_name,
//         req.body.prod_desc,
//         req.body.prod_image,
//         req.body.prod_price
        
        
//     ];


//     db.query(q,[...values, furnId], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("item has been successfully updated")
//     })
// })



app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});

app.get("/login/:username/:password", (req, res) => {
  const username = req.params.username
  const password = req.params.password
  console.log(username, password)

  // SQL query to check user credentials
  const sql = "SELECT * FROM user_auth WHERE mobile_no = ? AND user_pass = ?";

  conn2.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error occurred while authenticating." });
    }
    return res.status(200).json(results)
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});