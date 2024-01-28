import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';


const router = Router();


router.get('/:user_id', async (req, res) => {

    const user_id = req.params.user_id;

    const query = "SELECT * FROM user_notif WHERE user_id = ? ORDER BY date DESC";
    const values = [user_id];

    const query1 = "SELECT COUNT(*) AS total_notif FROM user_notif WHERE is_read = false AND user_id = ?";
    const values1 = [user_id];

    const query2 = "SELECT * FROM user_notif WHERE user_id = ? AND is_read = false ORDER BY date DESC";
    const values2 = [user_id];
  
    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);

    if (result.length > 0) {
        
        res.json({
            user_notif: result,
            notif_count: result1[0].total_notif,
            notif_unread: result2,
        });

    } else {
        res.status(404).send('No records found for the specified user_id');
    }
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
});


router.post('/markread/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
  
    const query = "UPDATE user_notif SET is_read = 1 WHERE is_read = 0 AND user_id = ?";
    const values = [user_id];
  
    try {
      const result = await queryDatabase(query, values);
  
      if (result.affectedRows > 0) {
        // Update was successful
        const updatedNotifications = await queryDatabase("SELECT * FROM user_notif WHERE user_id = ? ORDER BY date DESC", [user_id]);
  
        res.json({
          user_notif: updatedNotifications,
        });
      } else {
        res.status(404).json({ error: 'No records found for the specified user_id' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating data' });
    }
  });
  



  
//   // API endpoint to add a new notification
//   app.post('/api/notifications/add', (req, res) => {
//     const { message } = req.body;
  
//     if (!message) {
//       res.status(400).json({ error: 'Message is required' });
//       return;
//     }
  
//     // Insert the new notification into the database
//     db.query('INSERT INTO notifications (message) VALUES (?)', [message], (err) => {
//       if (err) {
//         console.error('Error adding notification:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
//       res.json({ success: true });
//     });
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