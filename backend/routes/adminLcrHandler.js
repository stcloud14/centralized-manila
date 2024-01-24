import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

const router = Router();

router.get('/', async (req, res) => {
    const query = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, br.l_name, br.f_name, br.m_name, bi.birth_date, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 5 AND ut.status_type = 'Paid'";

    const query1 = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, dr.l_name, dr.f_name, dr.m_name, dc.death_date, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL \
    LEFT JOIN death_requestor dr ON ut.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 6 AND ut.status_type = 'Paid'";

    const query2 = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, ci.consent_fname, ci.consent_mname, ci.consent_lname, mc.marriage_date, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
    LEFT JOIN consent_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 7 AND ut.status_type = 'Paid'";

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
        const result2 = await queryDatabase(query2);

        let userTransactions = [];
        let userTransactions1 = [];
        let userTransactions2 =[];

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

        if (result2.length > 0) {
            userTransactions2 = result2.map(row => {
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
            birthcert: userTransactions,
            deathcert: userTransactions1,
            marriagecert: userTransactions2,
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