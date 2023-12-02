import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

const router = Router();


router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = "SELECT ut.transaction_id, ut.date_processed, tt.trans_type, ut.status_type, ti.amount FROM user_transaction ut \
    JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id \
    WHERE user_id = ?";

    try {
        const result = await queryDatabase(query, [user_id]);
    
        if (result.length > 0) {
            const userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    transaction_id: row.transaction_id,
                    date: formattedDate,
                    time: formattedTime,
                    trans_type: row.trans_type,
                    status_type: row.status_type,
                    amount: row.amount
                };
            });

            res.json(userTransactions);
        } else {
            // Handle case where no rows were returned
            res.status(404).send('No records found for the specified user_id');
        }
        } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
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




export default router;