import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';


const router = Router();


router.get('/:user_id', async (req, res) => {

    const user_id = req.params.user_id;

    const query = "SELECT * FROM user_notif WHERE user_id = ? ORDER BY date DESC";
    const values = [user_id];
  
    try {
    const result = await queryDatabase(query, values);

    if (result.length > 0) {
        const notifications = result.map(row => {
            const formattedDate = moment(row.date).format('MMMM D, YYYY');
            const formattedTime = moment(row.date).format('h:mm A');

            return {
                ...row,
                date: formattedDate,
                time: formattedTime,
            };
        });

        res.json(notifications);

    } else {
        res.status(404).send('No records found for the specified user_id');
    }
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
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