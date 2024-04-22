import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';


const router = Router();


router.get('/:user_id', async (req, res) => {

    const user_id = req.params.user_id;

    const query = "SELECT * FROM soa_data WHERE user_id = ?";
    const values = [user_id];
  
    try {
    const result = await queryDatabase(query, values);

    if (result.length > 0) {
        
        res.json(result);

    } else {
        res.status(404).send('No records found for the specified user_id');
    }
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
});



router.post('/store/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const data = req.body;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    // const expiryDate = moment(currentDate).add(10, 'days').endOf('day');
    // const formattedExpiryDate = expiryDate.format('YYYY-MM-DD HH:mm:ss');

    const lastDayOfMonth = moment(currentDate).endOf('month');
    const expiryDate = lastDayOfMonth.endOf('day');
    const formattedExpiryDate = expiryDate.format('YYYY-MM-DD HH:mm:ss');

    let query = "SELECT * FROM soa_data WHERE user_id = ?";
    let values = [user_id];

    try {
        const existingData = await queryDatabase(query, values);
        
        if (existingData.length > 0) {
           
            for (const item of data) {
                const expiryDate = new Date(item.expiry_date);
                if (expiryDate < currentDate) {
                    query = "UPDATE soa_data SET soa_no = ?, transaction_id = ?, date_processed = ?, expiry_date = ? WHERE user_id = ? AND transaction_id = ?";
                    values = [item.soa_no, item.transaction_id, formattedDate, formattedExpiryDate, user_id, item.transaction_id];
                    await queryDatabase(query, [values]);
                } else {
                    query = "INSERT IGNORE INTO soa_data (`soa_no`, `transaction_id`, `user_id`, `date_processed`, `expiry_date`) VALUES ?";
                    values = data.map(item => [item.soa_no, item.transaction_id, user_id, formattedDate, formattedExpiryDate]);
                    await queryDatabase(query, [values]);
                }
            }
            res.status(200).json({ message: 'Data updated successfully' });

        } else {

            query = "INSERT INTO soa_data (`soa_no`, `transaction_id`, `user_id`, `date_processed`, `expiry_date`) VALUES ?";
            values = data.map(item => [item.soa_no, item.transaction_id, user_id, formattedDate, formattedExpiryDate]);
            await queryDatabase(query, [values]);
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating data' });
    }
});





// router.post('/markread/:user_id', async (req, res) => {
//     const user_id = req.params.user_id;
  
//     const query = "UPDATE user_notif SET is_read = 1 WHERE is_read = 0 AND user_id = ?";
//     const values = [user_id];
  
//     try {
//       const result = await queryDatabase(query, values);
  
//       if (result.affectedRows > 0) {
//         // Update was successful
//         const updatedNotifications = await queryDatabase("SELECT * FROM user_notif WHERE user_id = ? ORDER BY date DESC", [user_id]);
  
//         res.json({
//           user_notif: updatedNotifications,
//         });
//       } else {
//         res.status(404).json({ error: 'No records found for the specified user_id' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Error updating data' });
//     }
//   });
  


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


export default router;