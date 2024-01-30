import { Router } from 'express';
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get('/', async (req, res) => {

        const query = "SELECT * FROM user_transaction";
        const query1 = "SELECT * FROM transaction_info";
        const query2 = "SELECT * FROM birth_cert";
        const query3 = "SELECT * FROM birth_doc_owner";
        const query4 = "SELECT * FROM birth_info";
        const query5 = "SELECT * FROM birth_requestor";
        const query6 = "SELECT * FROM father_info";
        const query7 = "SELECT * FROM mother_info";

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
        const result2 = await queryDatabase(query2);
        const result3 = await queryDatabase(query3);
        const result4 = await queryDatabase(query4);
        const result5 = await queryDatabase(query5);
        const result6 = await queryDatabase(query6);
        const result7 = await queryDatabase(query7);

    res.json({ user_transaction: result, transaction_info: result1, birth_cert: result2, birth_doc_owner: result3, birth_info: result4, birth_requestor: result5, father_info: result6, mother_info: result7 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });

  router.post('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const {
        birthc_lname,
        birthc_fname,
        birthc_mname,
        birthc_suffix,
        birthc_sex,
        birthc_region,
        birthc_province,
        birthc_municipal,
        birthc_date,
        birthc_fatherlname,
        birthc_fatherfname,
        birthc_fathermname,
        birthc_fathersuffix,
        birthc_motherlname,
        birthc_motherfname,
        birthc_mothermname,
        birthc_mothersuffix,
        birthc_reqlname,
        birthc_reqfname,
        birthc_reqmname,
        birthc_reqsuffix,
        birthc_reqrelation,
        birthc_reqtin,
        birthc_reqtelnum,
        birthc_reqmobnum,
        birthc_reqregion,
        birthc_reqprovince,
        birthc_reqmunicipal,
        birthc_reqbrgy,
        birthc_reqhnum,
        birthc_reqstreet,
        birthc_reqzip,
        birthc_country,
        birthc_bren,
        birthc_hospital,
        birthc_nocopies,
        birthc_print,
        birthc_purpose,
        birthc_validid,
        amount,
    } = req.body;

    const purpose = parseInt(req.body.birthc_purpose, 10) || null;
    const validID = parseInt(req.body.birthc_validid, 10) || null;
    const transID = generateTransactionID();
    const transType = '5';
    const statusType = 'Pending';
    const notif_title = 'Transaction Payment Pending';
    const plainAmount = amount;
    const trans_type = 'Birth Certificate';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transID}</span> is currently awaiting payment. Please pay the required amount of <span className="font-medium dark:text-white">P ${plainAmount}</span>.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const expiryDate = new Date();
    expiryDate.setDate(date.getDate() + 5);
    const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')} ${expiryDate.getHours().toString().padStart(2, '0')}:${expiryDate.getMinutes().toString().padStart(2, '0')}:${expiryDate.getSeconds().toString().padStart(2, '0')}`;

    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`, `expiry_date`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate, formattedExpiryDate];

    const query1 = "INSERT INTO transaction_info (`transaction_id`, `amount`, `copies`, `print_id`, `valid_id`, `purpose_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [transID, plainAmount, birthc_nocopies, birthc_print, validID, purpose];

    const query2 = "INSERT INTO birth_cert (`transaction_id`, `region_id`, `prov_id`, `city_id`) VALUES (?, ?, ?, ?)";
    const values2 = [transID, birthc_region, birthc_province, birthc_municipal];

    const query3 = "INSERT INTO birth_doc_owner (`transaction_id`, `l_name`, `f_name`, `m_name`, `suffix_type`, `sex_id`, `hospital_name`, `country`, `birth_reg_no`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values3 = [transID, birthc_lname, birthc_fname, birthc_mname, birthc_suffix, birthc_sex, birthc_hospital, birthc_country, birthc_bren];

    const query4 = "INSERT INTO birth_info (`transaction_id`, `user_id`, `birth_date`) VALUES (?, ?, ?)";
    const values4 = [transID, user_id, birthc_date];

    const query5 = "INSERT INTO birth_requestor (`transaction_id`, `l_name`, `f_name`, `m_name`, `suffix_type`, `owner_relation`, `requestor_tin`, `tel_no`, `mobile_no`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values5 = [transID, birthc_reqlname, birthc_reqfname, birthc_reqmname, birthc_reqsuffix, birthc_reqrelation, birthc_reqtin, birthc_reqtelnum, birthc_reqmobnum];

    const query6 = "INSERT INTO father_info (`transaction_id`, `father_lname`, `father_fname`, `father_mname`, `suffix_type`) VALUES (?, ?, ?, ?, ?)";
    const values6 = [transID, birthc_fatherlname, birthc_fatherfname, birthc_fathermname, birthc_fathersuffix];

    const query7 = "INSERT INTO mother_info (`transaction_id`, `mother_lname`, `mother_fname`, `mother_mname`, `suffix_type`) VALUES (?, ?, ?, ?, ?)";
    const values7 = [transID, birthc_motherlname, birthc_motherfname, birthc_mothermname, birthc_mothersuffix];

    const query8 = "INSERT INTO address_info (`transaction_id`, `region_id`, `prov_id`, `city_id`, `brgy_dist`, `house_floor`, `bldg_name`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values8 = [transID, birthc_reqregion, birthc_reqprovince, birthc_reqmunicipal, birthc_reqbrgy, birthc_reqhnum, birthc_reqstreet, birthc_reqzip];

    const query9 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values9 = [user_id, formattedDate, notif_title, notif_message];


    try {
        const result = await queryDatabase(query, values);
        const result1 = await queryDatabase(query1, values1);
        const result2 = await queryDatabase(query2, values2);
        const result3 = await queryDatabase(query3, values3);
        const result4 = await queryDatabase(query4, values4);
        const result5 = await queryDatabase(query5, values5);
        const result6 = await queryDatabase(query6, values6);
        const result7 = await queryDatabase(query7, values7);
        const result8 = await queryDatabase(query8, values8);
        const result9 = await queryDatabase(query9, values9);

        res.json({
            message: "Successfully executed",
            user_transaction_result: result,
            transaction_info_result: result1,
            birth_cert_result: result2,
            birth_doc_owner_result: result3,
            birth_info: result4,
            birth_requestor_result: result5,
            father_info_result: result6,
            mother_info_result: result7,
            address_info_result: result8,
            notif_result: result9,
      
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