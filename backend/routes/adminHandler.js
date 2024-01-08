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