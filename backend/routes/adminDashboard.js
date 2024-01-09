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
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS tp_oct23, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS tp_nov23, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS tp_dec23, \
    COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS tp_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS tc_oct23, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS tc_nov23, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS tc_dec23, \
    COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS tc_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS bp_oct23, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS bp_nov23, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS bp_dec23, \
    COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS bp_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS cc_oct23, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS cc_nov23, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS cc_dec23, \
    COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS cc_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS bc_oct23, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS bc_nov23, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS bc_dec23, \
    COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS bc_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS dc_oct23, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS dc_nov23, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS dc_dec23, \
    COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS dc_jan24, \
    \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS mc_oct23, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS mc_nov23, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS mc_dec23, \
    COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS mc_jan24 \
    \
    FROM user_transaction;";


  
  try {
    const result = await queryDatabase(query);

    const responseObj = {
        taxpayment: [
            result[0].tp_oct23 || 0,
            result[0].tp_nov23 || 0,
            result[0].tp_dec23 || 0,
            result[0].tp_jan24 || 0,
        ],
        taxclearance: [
            result[0].tc_oct23 || 0,
            result[0].tc_nov23 || 0,
            result[0].tc_dec23 || 0,
            result[0].tc_jan24 || 0,
        ],
        buspermit: [
            result[0].bp_oct23 || 0,
            result[0].bp_nov23 || 0,
            result[0].bp_dec23 || 0,
            result[0].bp_jan24 || 0,
        ],
        cedulacert: [
            result[0].cc_oct23 || 0,
            result[0].cc_nov23 || 0,
            result[0].cc_dec23 || 0,
            result[0].cc_jan24 || 0,
        ],
        birthcert: [
            result[0].bc_oct23 || 0,
            result[0].bc_nov23 || 0,
            result[0].bc_dec23 || 0,
            result[0].bc_jan24 || 0,
        ],
        deathcert: [
            result[0].dc_oct23 || 0,
            result[0].dc_nov23 || 0,
            result[0].dc_dec23 || 0,
            result[0].dc_jan24 || 0,
        ],
        marriagecert: [
            result[0].mc_oct23 || 0,
            result[0].mc_nov23 || 0,
            result[0].mc_dec23 || 0,
            result[0].mc_jan24 || 0,
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
    ORDER BY result DESC \
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

//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS taxpayment_oct23,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS taxpayment_nov23,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS taxpayment_dec23,
//     COUNT(CASE WHEN trans_type_id = 1 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS taxpayment_jan24,

//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS taxclearance_oct23,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS taxclearance_nov23,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS taxclearance_dec23,
//     COUNT(CASE WHEN trans_type_id = 2 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS taxclearance_jan24,
    
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS buspermit_oct23,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS buspermit_nov23,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS buspermit_dec23,
//     COUNT(CASE WHEN trans_type_id = 3 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS buspermit_jan24,
    
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS cedulacert_oct23,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS cedulacert_nov23,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS cedulacert_dec23,
//     COUNT(CASE WHEN trans_type_id = 4 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS cedulacert_jan24,
    
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS birthcert_oct23,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS birthcert_nov23,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS birthcert_dec23,
//     COUNT(CASE WHEN trans_type_id = 5 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS birthcert_jan24,
    
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS deathcert_oct23,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS deathcert_nov23,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS deathcert_dec23,
//     COUNT(CASE WHEN trans_type_id = 6 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS deathcert_jan24,
    
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-10-01' AND '2023-10-31' THEN 1 END) AS marriagecert_oct23,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-11-01' AND '2023-11-30' THEN 1 END) AS marriagecert_nov23,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2023-12-01' AND '2023-12-31' THEN 1 END) AS marriagecert_dec23,
//     COUNT(CASE WHEN trans_type_id = 7 AND date_processed BETWEEN '2024-01-01' AND '2024-01-31' THEN 1 END) AS marriagecert_jan24
    
// FROM user_transaction;
