import { Router } from 'express';
import multer from "multer";
import path from "path";
import conn2 from './connection.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();


// router.get('/', async (req, res) => {

//     const query = "SELECT * FROM user_transaction";
//     const query1 = "SELECT * FROM transaction_info";
//     const query2 = "SELECT * FROM address_info";
//     const query3 = "SELECT * FROM bus_permit";
//     const query4 = "SELECT * FROM bus_owner";
//     const query5 = "SELECT * FROM bus_address";
//     const query6 = "SELECT * FROM bus_operation";
//     const query7 = "SELECT * FROM bus_activity";
//     const query8 = "SELECT * FROM bus_images";
  
//     try {
//     const result = await queryDatabase(query);
//     const result1 = await queryDatabase(query1);
//     const result2 = await queryDatabase(query2);
//     const result3 = await queryDatabase(query3);
//     const result4 = await queryDatabase(query4);
//     const result5 = await queryDatabase(query5);
//     const result6 = await queryDatabase(query6);
//     const result7 = await queryDatabase(query7);
//     const result8 = await queryDatabase(query8);
  
    
//     res.json({
//         user_transaction: result, 
//         transaction_info: result1, 
//         address_info: result2, 
//         bus_permit: result3, 
//         bus_owner: result4, 
//         bus_address: result5, 
//         bus_operation: result6, 
//         bus_activity: result7, 
//         bus_images: result8  
//     });

//     } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data');
//     }
//   });
  
