import { Router } from 'express';
import conn1 from './connection1.js';

const router = Router();

router.get('/:admin_type', async (req, res) => {
    const admin_type = req.params.admin_type;
    const query = "SELECT * FROM report_data WHERE admin_type = ?";
    const values = [admin_type];
  
    try {
        const result = await queryDatabase(query, values);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).send('No records found for the specified admin_type');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

router.post('/store/:admin_type', async (req, res) => {
    const admin_type = req.params.admin_type;
    const data = req.body;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    try {
        if (!data.report_no || !data.date_processed) {
            return res.status(400).send('Missing required fields');
        }

        const query = "INSERT INTO report_data (report_no, admin_type, date_processed) VALUES (?, ?, ?)";
        const values = [data.report_no, admin_type, formattedDate];

        await queryDatabase(query, values);

        res.status(201).send('Report stored successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error storing report');
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