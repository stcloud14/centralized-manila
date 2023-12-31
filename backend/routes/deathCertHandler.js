import { Router } from 'express';
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();


router.get('/', async (req, res) => {

    const query = "SELECT * FROM user_transaction";
    const query1 = "SELECT * FROM transaction_info";
    const query2 = "SELECT * FROM death_cert";
    const query3 = "SELECT * FROM death_doc_owner";
    const query4 = "SELECT * FROM death_requestor";
  
    try {
    const result = await queryDatabase(query);
    const result1 = await queryDatabase(query1);
    const result2 = await queryDatabase(query2);
    const result3 = await queryDatabase(query3);
    const result4 = await queryDatabase(query4);
  
    
    res.json({ user_transaction: result, transaction_info: result1, death_cert: result2, death_doc_owner: result3, death_requestor: result4 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });
  
  
  router.post('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const {
        deathc_lname,
        deathc_fname,
        deathc_mname,
        deathc_suffix,
        deathc_sex,
        deathc_region,
        deathc_province,
        deathc_municipal,
        deathc_date,
        deathc_reqlname,
        deathc_reqfname,
        deathc_reqmname,
        deathc_reqsuffix,
        deathc_reqrelation,
        deathc_mobileno,
        deathc_telno,
        deathc_reqregion,
        deathc_reqprovince,
        deathc_reqmunicipal,
        deathc_reqbrgy,
        deathc_reqhnum,
        deathc_reqstreet,
        deathc_reqzip,
        deathc_nocopies,
        deathc_print,
        deathc_purpose,
        deathc_validid,
        deathc_amount,
    } = req.body;


    const purpose = parseInt(req.body.deathc_purpose, 10) || null;
    const validID = parseInt(req.body.deathc_validid, 10) || null;
    const transID = generateTransactionID();
    const transType = '6';
    const statusType = 'Pending';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`) VALUES (?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate];
  
    const query1 = "INSERT INTO transaction_info (`transaction_id`, `amount`, `copies`, `print_type`, `valid_id`, `purpose_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [transID, deathc_amount, deathc_nocopies, deathc_print, validID, purpose];

    const query2 = "INSERT INTO death_cert (`transaction_id`, `region_id`, `prov_id`, `city_id`, `death_date`) VALUES (?, ?, ?, ?, ?)";
    const values2 = [transID, deathc_region, deathc_province, deathc_municipal, deathc_date];

    const query3 = "INSERT INTO death_doc_owner (`transaction_id`, `l_name`, `f_name`, `m_name`, `suffix_type`, `sex_type`) VALUES (?, ?, ?, ?, ?, ?)";
    const values3 = [transID, deathc_lname, deathc_fname, deathc_mname, deathc_suffix, deathc_sex];

    const query4 = "INSERT INTO death_requestor (`transaction_id`, `l_name`, `f_name`, `m_name`, `suffix_type`, `owner_rel`, `mobile_no`, `tel_no`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values4 = [transID, deathc_reqlname, deathc_reqfname, deathc_reqmname, deathc_reqsuffix, deathc_reqrelation, deathc_mobileno, deathc_telno];
  
    const query5 = "INSERT INTO address_info (`transaction_id`, `region_id`, `prov_id`, `city_id`, `brgy_dist`, `house_floor`, `bldg_name`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values5 = [transID, deathc_reqregion, deathc_reqprovince, deathc_reqmunicipal, deathc_reqbrgy, deathc_reqhnum, deathc_reqstreet, deathc_reqzip];

    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
    const result4 = await queryDatabase(query4, values4);
    const result5 = await queryDatabase(query5, values5);
  
  
    res.json({
        message: "Successfully executed",
        user_transaction_result: result,
        transaction_info_result: result1,
        death_cert_result: result2,
        death_doc_owner_result: result3,
        death_requestor_result: result4,
        address_info_result: result5,
  
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

  function generateTransactionID() {
    const timestamp = new Date().getTime().toString().slice(0, 8);
    const uniqueID = uuidv4().split('-').join('').substring(0, 9); // Use a portion of UUID
    const transactionID = `${timestamp}-${uniqueID}`;

    return transactionID.toUpperCase();
  }

  export default router;