import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();


router.get('/taxpayment/', async (req, res) => {

    const query = "SELECT \
    COUNT(CASE WHEN status_type = 'Pending' THEN 1 END) AS Pending, \
    COUNT(CASE WHEN status_type = 'Paid' THEN 1 END) AS Paid, \
    COUNT(CASE WHEN status_type = 'Canceled' THEN 1 END) AS Canceled, \
    COUNT(CASE WHEN status_type = 'Rejected' THEN 1 END) AS Rejected, \
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN trans_type_id = '1' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '1' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN trans_type_id = '2' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '2' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN status_type = 'Expired' THEN 1 END) AS Expired, \
    COUNT(CASE WHEN trans_type_id = '3' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '3' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN trans_type_id = '4' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '4' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN trans_type_id = '5' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '5' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN trans_type_id = '6' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '6' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
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
    COUNT(CASE WHEN trans_type_id = '7' THEN 1 END) AS Total \
    FROM user_transaction \
    WHERE trans_type_id = '7' AND status_type IN ('Pending', 'Paid', 'Canceled', 'Rejected', 'Expired');"
  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        Pending: result[0].Pending || 0,
        Paid: result[0].Paid || 0,
        Canceled: result[0].Canceled || 0,
        Rejected: result[0].Rejected || 0,
        Expired: result[0].Expired || 0,
        Total: result[0].Total || 0
    };

    res.json(responseObj);
} catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
}
});


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
