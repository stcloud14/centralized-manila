import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';



const router = Router();


router.get('/', async (req, res) => {
    const query = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, tp.acc_name, tp.rp_tdn, tp.rp_pin, y.year_period, tp.period_id, \
    ti.amount, ti.copies, ti.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN year y ON tp.year_id = y.year_id \
    \
    WHERE ut.trans_type_id = 1 AND ut.status_type = 'Paid'";

    const query1 = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, tp.rp_tdn, tp.rp_pin, \
    ti.amount, ti.copies, ti.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_clearance tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    \
    WHERE ut.trans_type_id = 2 AND ut.status_type = 'Paid'";

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);

        let userTransactions = [];
        let userTransactions1 = [];

        if (result.length > 0) {
            userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        if (result1.length > 0) {
            userTransactions1 = result1.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        res.json({
            taxpayment: userTransactions,
            taxclearance: userTransactions1,
        });
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