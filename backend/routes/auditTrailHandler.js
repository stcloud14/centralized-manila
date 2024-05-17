import { Router } from 'express';
// import conn1 from './connection1.js';

const router = Router();


router.get('/', async (req, res) => {

    const query = "SELECT * FROM audit_trail ORDER BY time_stamp DESC";
  
    try {
    const result = await queryDatabase(query);
    

    res.json(result);
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });


  function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        conn1.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}




export default router;