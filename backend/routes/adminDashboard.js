import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();


router.get('/transstats/', async (req, res) => {

    const query = "SELECT \
    subquery.earliest_month, \
    subquery.second_last_month, \
    subquery.previous_month, \
    subquery.latest_month, \
    \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS tp_last, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS tp_second_last, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS tp_previous, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS tp_current, \
    \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS tc_last, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS tc_second_last, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS tc_previous, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS tc_current, \
    \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS bp_last, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS bp_second_last, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS bp_previous, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS bp_current, \
    \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS cc_last, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS cc_second_last, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS cc_previous, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS cc_current, \
    \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS bc_last, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS bc_second_last, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS bc_previous, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS bc_current, \
    \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS dc_last, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS dc_second_last, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS dc_previous, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS dc_current, \
    \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN DATE_FORMAT(subquery.earliest_month, '%Y-%m-01') AND LAST_DAY(subquery.earliest_month) THEN 1 END) AS mc_last, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN DATE_FORMAT(subquery.second_last_month, '%Y-%m-01') AND LAST_DAY(subquery.second_last_month) THEN 1 END) AS mc_second_last, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN DATE_FORMAT(subquery.previous_month, '%Y-%m-01') AND LAST_DAY(subquery.previous_month) THEN 1 END) AS mc_previous, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN DATE_FORMAT(subquery.latest_month, '%Y-%m-01') AND LAST_DAY(subquery.latest_month) THEN 1 END) AS mc_current\
    \
    FROM ( \
        SELECT \
            (SELECT DATE_FORMAT(DATE_SUB(MAX(date_processed), INTERVAL 3 MONTH), '%Y-%m-01') FROM user_transaction) AS earliest_month, \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction WHERE DATE_FORMAT(date_processed, '%Y-%m-01') < \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction WHERE DATE_FORMAT(date_processed, '%Y-%m-01') < \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction))) AS second_last_month, \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction WHERE DATE_FORMAT(date_processed, '%Y-%m-01') < \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction)) AS previous_month, \
            (SELECT MAX(DATE_FORMAT(date_processed, '%Y-%m-01')) FROM user_transaction) AS latest_month\
    ) AS subquery \
    \
    JOIN user_transaction ON 1=1 \
    GROUP BY subquery.earliest_month, subquery.second_last_month, subquery.previous_month, subquery.latest_month;";


  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        latestmonths: [
            result[0].earliest_month || 0,
            result[0].second_last_month || 0,
            result[0].previous_month || 0,
            result[0].latest_month || 0,
        ],
        taxpayment: [
            result[0].tp_last || 0,
            result[0].tp_second_last || 0,
            result[0].tp_previous || 0,
            result[0].tp_current || 0,
        ],
        taxclearance: [
            result[0].tc_last || 0,
            result[0].tc_second_last || 0,
            result[0].tc_previous || 0,
            result[0].tc_current || 0,
        ],
        buspermit: [
            result[0].bp_last || 0,
            result[0].bp_second_last || 0,
            result[0].bp_previous || 0,
            result[0].bp_current || 0,
        ],
        cedulacert: [
            result[0].cc_last || 0,
            result[0].cc_second_last || 0,
            result[0].cc_previous || 0,
            result[0].cc_current || 0,
        ],
        birthcert: [
            result[0].bc_last || 0,
            result[0].bc_second_last || 0,
            result[0].bc_previous || 0,
            result[0].bc_current || 0,
        ],
        deathcert: [
            result[0].dc_last || 0,
            result[0].dc_second_last || 0,
            result[0].dc_previous || 0,
            result[0].dc_current || 0,
        ],
        marriagecert: [
            result[0].mc_last || 0,
            result[0].mc_second_last || 0,
            result[0].mc_previous || 0,
            result[0].mc_current || 0,
        ]
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/taxpayment/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '1' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '1' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/taxclearance/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '2' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '2' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/businesspermit/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '3' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '3' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/cedulacert/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '4' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '4' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/birthcert/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '5' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '5' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/deathcert/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '6' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '6' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/marriagecert/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN status_type = 'Processing' THEN 1 END) AS Processing, \
    COUNT(CASE WHEN status_type = 'Complete' THEN 1 END) AS Complete, \
    COUNT(CASE WHEN trans_type_id = '7' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '7' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired', 'Processing', 'Complete');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Processing: result[0].Processing || 0,
        Complete: result[0].Complete || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/topregions/', async (req, res) => {

    const query = "SELECT r.region_name AS Regions, COUNT(*) AS Result \
    FROM user_contact uc \
    JOIN region r ON uc.region_id = r.region_id \
    WHERE uc.region_id IS NOT NULL AND uc.region_id <> '' \
    GROUP BY uc.region_id \
    ORDER BY Result DESC \
    LIMIT 3;";
  
  try {
    const result = await queryDatabase(query);

    const regions = result.map(row => row.Regions || 0);
    const results = result.map(row => row.Result || 0);

    const responseObj = {
        Regions: regions,
        Result: results
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/topprovinces/', async (req, res) => {

    const query = "SELECT p.prov_name AS Provinces, COUNT(*) AS Result \
    FROM user_contact uc \
    JOIN province p ON uc.prov_id = p.prov_id \
    WHERE uc.prov_id IS NOT NULL AND uc.prov_id <> '' \
    GROUP BY uc.prov_id \
    ORDER BY Result DESC \
    LIMIT 3;";
  
  try {
    const result = await queryDatabase(query);

    const provinces = result.map(row => row.Provinces || 0);
    const results = result.map(row => row.Result || 0);

    const responseObj = {
        Provinces: provinces,
        Result: results
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/topcities/', async (req, res) => {

    const query = "SELECT c.city_name AS Cities, COUNT(*) AS Result \
    FROM user_contact uc \
    JOIN cities c ON uc.city_id = c.city_id \
    WHERE uc.city_id IS NOT NULL AND uc.city_id <> '' \
    GROUP BY uc.city_id \
    ORDER BY Result DESC \
    LIMIT 3;";
  
  try {
    const result = await queryDatabase(query);

    const cities = result.map(row => row.Cities || 0);
    const results = result.map(row => row.Result || 0);

    const responseObj = {
        Cities: cities,
        Result: results
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/revenue/', async (req, res) => {

    const query = "SELECT \
    SUM(ti.amount) AS total_paid_amount, \
    SUM(CASE WHEN ut.trans_type_id = 1 OR ut.trans_type_id = 2 THEN ti.amount ELSE 0 END) AS total_rp, \
    SUM(CASE WHEN ut.trans_type_id = 3 THEN ti.amount ELSE 0 END) AS total_bp, \
    SUM(CASE WHEN ut.trans_type_id = 4 THEN ti.amount ELSE 0 END) AS total_cc, \
    SUM(CASE WHEN ut.trans_type_id = 5 OR ut.trans_type_id = 6 OR ut.trans_type_id = 7 THEN ti.amount ELSE 0 END) AS total_lcr, \
	DATE_FORMAT(NOW() - INTERVAL 0 MONTH, '%Y-%m-01') AS m1, \
    DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AS m2, \
    DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AS m3, \
    DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AS m4, \
    DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AS m5, \
    DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AS m6, \
    DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AS m7, \
    DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AS m8, \
    DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AS m9, \
    DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AS m10, \
    DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AS m11, \
    DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AS m12, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_1, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_2, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_3, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_4, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_5, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_6, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_7, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_8, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_9, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_10, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_11, \
    SUM(CASE WHEN ut.trans_type_id = 1 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tp_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_1, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_2, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_3, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_4, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_5, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_6, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_7, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_8, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_9, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_10, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_11, \
    SUM(CASE WHEN ut.trans_type_id = 2 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS tc_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_1, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_2, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_3, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_4, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_5, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_6, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_7, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_8, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_9, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_10, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_11, \
    SUM(CASE WHEN ut.trans_type_id = 3 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bp_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_1, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_2, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_3, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_4, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_5, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_6, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_7, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_8, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_9, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_10, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_11, \
    SUM(CASE WHEN ut.trans_type_id = 4 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS cc_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_1, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_2, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_3, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_4, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_5, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_6, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_7, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_8, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_9, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_10, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_11, \
    SUM(CASE WHEN ut.trans_type_id = 5 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS bc_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_1, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_2, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_3, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_4, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_5, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_6, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_7, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_8, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_9, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_10, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_11, \
    SUM(CASE WHEN ut.trans_type_id = 6 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS dc_12, \
    \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW(), '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() + INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_1, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW(), '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_2, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_3, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 2 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_4, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 3 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_5, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 4 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_6, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 5 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_7, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 6 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_8, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 7 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_9, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 8 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_10, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 9 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_11, \
    SUM(CASE WHEN ut.trans_type_id = 7 AND ut.date_processed >= DATE_FORMAT(NOW() - INTERVAL 11 MONTH, '%Y-%m-01') AND ut.date_processed < DATE_FORMAT(NOW() - INTERVAL 10 MONTH, '%Y-%m-01') THEN ti.amount ELSE 0 END) AS mc_12 \
    \
    FROM \
        user_transaction ut \
    JOIN \
        transaction_info ti ON ut.transaction_id = ti.transaction_id \
    WHERE \
        ut.status_type = 'Paid';";


  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        totalPaid: result[0].total_paid_amount || 0,
        totalRP: result[0].total_rp || 0,
        totalTC: result[0].total_tc || 0,
        totalBP: result[0].total_bp || 0,
        totalCC: result[0].total_cc || 0,
        totalLCR: result[0].total_lcr || 0,
        latestmonths: [
            result[0].m12 || 0,
            result[0].m11 || 0,
            result[0].m10 || 0,
            result[0].m9 || 0,
            result[0].m8 || 0,
            result[0].m7 || 0,
            result[0].m6 || 0,
            result[0].m5 || 0,
            result[0].m4 || 0,
            result[0].m3 || 0,
            result[0].m2 || 0,
            result[0].m1 || 0,
        ],
        taxpayment: [
            result[0].tp_12 || 0,
            result[0].tp_11 || 0,
            result[0].tp_10 || 0,
            result[0].tp_9 || 0,
            result[0].tp_8 || 0,
            result[0].tp_7 || 0,
            result[0].tp_6 || 0,
            result[0].tp_5 || 0,
            result[0].tp_4 || 0,
            result[0].tp_3 || 0,
            result[0].tp_2 || 0,
            result[0].tp_1 || 0,
        ],
        taxclearance: [
            result[0].tc_12 || 0,
            result[0].tc_11 || 0,
            result[0].tc_10 || 0,
            result[0].tc_9 || 0,
            result[0].tc_8 || 0,
            result[0].tc_7 || 0,
            result[0].tc_6 || 0,
            result[0].tc_5 || 0,
            result[0].tc_4 || 0,
            result[0].tc_3 || 0,
            result[0].tc_2 || 0,
            result[0].tc_1 || 0,
        ],
        buspermit: [
            result[0].bp_12 || 0,
            result[0].bp_11 || 0,
            result[0].bp_10 || 0,
            result[0].bp_9 || 0,
            result[0].bp_8 || 0,
            result[0].bp_7 || 0,
            result[0].bp_6 || 0,
            result[0].bp_5 || 0,
            result[0].bp_4 || 0,
            result[0].bp_3 || 0,
            result[0].bp_2 || 0,
            result[0].bp_1 || 0,
        ],
        cedulacert: [
            result[0].cc_12 || 0,
            result[0].cc_11 || 0,
            result[0].cc_10 || 0,
            result[0].cc_9 || 0,
            result[0].cc_8 || 0,
            result[0].cc_7 || 0,
            result[0].cc_6 || 0,
            result[0].cc_5 || 0,
            result[0].cc_4 || 0,
            result[0].cc_3 || 0,
            result[0].cc_2 || 0,
            result[0].cc_1 || 0,
        ],
        birthcert: [
            result[0].bc_12 || 0,
            result[0].bc_11 || 0,
            result[0].bc_10 || 0,
            result[0].bc_9 || 0,
            result[0].bc_8 || 0,
            result[0].bc_7 || 0,
            result[0].bc_6 || 0,
            result[0].bc_5 || 0,
            result[0].bc_4 || 0,
            result[0].bc_3 || 0,
            result[0].bc_2 || 0,
            result[0].bc_1 || 0,
        ],
        deathcert: [
            result[0].dc_12 || 0,
            result[0].dc_11 || 0,
            result[0].dc_10 || 0,
            result[0].dc_9 || 0,
            result[0].dc_8 || 0,
            result[0].dc_7 || 0,
            result[0].dc_6 || 0,
            result[0].dc_5 || 0,
            result[0].dc_4 || 0,
            result[0].dc_3 || 0,
            result[0].dc_2 || 0,
            result[0].dc_1 || 0,
        ],
        marriagecert: [
            result[0].mc_12 || 0,
            result[0].mc_11 || 0,
            result[0].mc_10 || 0,
            result[0].mc_9 || 0,
            result[0].mc_8 || 0,
            result[0].mc_7 || 0,
            result[0].mc_6 || 0,
            result[0].mc_5 || 0,
            result[0].mc_4 || 0,
            result[0].mc_3 || 0,
            result[0].mc_2 || 0,
            result[0].mc_1 || 0,
        ]
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


router.get('/verifiedusers/', async (req, res) => {

    const query = "SELECT \
    COUNT(*) AS total_users, \
    SUM(CASE WHEN verification_status = 'Verified' THEN 1 ELSE 0 END) AS total_verified, \
    SUM(CASE WHEN verification_status = 'Unverified' THEN 1 ELSE 0 END) AS total_unverified \
    FROM user_verification;";
  
  try {
    const result = await queryDatabase(query);

    res.json(result);
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

// SELECT 
//     COUNT(CASE WHEN trans_type_id = 1 THEN 1 END) AS taxpayment, 
//     COUNT(CASE WHEN trans_type_id = 2 THEN 1 END) AS taxclearance, 
//     COUNT(CASE WHEN trans_type_id = 3 THEN 1 END) AS buspermit, 
//     COUNT(CASE WHEN trans_type_id = 4 THEN 1 END) AS cedulacert, 
//     COUNT(CASE WHEN trans_type_id = 5 THEN 1 END) AS birthcert, 
//     COUNT(CASE WHEN trans_type_id = 6 THEN 1 END) AS deathcert, 
//     COUNT(CASE WHEN trans_type_id = 7 THEN 1 END) AS marriagecert, 

//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS taxpayment_last,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS taxpayment_second_last,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS taxpayment_previous,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS taxpayment_current,

//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS taxclearance_last,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS taxclearance_second_last,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS taxclearance_previous,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS taxclearance_current,
    
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS buspermit_last,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS buspermit_second_last,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS buspermit_previous,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS buspermit_current,
    
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS cedulacert_last,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS cedulacert_second_last,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS cedulacert_previous,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS cedulacert_current,
    
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS birthcert_last,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS birthcert_second_last,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS birthcert_previous,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS birthcert_current,
    
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS deathcert_last,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS deathcert_second_last,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS deathcert_previous,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS deathcert_current,
    
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS marriagecert_last,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS marriagecert_second_last,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS marriagecert_previous,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS marriagecert_current
    
// FROM user_transaction;
