import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';
import conn1 from './connection1.js';

import auditMiddleware from './auditMiddleware.js';

const router = Router();


router.get('/', async (req, res) => {

  const query = `
  SELECT
    uv.user_id,
    uv.verification_status,
    uv.application_status,
    uv.user_valid_id,
    up.f_name,
    up.m_name,
    up.l_name,
    up.suffix_type,
    st.sex_type,
    cs.cvl_status,
    rs.res_status,
    css.czn_status,
    ub.birth_date,
    ub.birth_place,
    uc.user_email,
    uc.mobile_no,
    uc.tel_no,
    r.region_name,
    p.prov_name,
    c.city_name,
    uc.house_floor,
    uc.bldg_name,
    uc.brgy_dist,
    uc.zip_code,
    ug.user_tin_id,
    ug.user_pgb_id,
    ug.user_philh_id,
    ug.user_sss_id,
    ug.user_gsis_id,
    ug.user_natl_id,
    ui.user_image,
    ui.image_url
  FROM
    user_verification uv
  LEFT JOIN
    user_personal up ON up.user_id = uv.user_id
  LEFT JOIN
    user_birth ub ON ub.user_id = uv.user_id
  LEFT JOIN
    user_contact uc ON uc.user_id = uv.user_id
  LEFT JOIN
    user_gov_id ug ON ug.user_id = uv.user_id
  LEFT JOIN
    user_image ui ON ui.user_id = uv.user_id
  LEFT JOIN
    region r ON uc.region_id = r.region_id
  LEFT JOIN
    province p ON uc.prov_id = p.prov_id
  LEFT JOIN
    sex_type st ON up.sex_id = st.sex_id
  LEFT JOIN
    cvl_status cs ON up.cvl_id = cs.cvl_id
  LEFT JOIN
    res_status rs ON up.res_id = rs.res_id
  LEFT JOIN
    czn_status css ON up.czn_id = css.czn_id
  LEFT JOIN
    cities c ON uc.city_id = c.city_id
  WHERE
    uv.application_status = 'Applying' AND uv.user_valid_id IS NOT NULL
  ORDER BY
    up.l_name;
`;

const query1 = `
  SELECT
    up.user_id,
    up.f_name,
    up.m_name,
    up.l_name,
    up.suffix_type,
    st.sex_type,
    cs.cvl_status,
    rs.res_status,
    css.czn_status,
    ub.birth_date,
    ub.birth_place,
    uc.user_email,
    uc.mobile_no,
    uc.tel_no,
    uc.region_id,
    uc.prov_id,
    uc.city_id,
    r.region_name,
    p.prov_name,
    c.city_name,
    uc.house_floor,
    uc.bldg_name,
    uc.brgy_dist,
    uc.zip_code,
    ug.user_tin_id,
    ug.user_pgb_id,
    ug.user_philh_id,
    ug.user_sss_id,
    ug.user_gsis_id,
    ug.user_natl_id,
    ui.user_image,
    ui.image_url,
    uv.verification_status,
    uv.application_status
  FROM
    user_personal up
  LEFT JOIN
    user_verification uv ON uv.user_id = up.user_id
  LEFT JOIN
    user_birth ub ON ub.user_id = up.user_id
  LEFT JOIN
    user_contact uc ON uc.user_id = up.user_id
  LEFT JOIN
    user_gov_id ug ON ug.user_id = up.user_id
  LEFT JOIN
    user_image ui ON ui.user_id = up.user_id
  LEFT JOIN
    region r ON uc.region_id = r.region_id
  LEFT JOIN
    province p ON uc.prov_id = p.prov_id
  LEFT JOIN
    sex_type st ON up.sex_id = st.sex_id
  LEFT JOIN
    cvl_status cs ON up.cvl_id = cs.cvl_id
  LEFT JOIN
    res_status rs ON up.res_id = rs.res_id
  LEFT JOIN
    czn_status css ON up.czn_id = css.czn_id
  LEFT JOIN
    cities c ON uc.city_id = c.city_id
  ORDER BY
    up.l_name;
`;

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
      
        res.json({
          verify: result,
          userlist: result1,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

router.get('/adminlist', async (req, res) => {
  const query = `
    SELECT
      au.mobile_no,
      au.password,
      au.admin_type,
      au.admin_name,
      ap.admin_image
    FROM
      admin_auth au
    LEFT JOIN
    admin_profile ap
      ON au.mobile_no = ap.mobile_no
  `;
  try {
    const result = await queryDatabase1(query);

    const adminList = result.map(admin => {
      return {
        mobile_no: admin.mobile_no,
        password: admin.password,
        admin_type: formatAdminType(admin.admin_type),
        admin_name: admin.admin_name,
        admin_image: admin.admin_image
      };
    });

    res.json({
      adminList
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Function to format admin_type values
function formatAdminType(adminType) {
  switch (adminType) {
    case 'business_admin':
      return 'Business Permit Admin';
    case 'rptax_admin':
      return 'Real Property Tax Admin';
    case 'cedula_admin':
      return 'Cedula / Community Tax Certificate Admin';
    case 'lcr_admin':
      return 'Local Civil Registry Admin'; 
    case 'chief_admin':
      return 'Chief Admin';
    case 'registry_admin':
      return 'Registry Admin';               
    default:
      return adminType; 
  }
}
router.post('/approve/:user_id/:admin_uname', auditMiddleware, async (req, res) => {

    const user_id = req.params.user_id;
    const vStatus = 'Verified';
    const aStatus = 'Complete';
    const notif_title = 'Verification Successful!';
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    const notif_message = `</span> We're excited to inform you that your account verification process has been successfully approved!  </p>`;
    try {
      const query = "UPDATE user_verification SET `verification_status` = ?, `application_status` = ? WHERE `user_id` = ?";
      const values = [vStatus, aStatus, user_id];

      const query1 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
      const values1 = [user_id, formattedDate, notif_title, notif_message];
      
      const result = await queryDatabase(query, values);
      const result1 = await queryDatabase(query1, values1);
      
      res.json({
        success: true,
        message: "Verification approved!",
        result: result,
        result1: result1,
      });

    } catch (error) {
      console.error('Error during verification:', error);
      res.status(500).json({ success: false, message: 'Verification failed' });
    }
});


router.post('/decline/:user_id/:admin_uname', auditMiddleware, async (req, res) => {

  const user_id = req.params.user_id;
  const vStatus = 'Unverified';
  const aStatus = 'Declined';
  const notif_title = 'Verification Failed!';
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  const notif_message = `</span> We regret to inform you that your verification process has been declined due to not meeting the required criteria.</p>`;
 
  try {
    const query = "UPDATE user_verification SET `verification_status` = ?, `application_status` = ? WHERE `user_id` = ?";
    const values = [vStatus, aStatus, user_id];
    

    const query1 = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values1 = [user_id, formattedDate, notif_title, notif_message];
    
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);
    
    res.json({
      success: true,
      message: "Verification Decline!",
      result: result,
      result1: result1,
    });

  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, message: 'Verification Approved' });
  }
});



// router.put('/update/:user_id', async (req, res) => {
//   const user_id = req.params.user_id;

//   const {
//     f_name, 
//     m_name, 
//     l_name, 
//     suffix_type, 
//     sex_type, 
//     cvl_status, 
//     res_status, 
//     czn_status, 
//     birth_date, 
//     birth_place, 
//     user_email, 
//     mobile_no, 
//     tel_no, 
//     region_id, 
//     prov_id, 
//     city_id, 
//     house_floor, 
//     bldg_name, 
//     brgy_dist, 
//     zip_code, 
//     user_tin_id, 
//     user_pgb_id, 
//     user_philh_id, 
//     user_sss_id, 
//     user_gsis_id, 
//     user_natl_id, 
//   } = req.body;

    
//     const query = "UPDATE user_personal SET `f_name` = ?, `m_name` = ?, `l_name` = ?, `suffix_type` = ?, `sex_type` = ?, `cvl_status` = ?, `res_status` = ?, `czn_status` = ? WHERE `user_id` = ?";
//     const values = [f_name, m_name, l_name, suffix_type, sex_type, cvl_status, res_status, czn_status, user_id];

//     const query1 = "UPDATE user_birth SET `birth_date` = ?, `birth_place` = ? WHERE user_id = ?";
//     const values1 = [birth_date, birth_place, user_id];

//     const query2 = "UPDATE user_contact SET `user_email` = ?, `mobile_no` = ?, `tel_no` = ?, `house_floor` = ?, `bldg_name` = ?, `brgy_dist` = ?, `zip_code` = ?, `region_id` = ?, `prov_id` = ?, `city_id` = ? WHERE user_id = ?";
//     const values2 = [user_email, mobile_no, tel_no, house_floor, bldg_name, brgy_dist, zip_code, region_id, prov_id, city_id, user_id];

//     const query3 = "UPDATE user_gov_id SET `user_tin_id` = ?, `user_pgb_id` = ?, `user_philh_id` = ?, `user_sss_id` = ?, `user_gsis_id` = ?, `user_natl_id` = ?  WHERE user_id = ?";
//     const values3 = [user_tin_id, user_pgb_id, user_philh_id, user_sss_id, user_gsis_id, user_natl_id, user_id];
  

//     try {
//     const result = await queryDatabase(query, values);
//     const result1 = await queryDatabase(query1, values1);
//     const result2 = await queryDatabase(query2, values2);
//     const result3 = await queryDatabase(query3, values3);
  

//     res.json({
//         user_personal: result, 
//         user_birth: result1, 
//         user_contact: result2, 
//         user_gov_id: result3, 
//     });

//     } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error executing queries" });
//     }

// });



router.put('/updateuser/:user_id', auditMiddleware, async (req, res) => {
  const user_id = req.params.user_id;

  const {
    f_name, 
    m_name, 
    l_name, 
    suffix_type, 
    sex_type, 
    cvl_status, 
    res_status, 
    czn_status, 
    birth_date, 
    birth_place, 
    user_email, 
    mobile_no, 
    tel_no, 
    region_id, 
    prov_id, 
    city_id, 
    house_floor, 
    bldg_name, 
    brgy_dist, 
    zip_code, 
    user_tin_id, 
    user_pgb_id, 
    user_philh_id, 
    user_sss_id, 
    user_gsis_id, 
    user_natl_id, 
  } = req.body;

  const updateQueries = [];

  if (f_name !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `f_name` = ? WHERE `user_id` = ?", values: [f_name, user_id] });
  }
  
  if (m_name !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `m_name` = ? WHERE `user_id` = ?", values: [m_name, user_id] });
  }
  
  if (l_name !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `l_name` = ? WHERE `user_id` = ?", values: [l_name, user_id] });
  }
  
  if (suffix_type !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `suffix_type` = ? WHERE `user_id` = ?", values: [suffix_type, user_id] });
  }
  
  if (sex_type !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `sex_id` = ? WHERE `user_id` = ?", values: [sex_type, user_id] });
  }
  
  if (cvl_status !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `cvl_status` = ? WHERE `user_id` = ?", values: [cvl_status, user_id] });
  }
  
  if (res_status !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `res_status` = ? WHERE `user_id` = ?", values: [res_status, user_id] });
  }
  
  if (czn_status !== undefined) {
    updateQueries.push({ query: "UPDATE user_personal SET `czn_status` = ? WHERE `user_id` = ?", values: [czn_status, user_id] });
  }
  
  if (birth_date !== undefined) {
    updateQueries.push({ query: "UPDATE user_birth SET `birth_date` = ? WHERE `user_id` = ?", values: [birth_date, user_id] });
  }
  
  if (birth_place !== undefined) {
    updateQueries.push({ query: "UPDATE user_birth SET `birth_place` = ? WHERE `user_id` = ?", values: [birth_place, user_id] });
  }
  
  if (user_email !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `user_email` = ? WHERE `user_id` = ?", values: [user_email, user_id] });
  }
  
  if (mobile_no !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `mobile_no` = ? WHERE `user_id` = ?", values: [mobile_no, user_id] });
  }
  
  if (tel_no !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `tel_no` = ? WHERE `user_id` = ?", values: [tel_no, user_id] });
  }
  
  if (region_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `region_id` = ? WHERE `user_id` = ?", values: [region_id, user_id] });
  }
  
  if (prov_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `prov_id` = ? WHERE `user_id` = ?", values: [prov_id, user_id] });
  }
  
  if (city_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `city_id` = ? WHERE `user_id` = ?", values: [city_id, user_id] });
  }
  
  if (house_floor !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `house_floor` = ? WHERE `user_id` = ?", values: [house_floor, user_id] });
  }
  
  if (bldg_name !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `bldg_name` = ? WHERE `user_id` = ?", values: [bldg_name, user_id] });
  }
  
  if (brgy_dist !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `brgy_dist` = ? WHERE `user_id` = ?", values: [brgy_dist, user_id] });
  }
  
  if (zip_code !== undefined) {
    updateQueries.push({ query: "UPDATE user_contact SET `zip_code` = ? WHERE `user_id` = ?", values: [zip_code, user_id] });
  }
  
  if (user_tin_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_tin_id` = ? WHERE `user_id` = ?", values: [user_tin_id, user_id] });
  }
  
  if (user_pgb_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_pgb_id` = ? WHERE `user_id` = ?", values: [user_pgb_id, user_id] });
  }
  
  if (user_philh_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_philh_id` = ? WHERE `user_id` = ?", values: [user_philh_id, user_id] });
  }
  
  if (user_sss_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_sss_id` = ? WHERE `user_id` = ?", values: [user_sss_id, user_id] });
  }
  
  if (user_gsis_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_gsis_id` = ? WHERE `user_id` = ?", values: [user_gsis_id, user_id] });
  }
  
  if (user_natl_id !== undefined) {
    updateQueries.push({ query: "UPDATE user_gov_id SET `user_natl_id` = ? WHERE `user_id` = ?", values: [user_natl_id, user_id] });
  }
  


  try {
    const results = await Promise.all(updateQueries.map(async ({ query, values }) => {
      return await queryDatabase(query, values);
    }));

    res.json(results.reduce((acc, result, index) => {
      acc[`update_${index + 1}`] = result;
      return acc;
    }, {}));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
  }

});





// function queryDatabase(query, values) {
//     return new Promise((resolve, reject) => {
//         conn2.query(query, values, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
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


async function queryDatabase1(query, values) {
  try {
    const connection = await conn1.getConnection();
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



export default router;