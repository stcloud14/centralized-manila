import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

import auditMiddleware from './auditMiddleware.js';

const router = Router();

router.get('/', async (req, res) => {

    // Birth Certificate Details
    const query = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, br.l_name AS reql_name, br.f_name AS reqf_name, br.m_name AS reqm_name, st.sex_type, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, bi.birth_date, \
    bo.l_name, bo.m_name, bo.f_name, bo.suffix_type, bo.hospital_name, bo.country, bo.birth_reg_no, \
    r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type, \
    fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, \
    mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, \
    \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL \
    LEFT JOIN birth_doc_owner bo ON ut.transaction_id = bo.transaction_id and bo.transaction_id IS NOT NULL \
    LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
    LEFT JOIN father_info fi ON ut.transaction_id = fi.transaction_id AND fi.transaction_id IS NOT NULL \
    LEFT JOIN mother_info mi ON ut.transaction_id = mi.transaction_id AND mi.transaction_id IS NOT NULL \
    LEFT JOIN region r ON bc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON bc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON bc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 5 AND ut.status_type = 'Paid'";

    // Death Certificate Details
    const query1 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, dc.death_date, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, \
    do.l_name, do.f_name, do.m_name, do.suffix_type, do.sex_id, st.sex_type, \
    dr.l_name AS reql_name, dr.f_name AS reqf_name, dr.m_name AS reqm_name, dr.suffix_type AS reqsuffix, \
    dr.owner_rel, dr.mobile_no, dr.tel_no, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN death_doc_owner do ON ut.transaction_id = do.transaction_id AND do.transaction_id IS NOT NULL \
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL \
    LEFT JOIN death_requestor dr ON ut.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL \
    LEFT JOIN region r ON dc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON dc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON dc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    LEFT JOIN sex_type st ON do.sex_id = st.sex_id \
    \
    WHERE ut.trans_type_id = 6 AND ut.status_type = 'Paid'";

    // Marriage Certificate Details
    const query2 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, mc.marriage_date, \
    hi.husband_fname, hi.husband_mname, hi.husband_lname, hi.suffix_type AS husband_suffix, \
    wi.wife_fname, wi.wife_mname, wi.wife_lname, wi.suffix_type AS wife_suffix, \
    ci.consent_lname AS reql_name, ci.consent_fname AS reqf_name, ci.consent_mname AS reqm_name, ci.suffix_type AS reqsuffix, ci.owner_rel, ci.tel_no, ci.mobile_no, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN husband_info hi ON ut.transaction_id = hi.transaction_id AND hi.transaction_id IS NOT NULL \
    LEFT JOIN wife_info wi ON ut.transaction_id = wi.transaction_id AND wi.transaction_id IS NOT NULL \
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
    LEFT JOIN consent_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN region r ON mc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON mc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON mc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
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

router.get('/processing', async (req, res) => {

    // Birth Certificate Details Process
    const query = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, br.l_name AS reql_name, br.f_name AS reqf_name, br.m_name AS reqm_name, st.sex_id, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, bi.birth_date, \
    bo.l_name, bo.m_name, bo.f_name, bo.suffix_type, bo.hospital_name, bo.country, bo.birth_reg_no, \
    r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type, \
    fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, \
    mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, \
    \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL \
    LEFT JOIN birth_doc_owner bo ON ut.transaction_id = bo.transaction_id and bo.transaction_id IS NOT NULL \
    LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
    LEFT JOIN father_info fi ON ut.transaction_id = fi.transaction_id AND fi.transaction_id IS NOT NULL \
    LEFT JOIN mother_info mi ON ut.transaction_id = mi.transaction_id AND mi.transaction_id IS NOT NULL \
    LEFT JOIN region r ON bc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON bc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON bc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 5 AND ut.status_type = 'Processing'";

    // Death Certificate Details Process
    const query1 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, dc.death_date, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, \
    do.l_name, do.f_name, do.m_name, do.suffix_type, do.sex_id, st.sex_type, \
    dr.l_name AS reql_name, dr.f_name AS reqf_name, dr.m_name AS reqm_name, dr.suffix_type AS reqsuffix, \
    dr.owner_rel, dr.mobile_no, dr.tel_no, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN death_doc_owner do ON ut.transaction_id = do.transaction_id AND do.transaction_id IS NOT NULL \
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL \
    LEFT JOIN death_requestor dr ON ut.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL \
    LEFT JOIN region r ON dc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON dc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON dc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    LEFT JOIN sex_type st ON do.sex_id = st.sex_id \
    \
    WHERE ut.trans_type_id = 6 AND ut.status_type = 'Processing'";

    // Marriage Certificate Details Process
    const query2 = "SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, mc.marriage_date, \
    hi.husband_fname, hi.husband_mname, hi.husband_lname, hi.suffix_type AS husband_suffix, \
    wi.wife_fname, wi.wife_mname, wi.wife_lname, wi.suffix_type AS wife_suffix, \
    ci.consent_lname AS reql_name, ci.consent_fname AS reqf_name, ci.consent_mname AS reqm_name, ci.suffix_type AS reqsuffix, ci.owner_rel, ci.tel_no, ci.mobile_no, \
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN husband_info hi ON ut.transaction_id = hi.transaction_id AND hi.transaction_id IS NOT NULL \
    LEFT JOIN wife_info wi ON ut.transaction_id = wi.transaction_id AND wi.transaction_id IS NOT NULL \
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
    LEFT JOIN consent_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN region r ON mc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON mc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON mc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE ut.trans_type_id = 7 AND ut.status_type = 'Processing'";

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