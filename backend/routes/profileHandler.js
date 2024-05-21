import { Router } from 'express';
import conn2 from './connection.js';

const router = Router();

async function queryDatabase(connection, query, values) {
    try {
        const [rows] = await connection.query(query, values);
        return rows;
    } catch (err) {
        throw err;
    }
}

router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const sql = "SELECT * FROM user_personal WHERE user_id = ?";
    const sql1 = "SELECT * FROM user_birth WHERE user_id = ?";

    try {
        const userPersonalData = await queryDatabase(conn2, sql, [user_id]);
        const userBirthData = await queryDatabase(conn2, sql1, [user_id]);

        const userData = {
            user_personal: userPersonalData,
            birth_info: userBirthData
        };

        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});

router.get('/username/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT f_name FROM user_personal WHERE user_id = ?";
    try {
        const result = await queryDatabase(conn2, sql, [user_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving user image');
    }
});

router.get('/contact/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const sql = `
        SELECT
            uc.user_email,
            uc.mobile_no,
            uc.tel_no,
            mr.region_id,
            mp.prov_id,
            mc.city_id,
            uc.house_floor,
            uc.bldg_name,
            uc.brgy_dist,
            uc.zip_code
        FROM
            user_contact uc
            LEFT JOIN region mr ON uc.region_id = mr.region_id
            LEFT JOIN province mp ON uc.prov_id = mp.prov_id
            LEFT JOIN cities  mc ON uc.city_id = mc.city_id
        WHERE uc.user_id = ?`;
    try {
        const result = await queryDatabase(conn2, sql, [user_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving contact info');
    }
});

router.get('/govinfo/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const sql = "SELECT * FROM user_gov_id WHERE user_id = ?";
    try {
        const result = await queryDatabase(conn2, sql, [user_id]);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving government info');
    }
});

router.post('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const {
      f_name,
      m_name,
      l_name,
      suffix_type,
      sex_id,
      cvl_id,
      res_id,
      czn_id,
      birth_date,
      birth_place
  } = req.body;

  const updatePersonalQuery = 'UPDATE user_personal SET f_name=?, m_name=?, l_name=?, suffix_type=?, sex_id=?, cvl_id=?, res_id=?, czn_id=? WHERE user_id=?';
  const updateBirthQuery = 'UPDATE user_birth SET `birth_date`=?, `birth_place`=? WHERE user_id=?';

  try {
      await queryDatabase(conn2, updatePersonalQuery, [f_name, m_name, l_name, suffix_type, sex_id, cvl_id, res_id, czn_id, user_id]);
      await queryDatabase(conn2, updateBirthQuery, [birth_date, birth_place, user_id]);
      res.status(200).json({ message: 'Update successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/contact/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const {
      user_email,
      mobile_no,
      tel_no,
      house_floor,
      bldg_name,
      brgy_dist,
      zip_code,
      region_id,
      prov_id,
      city_id,
  } = req.body;

  const updateContactQuery = 'UPDATE user_contact SET `user_email`=?, `mobile_no`=?, `tel_no`=?, `house_floor`=?, `bldg_name`=?, `brgy_dist`=?, `zip_code`=?, `region_id`=?, `prov_id`=?, `city_id`=? WHERE user_id=?';

  try {
      await queryDatabase(conn2, updateContactQuery, [user_email, mobile_no, tel_no, house_floor, bldg_name, brgy_dist, zip_code, region_id, prov_id, city_id, user_id]);
      res.status(200).json({ message: 'Update successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/govinfo/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const {
      user_tin_id,
      user_pgb_id,
      user_philh_id,
      user_sss_id,
      user_gsis_id,
      user_natl_id,
  } = req.body;

  const updateGovInfoQuery = 'UPDATE user_gov_id SET `user_tin_id`=?, `user_pgb_id`=?, `user_philh_id`=?, `user_sss_id`=?, `user_gsis_id`=?, `user_natl_id`=?  WHERE user_id=?';

  try {
      await queryDatabase(conn2, updateGovInfoQuery, [user_tin_id, user_pgb_id, user_philh_id, user_sss_id, user_gsis_id, user_natl_id, user_id]);
      res.status(200).json({ message: 'Update successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
