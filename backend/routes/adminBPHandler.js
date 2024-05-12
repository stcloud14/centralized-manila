import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

import auditMiddleware from './auditMiddleware.js';

const router = Router();


router.get('/', async (req, res) => {
    const query = "SELECT  r.region_name AS bus_bregion, ut.user_id, ut.date_processed, p.prov_name AS bus_bprovince, ut.status_type, c.city_name AS bus_bcity, \
    ba.brgy_dist AS bus_bbrgy, ba.house_floor AS bus_bhnum, ba.bldg_name AS bus_bstreet, ba.zip_code AS bus_bzip, bp.transaction_id,\
    bp.bus_name, bp.bus_franchise, bp.bus_reg_no, bp.bus_tin, bp.bus_lessor, bp.bus_rent, bp.owned, \
    bo.bus_fname, bo.bus_mname, bo.bus_lname, bo.suffix_type AS bus_suffix, st.sex_type AS bus_sex,\
    ai.email AS bus_email, ai.tel_no AS bus_tel_no, ai.mobile_no AS bus_mobile_no, \
    bot.bus_floor, bot.bus_emp, bot.bus_male_emp, bot.bus_female_emp, bot.bus_van_no, bot.bus_truck_no, bot.bus_motor_no,\
    bp.bus_lessor, bp.bus_rent, bi.bus_tax_incentives,\
    bi.bus_dti_reg, bi.bus_rptax_decbldg, bi.bus_sec_paid, bi.bus_sec_articles, bi.bus_nga, bi.bus_sec_front, bi.bus_rptax_decland, bi.bus_fire, bi.bus_page2, bi.bus_page3, bi.bus_page4, bi.bus_page5,\
    bbt.bus_type_label AS bus_type, \
    ti.amount as amount, ti.copies, ptt.print_type, ti.valid_id, tt.trans_type, pt.purpose_type, \
    r1.region_name AS bus_region, p1.prov_name AS bus_province, c1.city_name AS bus_city, \
    ai.brgy_dist AS bus_brgy, ai.house_floor AS bus_hnum, ai.bldg_name AS bus_street, ai.zip_code AS bus_zip  \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND ut.transaction_id IS NOT NULL \
    LEFT JOIN transaction_info ti ON bp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id AND tt.trans_type_id IS NOT NULL \
    LEFT JOIN address_info ai ON bp.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN bus_address ba ON bp.transaction_id = ba.transaction_id AND ba.transaction_id IS NOT NULL \
    LEFT JOIN bus_owner bo ON bp.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL \
    LEFT JOIN bus_images bi ON bp.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN bus_operation bot ON bp.transaction_id = bot.transaction_id AND bot.transaction_id IS NOT NULL \
    LEFT JOIN region r ON ba.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON ba.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON ba.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN bus_type bbt ON bp.bus_type = bbt.bus_type \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE  ut.trans_type_id = 3 AND ut.status_type = 'Pending'";

    const query1 = "SELECT bus_office, bus_line, bus_psic, bus_products, bus_units_no, bus_total_cap\
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_activity ba ON ut.transaction_id = ba.transaction_id AND ut.transaction_id IS NOT NULL \
    \
    WHERE ut.trans_type_id = 3 AND ut.status_type = 'Pending'";


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
            businesspermit: userTransactions,
            businesspermit1: userTransactions1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


router.get('/charges', async (req, res) => {
    const query = "SELECT  r.region_name AS bus_bregion, ut.user_id, ut.date_processed, p.prov_name AS bus_bprovince, ut.status_type, c.city_name AS bus_bcity, \
    ba.brgy_dist AS bus_bbrgy, ba.house_floor AS bus_bhnum, ba.bldg_name AS bus_bstreet, ba.zip_code AS bus_bzip, bp.transaction_id,\
    bp.bus_name, bp.bus_franchise, bp.bus_reg_no, bp.bus_tin, bp.bus_lessor, bp.bus_rent, bp.owned, \
    bo.bus_fname, bo.bus_mname, bo.bus_lname, bo.suffix_type AS bus_suffix, st.sex_type AS bus_sex,\
    ai.email AS bus_email, ai.tel_no AS bus_tel_no, ai.mobile_no AS bus_mobile_no, \
    bot.bus_floor, bot.bus_emp, bot.bus_male_emp, bot.bus_female_emp, bot.bus_van_no, bot.bus_truck_no, bot.bus_motor_no,\
    bp.bus_lessor, bp.bus_rent, bi.bus_tax_incentives,\
    bi.bus_dti_reg, bi.bus_rptax_decbldg, bi.bus_sec_paid, bi.bus_sec_articles, bi.bus_nga, bi.bus_sec_front, bi.bus_rptax_decland, bi.bus_fire, bi.bus_page2, bi.bus_page3, bi.bus_page4, bi.bus_page5,\
    bbt.bus_type_label AS bus_type, \
    ti.amount as amount, ti.copies, ptt.print_type, ti.valid_id, tt.trans_type, pt.purpose_type, \
    r1.region_name AS bus_region, p1.prov_name AS bus_province, c1.city_name AS bus_city, \
    ai.brgy_dist AS bus_brgy, ai.house_floor AS bus_hnum, ai.bldg_name AS bus_street, ai.zip_code AS bus_zip  \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND ut.transaction_id IS NOT NULL \
    LEFT JOIN transaction_info ti ON bp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id AND tt.trans_type_id IS NOT NULL \
    LEFT JOIN address_info ai ON bp.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN bus_address ba ON bp.transaction_id = ba.transaction_id AND ba.transaction_id IS NOT NULL \
    LEFT JOIN bus_owner bo ON bp.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL \
    LEFT JOIN bus_images bi ON bp.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN bus_operation bot ON bp.transaction_id = bot.transaction_id AND bot.transaction_id IS NOT NULL \
    LEFT JOIN region r ON ba.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON ba.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON ba.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN bus_type bbt ON bp.bus_type = bbt.bus_type \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE  ut.trans_type_id = 3 AND ut.status_type = 'Processing'";

    const query1 = "SELECT bus_office, bus_line, bus_psic, bus_products, bus_units_no, bus_total_cap\
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_activity ba ON ut.transaction_id = ba.transaction_id AND ut.transaction_id IS NOT NULL \
    \
    WHERE ut.trans_type_id = 3 AND ut.status_type = 'Processing'";


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
            businesspermit: userTransactions,
            businesspermit1: userTransactions1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


router.get('/processing', async (req, res) => {
    const query = "SELECT  r.region_name AS bus_bregion, ut.user_id, ut.date_processed, p.prov_name AS bus_bprovince, ut.status_type, c.city_name AS bus_bcity, \
    ba.brgy_dist AS bus_bbrgy, ba.house_floor AS bus_bhnum, ba.bldg_name AS bus_bstreet, ba.zip_code AS bus_bzip, bp.transaction_id,\
    bp.bus_name, bp.bus_franchise, bp.bus_reg_no, bp.bus_tin, bp.bus_lessor, bp.bus_rent, bp.owned, \
    bo.bus_fname, bo.bus_mname, bo.bus_lname, bo.suffix_type AS bus_suffix, st.sex_type AS bus_sex,\
    ai.email AS bus_email, ai.tel_no AS bus_tel_no, ai.mobile_no AS bus_mobile_no, \
    bot.bus_floor, bot.bus_emp, bot.bus_male_emp, bot.bus_female_emp, bot.bus_van_no, bot.bus_truck_no, bot.bus_motor_no,\
    bp.bus_lessor, bp.bus_rent, bi.bus_tax_incentives,\
    bi.bus_dti_reg, bi.bus_rptax_decbldg, bi.bus_sec_paid, bi.bus_sec_articles, bi.bus_nga, bi.bus_sec_front, bi.bus_rptax_decland, bi.bus_fire, bi.bus_page2, bi.bus_page3, bi.bus_page4, bi.bus_page5,\
    bbt.bus_type_label AS bus_type, \
    ti.amount as amount, ti.copies, ptt.print_type, ti.valid_id, tt.trans_type, pt.purpose_type, \
    r1.region_name AS bus_region, p1.prov_name AS bus_province, c1.city_name AS bus_city, \
    ai.brgy_dist AS bus_brgy, ai.house_floor AS bus_hnum, ai.bldg_name AS bus_street, ai.zip_code AS bus_zip  \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND ut.transaction_id IS NOT NULL \
    LEFT JOIN transaction_info ti ON bp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id AND tt.trans_type_id IS NOT NULL \
    LEFT JOIN address_info ai ON bp.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN bus_address ba ON bp.transaction_id = ba.transaction_id AND ba.transaction_id IS NOT NULL \
    LEFT JOIN bus_owner bo ON bp.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL \
    LEFT JOIN bus_images bi ON bp.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN bus_operation bot ON bp.transaction_id = bot.transaction_id AND bot.transaction_id IS NOT NULL \
    LEFT JOIN region r ON ba.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON ba.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON ba.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN bus_type bbt ON bp.bus_type = bbt.bus_type \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE  ut.trans_type_id = 3 AND ut.status_type = 'Paid' ORDER BY ut.date_processed DESC";

    const query1 = "SELECT bus_office, bus_line, bus_psic, bus_products, bus_units_no, bus_total_cap\
    \
    FROM user_transaction ut \
    \
    LEFT JOIN bus_activity ba ON ut.transaction_id = ba.transaction_id AND ut.transaction_id IS NOT NULL \
    \
    WHERE ut.trans_type_id = 3 AND ut.status_type = 'Paid'";


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
            businesspermit: userTransactions,
            businesspermit1: userTransactions1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

router.post('/updateamount/:transaction_id', auditMiddleware, async (req, res) => {
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