let transID = null;
let busOffice = null;

  
  router.post('/bus/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const {
        bus_type,
        bus_name,
        bus_franchise,
        bus_reg_no,
        bus_tin,
        bus_lname,
        bus_fname,
        bus_mname,
        bus_suffix,
        bus_sex,
        bus_email,
        bus_tel_no,
        bus_mobile_no,
        bus_bregion,
        bus_bprovince,
        bus_bcity,
        bus_bbrgy,
        bus_bhnum,
        bus_bstreet,
        bus_bzip,
        bus_floor,
        bus_emp,
        bus_male_emp,
        bus_female_emp,
        bus_van_no,
        bus_truck_no,
        bus_motor_no,
        bus_region,
        bus_province,
        bus_city,
        bus_brgy,
        bus_hnum,
        bus_street,
        bus_zip,
        bus_lessor,
        bus_rent,
        bus_office,
        bus_validid,
        bus_tax_incentives,
        bus_dti_reg,
        bus_rptax_decbldg,
        bus_sec_paid,
        bus_sec_articles,
        bus_nga,
        bus_sec_front,
        bus_rptax_decland,
        bus_fire,
        bus_page2,
        bus_page3,
        bus_page4,
        bus_page5,

        bus_nocopies,
        bus_print,
        bus_purpose,
        bus_amount,
    } = req.body;

    transID = generateTransactionID();
    busOffice = bus_office;
    
    
    const transType = '3';
    const statusType = 'Pending';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;


    const query = "INSERT INTO user_transaction (`transaction_id`, `user_id`, `trans_type_id`, `status_type`, `date_processed`) VALUES (?, ?, ?, ?, ?)";
    const values = [transID, user_id, transType, statusType, formattedDate];
  
    const query1 = "INSERT INTO transaction_info (`transaction_id`, `amount`, `copies`, `print_type`, `valid_id`, `purpose_id`) VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [transID, bus_amount, bus_nocopies, bus_print, bus_validid, bus_purpose];

    const query2 = "INSERT INTO address_info (`transaction_id`, `email`, `mobile_no`, `tel_no`, `region_id`, `prov_id`, `city_id`, `brgy_dist`, `house_floor`, `bldg_name`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values2 = [transID, bus_email, bus_mobile_no, bus_tel_no, bus_region, bus_province, bus_city, bus_brgy, bus_hnum, bus_street, bus_zip];

    const query3 = "INSERT INTO bus_permit (`transaction_id`, `bus_type`, `bus_name`, `bus_franchise`, `bus_reg_no`, `bus_tin`, `bus_lessor`, `bus_rent`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values3 = [transID, bus_type, bus_name, bus_franchise, bus_reg_no, bus_tin, bus_lessor, bus_rent];

    const query4 = "INSERT INTO bus_owner (`transaction_id`, `bus_lname`, `bus_fname`, `bus_mname`, `suffix_type`, `sex_type`) VALUES (?, ?, ?, ?, ?, ?)";
    const values4 = [transID, bus_lname, bus_fname, bus_mname, bus_suffix, bus_sex];

    const query5 = "INSERT INTO bus_address (`transaction_id`, `region_id`, `prov_id`, `city_id`, `brgy_dist`, `house_floor`, `bldg_name`, `zip_code`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values5 = [transID, bus_bregion, bus_bprovince, bus_bcity, bus_bbrgy, bus_bhnum, bus_bstreet, bus_bzip];

    const query6 = "INSERT INTO bus_operation (`transaction_id`, `bus_floor`, `bus_emp`, `bus_male_emp`, `bus_female_emp`, `bus_van_no`, `bus_truck_no`, `bus_motor_no`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values6 = [transID, bus_floor, bus_emp, bus_male_emp, bus_female_emp, bus_van_no, bus_truck_no, bus_motor_no];






    // const query8 = "INSERT INTO bus_images (`transaction_id`, `bus_tax_incentives`, `bus_dti_reg`, `bus_rptax_decbldg`, `bus_sec_paid`, `bus_sec_articles`, `bus_nga`, `bus_sec_front`, `bus_rptax_decland`, `bus_fire`, `bus_page2`, `bus_page3`, `bus_page4`, `bus_page5`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    // const values8 = [transID, bus_tax_incentives, bus_dti_reg, bus_rptax_decbldg, bus_sec_paid, bus_sec_articles, bus_nga, bus_sec_front, bus_rptax_decland, bus_fire, bus_page2, bus_page3, bus_page4, bus_page5];

    try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    const result2 = await queryDatabase(query2, values2);
    const result3 = await queryDatabase(query3, values3);
    const result4 = await queryDatabase(query4, values4);
    const result5 = await queryDatabase(query5, values5);
    const result6 = await queryDatabase(query6, values6);
    // const result8 = await queryDatabase(query8, values8);
  
  
    res.json({
        user_transaction: result, 
        transaction_info: result1, 
        address_info: result2, 
        bus_permit: result3, 
        bus_owner: result4, 
        bus_address: result5, 
        bus_operation: result6, 
        // bus_images: result8  
    });

    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
    }
  });


  router.post('/busact', async (req, res) => {
    const dataArray = req.body.dataRow;
  
    try {
      
        const query = "INSERT INTO bus_activity (`bus_office`, `bus_line`, `bus_psic`, `bus_products`, `bus_units_no`, `bus_total_cap`, `transaction_id`) VALUES ?";
        const values = [dataArray.map(data => [busOffice, data.bus_line, data.bus_psic, data.bus_products, data.bus_units_no, data.bus_total_cap, transID])];

        
        // const values = [bus_line, bus_psic, bus_products, bus_units_no, bus_total_cap];
        await queryDatabase(query, values);
  
        res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error executing queries" });
    }
  });

  router.post('/busimg/:fieldName', upload.single(req.params.fieldName), async (req, res) => {
    const dataArray = req.body.selectedFiles;
  
    try {

      const query = "INSERT INTO bus_images (`transaction_id`, `bus_tax_incentives`, `bus_dti_reg`, `bus_rptax_decbldg`, `bus_sec_paid`, `bus_sec_articles`, `bus_nga`, `bus_sec_front`, `bus_rptax_decland`, `bus_fire`, `bus_page2`, `bus_page3`, `bus_page4`, `bus_page5`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = dataArray.map(data => [transID, bus_tax_incentives, bus_dti_reg, bus_rptax_decbldg, bus_sec_paid, bus_sec_articles, bus_nga, bus_sec_front, bus_rptax_decland, bus_fire, bus_page2, bus_page3, bus_page4, bus_page5]);
  
      await queryDatabase(query, values);
  
      res.json({ success: true });
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


  const uploadDestination = path.join(__dirname, 'frontend', 'src', 'uploads');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDestination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      cb(null, 'file-' + uniqueSuffix + fileExtension);
    },
  });

  const upload = multer({ storage: storage });

  router.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  router.post('/busimg', upload.single('file'), async (req, res) => {
    try {
      const transID = req.params.transaction_id;
      const filePath = req.file.path;
  
      const query = "INSERT INTO bus_images (`transaction_id`, `bus_tax_incentives`, `bus_dti_reg`, `bus_rptax_decbldg`, `bus_sec_paid`, `bus_sec_articles`, `bus_nga`, `bus_sec_front`, `bus_rptax_decland`, `bus_fire`, `bus_page2`, `bus_page3`, `bus_page4`, `bus_page5`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [transID, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath, filePath];
      
      const result = await queryDatabase(query, values);
      
      res.json({
        success: true,
        message: "File uploaded successfully",
        file_uploaded: result,
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });
  
  // const query = "INSERT INTO bus_images (`transaction_id`, `bus_dti_reg`) VALUES (?, ?)";

  export default router;