import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

import auditMiddleware from './auditMiddleware.js';



const router = Router();


router.get('/', async (req, res) => {
    const query = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, ut.expiry_date, tp.acc_name, tp.rp_tdn, tp.rp_pin, y.year_period, tp.period_id, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN year y ON tp.year_id = y.year_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 1 AND ut.status_type = 'Pending'";

    const query1 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, tp.rp_tdn, tp.rp_pin, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_clearance tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 2 AND ut.status_type = 'Pending' ORDER BY ut.date_processed DESC";

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


router.get('/charges', async (req, res) => {
    const query = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, ut.expiry_date, tp.acc_name, tp.rp_tdn, tp.rp_pin, y.year_period, tp.period_id, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN year y ON tp.year_id = y.year_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 1 AND ut.status_type = 'Processing'";

    const query1 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, tp.rp_tdn, tp.rp_pin, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_clearance tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 2 AND ut.status_type = 'Processing' ORDER BY ut.date_processed DESC";

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


router.get('/processing', async (req, res) => {
    const query = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, ut.expiry_date, tp.acc_name, tp.rp_tdn, tp.rp_pin, y.year_period, tp.period_id, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN year y ON tp.year_id = y.year_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 1 AND ut.status_type = 'Paid'";

    const query1 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, tp.rp_tdn, tp.rp_pin, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_clearance tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 2 AND ut.status_type = 'Paid' ORDER BY ut.date_processed DESC";

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

router.post('/updateamount/:transaction_id/:admin_uname', auditMiddleware, async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;
    const total = req.body.totalVal;

    const notif_title = 'Transaction Undergoing Processing For Amount Declaration';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> is currently undergoing processing for amount declaration.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateAmount = `UPDATE transaction_info SET amount = ? WHERE transaction_id = ?;`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Pending'  WHERE transaction_id = ?;`;

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values = [user_id, formattedDate, notif_title, notif_message];


    try {
        const result2 = await queryDatabase(updateAmount, [total, transaction_id]);
        const result = await queryDatabase(updateQuery, [transaction_id]);
        const result1 = await queryDatabase(query,values);

        res.json({
            message: "Updated transaction!",
            success: result,
            notif: result1,
            amount: result2,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
    }
});


router.post('/updateprocess/:transaction_id', auditMiddleware, async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;

    const notif_title = 'Transaction Undergoing Processing';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> is currently undergoing processing.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Processing' WHERE transaction_id = ?;`;

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(updateQuery, [transaction_id]);
        const result1 = await queryDatabase(query,values);

        res.json({
            message: "Updated transaction!",
            success: result,
            notif: result1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
    }
});


router.post('/updatecomplete/:transaction_id', auditMiddleware, async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;

    const notif_title = 'Transaction Complete';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> has been marked <span className="font-medium dark:text-white">COMPLETE</span>. Kindly view the transaction for the next steps.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Complete' WHERE transaction_id = ?;`;

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(updateQuery, [transaction_id]);
        const result1 = await queryDatabase(query,values);

        res.json({
            message: "Updated transaction!",
            success: result,
            notif: result1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
    }
});


router.post('/updatereject/:transaction_id', auditMiddleware, async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.selectedTransaction.user_id;
    const trans_type = req.body.selectedTransaction.trans_type;
    const reject_cause = req.body.rejectCause;

    const notif_title = 'Transaction Rejected';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> has been <span className="font-medium dark:text-white">REJECTED</span>. Kindly view the transaction for possible causes of rejection.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Rejected', rejected_id = ? WHERE transaction_id = ?;`;
    const values = [reject_cause, transaction_id];

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values1 = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(updateQuery, values);
        const result1 = await queryDatabase(query, values1);

        res.json({
            message: "Updated transaction!",
            success: result,
            notif: result1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
    }
});


  

  


// function queryDatabase(query, values) {
//     return new Promise((resolve, reject) => {
//         conn2.query(query, values, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }



async function queryDatabase(query, values) {
    try {
      const connection = await conn2.getConnection();
      try {
        const [rows] = await connection.query(query, values);
        return rows;
      } finally {
        connection.release();
      }
    } catch (err) {
      throw err;
    }
}


  


export default router;