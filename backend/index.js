import express from "express";
import cors from 'cors';
import profileHandler from './routes/profileHandler.js';
import login from './routes/login.js'
import register from './routes/register.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', login);
app.use('/profile', profileHandler);
app.use('/register', register);


app.get("/", (req, res)=>{
  res.json("hello, this is the backend")
});


app.listen(8800, () => {
  console.log("Connected to backend");
});













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



