import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';



const router = Router();


router.get('/', async (req, res) => {
    const query = "SELECT \
    uv.user_id, \
    uv.verification_status, \
    uv.application_status, \
    uv.user_valid_id, \
    up.f_name, \
    up.m_name, \
    up.l_name, \
    up.suffix_type, \
    up.sex_type, \
    up.cvl_status, \
    up.res_status, \
    up.czn_status, \
    ub.birth_date, \
    ub.birth_place, \
    uc.user_email, \
    uc.mobile_no, \
    uc.tel_no, \
    r.region_name, \
    p.prov_name, \
    c.city_name, \
    uc.house_floor, \
    uc.bldg_name, \
    uc.brgy_dist, \
    uc.zip_code, \
    ug.user_tin_id, \
    ug.user_pgb_id, \
    ug.user_philh_id, \
    ug.user_sss_id, \
    ug.user_gsis_id, \
    ug.user_natl_id, \
    ui.user_image \
  FROM \
    user_verification uv \
  LEFT JOIN \
    user_personal up ON up.user_id = uv.user_id AND up.user_id IS NOT NULL \
  LEFT JOIN \
    user_birth ub ON ub.user_id = uv.user_id AND ub.user_id IS NOT NULL \
  LEFT JOIN \
    user_contact uc ON uc.user_id = uv.user_id AND uc.user_id IS NOT NULL \
  LEFT JOIN \
    user_gov_id ug ON ug.user_id = uv.user_id AND ug.user_id IS NOT NULL \
  LEFT JOIN \
    user_image ui ON ui.user_id = uv.user_id AND ui.user_id IS NOT NULL \
  JOIN \
    region r ON uc.region_id = r.region_id AND uc.region_id \
  JOIN \
    province p ON uc.prov_id = p.prov_id AND uc.prov_id \
  JOIN \
    cities c ON uc.city_id = c.city_id AND uc.city_id \
  WHERE \
    uv.application_status = 'Applying' AND uv.user_valid_id IS NOT NULL \
  ORDER BY up.l_name;";

    try {
        const result = await queryDatabase(query);
      
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});



router.post('/approve/:user_id', async (req, res) => {

    const user_id = req.params.user_id;
    const vStatus = 'Verified';
    const aStatus = 'Complete';
   
    try {
      const query = "UPDATE user_verification SET `verification_status` = ?, `application_status` = ? WHERE `user_id` = ?";
      const values = [vStatus, aStatus, user_id];
      
      const result = await queryDatabase(query, values);
      
      res.json({
        success: true,
        message: "Verification approved!",
        result: result,
      });

    } catch (error) {
      console.error('Error during verification:', error);
      res.status(500).json({ success: false, message: 'Verification failed' });
    }
});


router.post('/decline/:user_id', async (req, res) => {

  const user_id = req.params.user_id;
  const vStatus = 'Unverified';
  const aStatus = 'Declined';
 
  try {
    const query = "UPDATE user_verification SET `verification_status` = ?, `application_status` = ? WHERE `user_id` = ?";
    const values = [vStatus, aStatus, user_id];
    
    const result = await queryDatabase(query, values);
    
    res.json({
      success: true,
      message: "Verification approved!",
      result: result,
    });

  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, message: 'Verification failed' });
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