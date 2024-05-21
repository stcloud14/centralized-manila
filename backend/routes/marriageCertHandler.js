import { Router } from 'express';
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get('/', async (req, res) => {

        const query = "SELECT * FROM user_transaction";
        const query1 = "SELECT * FROM transaction_info";
        const query2 = "SELECT * FROM marriage_cert";
        const query3 = "SELECT * FROM consent_info";
        const query4 = "SELECT * FROM husband_info";
        const query5 = "SELECT * FROM wife_info";

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
        const result2 = await queryDatabase(query2);
        const result3 = await queryDatabase(query3);
        const result4 = await queryDatabase(query4);
        const result5 = await queryDatabase(query5);

    res.json({ user_transaction: result, transaction_info: result1, marriage_cert: result2, consent_info: result3, husband_info: result4, wife_info: result5 });
    } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
    }
  });

  router.post('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const {
        marriagec_hlname,
        marriagec_hfname,
        marriagec_hmname,
        marriagec_hsuffix,
        marriagec_wlname,
        marriagec_wfname,
        marriagec_wmname,
        marriagec_wsuffix,
        marriagec_region,
        marriagec_province,
        marriagec_municipal,
        marriagec_date,
        marriagec_reqlname,
        marriagec_reqfname,
        marriagec_reqmname,
        marriagec_reqsuffix,
        marriagec_reqrelation,
        marriagec_telno,
        marriagec_mobileno,
        marriagec_reqregion,
        marriagec_reqprovince,
        marriagec_reqmunicipal,
        marriagec_reqbrgy,
        marriagec_reqhnum,
        marriagec_reqstreet,
        marriagec_reqzip,
        marriagec_nocopies,
        marriagec_print,
        marriagec_purpose,
        marriagec_validid,
        amount,
    } = req.body;

    const purpose = parseInt(req.body.marriagec_purpose, 10) || null;
    const validID = parseInt(req.body.marriagec_validid, 10) || null;   
    const transID = generateTransactionID();
    const transType = '7';
    const statusType = 'Pending';
    const notif_title = 'Transaction Payment Pending';
    const plainAmount = amount;

    const trans_type = 'Marriage Certificate';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transID}</span> is currently awaiting payment. Please pay the required amount of <span className="font-medium dark:text-white">P ${plainAmount}</span>.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
    const expiryDate = new Date();
    expiryDate.setDate(date.getDate() + 5);
    const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')} ${expiryDate.getHours().toString().padStart(2, '0')}:${expiryDate.getMinutes().toString().padStart(2, '0')}:${expiryDate.getSeconds().toString().padStart(2, '0')}`;

    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`, `expiry_date`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate, formattedExpiryDate];

    const query1 = "INSERT INTO transaction_info (`transaction_id`, `amount`, `copies`, `print_id`, `valid_id`, `purpose_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [transID, plainAmount, marriagec_nocopies, marriagec_print, validID, purpose];

    const query2 = "INSERT INTO marriage_cert (`transaction_id`, `region_id`, `prov_id`, `city_id` , `marriage_date`) VALUES (?, ?, ?, ?, ?)";
    const values2 = [transID, marriagec_region, marriagec_province, marriagec_municipal, marriagec_date];

    const query3 = "INSERT INTO consent_info (`transaction_id`, `consent_lname`, `consent_fname`, `consent_mname`, `suffix_type`, `owner_rel`, `tel_no`, `mobile_no`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values3 = [transID, marriagec_reqlname, marriagec_reqfname, marriagec_reqmname, marriagec_reqsuffix, marriagec_reqrelation, marriagec_telno, marriagec_mobileno];

    const query4 = "INSERT INTO husband_info (`transaction_id`, `husband_lname`, `husband_fname`, `husband_mname`, `suffix_type`) VALUES (?, ?, ?, ?, ?)";
    const values4 = [transID, marriagec_hlname, marriagec_hfname, marriagec_hmname, marriagec_hsuffix];

    const query5 = "INSERT INTO wife_info (`transaction_id`, `wife_lname`, `wife_fname`, `wife_mname`, `suffix_type`) VALUES (?, ?, ?, ?, ?)";
    const values5 = [transID, marriagec_wlname, marriagec_wfname, marriagec_wmname, marriagec_wsuffix];

    const query6 = "INSERT INTO address_info (`transaction_id`, `region_id`, `prov_id`, `city_id`, `brgy_dist`, `house_floor`, `bldg_name`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values6 = [transID, marriagec_reqregion, marriagec_reqprovince, marriagec_reqmunicipal, marriagec_reqbrgy, marriagec_reqhnum, marriagec_reqstreet, marriagec_reqzip];

    const query7 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values7 = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(query, values);
        const result1 = await queryDatabase(query1, values1);
        const result2 = await queryDatabase(query2, values2);
        const result3 = await queryDatabase(query3, values3);
        const result4 = await queryDatabase(query4, values4);
        const result5 = await queryDatabase(query5, values5);
        const result6 = await queryDatabase(query6, values6);
        const result7 = await queryDatabase(query7, values7);

        res.json({
            message: "Successfully executed",
            user_transaction_result: result,
            transaction_info_result: result1,
            marriage_cert_result: result2,
            consent_info_result: result3,
            husband_info_result: result4,
            wife_info_result: result5,
            address_info_result: result6,
            notif_result: result7,
      
        });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error executing queries" });
        }
      });

      // function queryDatabase(query, values) {
      //   return new Promise((resolve, reject) => {
      //   conn2.query(query, values, (err, data) => {
      //       if (err) {
      //       reject(err);
      //       } else {
      //       resolve(data);
      //       }
      //   });
      //   });
      // }


      async function queryDatabase(query, values) {
        try {
            const connection = await conn2.getConnection();
            try {
                const [rows] = await connection.query(query, values);
                return rows;
            } finally {
                connection.release();
            }
        } catch (err) {
            throw err;
        }
    }
    
      function generateTransactionID() {
        const timestamp = new Date().getTime().toString().slice(0, 8);
        const uniqueID = uuidv4().split('-').join('').substring(0, 9); // Use a portion of UUID
        const transactionID = `${timestamp}-${uniqueID}`;
    
        return transactionID.toUpperCase();
      }

export default router;