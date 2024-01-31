import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

import auditMiddleware from './auditMiddleware.js';

const router = Router();

router.get('/', async (req, res) => {
    const query = "SELECT ut.transaction_id, tt.trans_type, ut.user_id, ut.status_type, ut.date_processed, co.l_name, co.f_name, co.m_name, co.suffix_type, co.sex_id, cc.cedula_date, cc.prov_id, cc.city_id, cc.region_id, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ci.czn_id, ci.cvl_id, p.prov_name, c.city_name, r.region_name, cv.cvl_status, vp.valid_id_type, ct.acc_no, st.sex_type, \
    ci.height, ci.weight, ci.acr_no, ct.income_id, ct.salary_id, ct.gross_id, ct.emp_status, ct.pob_status, ti.amount, ti.valid_id, ti.purpose_id\
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN cedula_doc_owner co ON ut.transaction_id = co.transaction_id AND co.transaction_id IS NOT NULL \
    LEFT JOIN cedula_other_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN cedula_transaction_info ct ON ut.transaction_id = ct.transaction_id AND ct.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN cedula_cert cc ON ut.transaction_id = cc.transaction_id AND cc.transaction_id IS NOT NULL \
    LEFT JOIN cities c ON cc.city_id = c.city_id \
    LEFT JOIN region r ON cc.region_id = r.region_id \
    LEFT JOIN province p ON cc.prov_id = p.prov_id \
    LEFT JOIN cvl_status cv ON ci.cvl_id = cv.cvl_id \
    LEFT JOIN valid_id_type vp ON ti.valid_id = vp.valid_id \
    LEFT JOIN sex_type st ON co.sex_id = st.sex_id \
    \
    WHERE ut.trans_type_id = 4 AND ut.status_type = 'Paid'";
    

    try {
        const result = await queryDatabase(query);

        let userTransactions = [];

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

        res.json({
            cedulacert: userTransactions,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


router.get('/processing', async (req, res) => {
    const query = "SELECT ut.transaction_id, tt.trans_type, ut.user_id, ut.status_type, ut.date_processed, co.l_name, co.f_name, co.m_name, co.suffix_type, co.sex_id, cc.cedula_date, cc.prov_id, cc.city_id, cc.region_id, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ci.czn_id, ci.cvl_id, p.prov_name, c.city_name, r.region_name, cv.cvl_status, vp.valid_id_type, ct.acc_no, st.sex_type, \
    ci.height, ci.weight, ci.acr_no, ct.income_id, ct.salary_id, ct.gross_id, ct.emp_status, ct.pob_status, ti.amount, ti.valid_id, ti.purpose_id\
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN cedula_doc_owner co ON ut.transaction_id = co.transaction_id AND co.transaction_id IS NOT NULL \
    LEFT JOIN cedula_other_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN cedula_transaction_info ct ON ut.transaction_id = ct.transaction_id AND ct.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN cedula_cert cc ON ut.transaction_id = cc.transaction_id AND cc.transaction_id IS NOT NULL \
    LEFT JOIN cities c ON cc.city_id = c.city_id \
    LEFT JOIN region r ON cc.region_id = r.region_id \
    LEFT JOIN province p ON cc.prov_id = p.prov_id \
    LEFT JOIN cvl_status cv ON ci.cvl_id = cv.cvl_id \
    LEFT JOIN valid_id_type vp ON ti.valid_id = vp.valid_id \
    LEFT JOIN sex_type st ON co.sex_id = st.sex_id \
    \
    WHERE ut.trans_type_id = 4 AND ut.status_type = 'Processing'";
    
    try {
        const result = await queryDatabase(query);

        let userTransactions = [];

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

        console.log('User Transactions:', userTransactions);

    res.json({
      cedulacert: userTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
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
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;

    const notif_title = 'Transaction Rejected';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> has been <span className="font-medium dark:text-white">REJECTED</span>. Kindly view the transaction for possible causes of rejection.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Rejected' WHERE transaction_id = ?;`;

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