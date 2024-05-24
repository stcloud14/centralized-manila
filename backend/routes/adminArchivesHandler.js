import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

import auditMiddleware from './auditMiddleware.js';



const router = Router();


router.get('/rptax', async (req, res) => {
    const query = `SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, ut.expiry_date, tp.acc_name, tp.rp_tdn, tp.rp_pin, y.year_period, tp.period_id, 
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id 
    
    FROM user_transaction ut 
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL 
    LEFT JOIN year y ON tp.year_id = y.year_id 
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
    
    WHERE ut.trans_type_id = 1 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    const query1 = `SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, tp.rp_tdn, tp.rp_pin, 
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id 
    
    FROM user_transaction ut 
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN rptax_clearance tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL 
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
    
    WHERE ut.trans_type_id = 2 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);

        let userTransactions = [];
        let userTransactions1 = [];

        if (result.length > 0) {
            userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        if (result1.length > 0) {
            userTransactions1 = result1.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        res.json({
            taxpayment: userTransactions,
            taxclearance: userTransactions1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


router.get('/buspermit', async (req, res) => {
    const query = `SELECT r.region_name AS bus_bregion, ut.user_id, ut.date_processed, p.prov_name AS bus_bprovince, ut.status_type, 
                   c.city_name AS bus_bcity, ba.brgy_dist AS bus_bbrgy, ba.house_floor AS bus_bhnum, ba.bldg_name AS bus_bstreet, 
                   ba.zip_code AS bus_bzip, bp.transaction_id, bp.bus_name, bp.bus_franchise, bp.bus_reg_no, bp.bus_tin, bp.bus_lessor, 
                   bp.bus_rent, bp.owned, bo.bus_fname, bo.bus_mname, bo.bus_lname, bo.suffix_type AS bus_suffix, st.sex_type AS bus_sex,
                   ai.email AS bus_email, ai.tel_no AS bus_tel_no, ai.mobile_no AS bus_mobile_no, bot.bus_floor, bot.bus_emp, bot.bus_male_emp, 
                   bot.bus_female_emp, bot.bus_van_no, bot.bus_truck_no, bot.bus_motor_no, bp.bus_lessor, bp.bus_rent, bi.bus_tax_incentives,
                   bi.bus_dti_reg, bi.bus_rptax_decbldg, bi.bus_sec_paid, bi.bus_sec_articles, bi.bus_nga, bi.bus_sec_front, 
                   bi.bus_rptax_decland, bi.bus_fire, bi.bus_page2, bi.bus_page3, bi.bus_page4, bi.bus_page5, bbt.bus_type_label AS bus_type, 
                   ti.amount as amount, ti.copies, ptt.print_type, vt.valid_id_type, tt.trans_type, pt.purpose_type, r1.region_name AS bus_region, 
                   p1.prov_name AS bus_province, c1.city_name AS bus_city, ai.brgy_dist AS bus_brgy, ai.house_floor AS bus_hnum, 
                   ai.bldg_name AS bus_street, ai.zip_code AS bus_zip  
                   FROM user_transaction ut 
                   LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND ut.transaction_id IS NOT NULL 
                   LEFT JOIN transaction_info ti ON bp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
                   LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id AND tt.trans_type_id IS NOT NULL 
                   LEFT JOIN address_info ai ON bp.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL 
                   LEFT JOIN bus_address ba ON bp.transaction_id = ba.transaction_id AND ba.transaction_id IS NOT NULL 
                   LEFT JOIN bus_owner bo ON bp.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL 
                   LEFT JOIN bus_images bi ON bp.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL 
                   LEFT JOIN bus_operation bot ON bp.transaction_id = bot.transaction_id AND bot.transaction_id IS NOT NULL 
                   LEFT JOIN region r ON ba.region_id = r.region_id 
                   LEFT JOIN region r1 ON ai.region_id = r1.region_id 
                   LEFT JOIN province p ON ba.prov_id = p.prov_id 
                   LEFT JOIN province p1 ON ai.prov_id = p1.prov_id 
                   LEFT JOIN cities c ON ba.city_id = c.city_id 
                   LEFT JOIN cities c1 ON ai.city_id = c1.city_id 
                   LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id 
                   LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id 
                   LEFT JOIN bus_type bbt ON bp.bus_type = bbt.bus_type 
                   LEFT JOIN sex_type st ON bo.sex_id = st.sex_id 
                   LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
                   WHERE ut.trans_type_id = 3 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    const query1 = `SELECT ba.activity_id, ba.bus_office, ba.bus_line, ba.bus_psic, ba.bus_products, ba.bus_units_no, ba.bus_total_cap, ut.transaction_id
                    FROM user_transaction ut 
                    LEFT JOIN bus_activity ba ON ut.transaction_id = ba.transaction_id AND ut.transaction_id IS NOT NULL 
                    WHERE ut.trans_type_id = 3 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);

        let userTransactions = [];
        let userTransactions1 = {};

        if (result.length > 0) {
            userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        if (result1.length > 0) {
            userTransactions1 = result1.reduce((acc, row) => {
                if (!acc[row.transaction_id]) {
                    acc[row.transaction_id] = {
                        bus_office: row.bus_office,
                        bus_activity: [],
                    };
                }
        
                acc[row.transaction_id].bus_activity.push({
                    activity_id: row.activity_id,
                    bus_line: row.bus_line,
                    bus_psic: row.bus_psic,
                    bus_products: row.bus_products,
                    bus_units_no: row.bus_units_no,
                    bus_total_cap: row.bus_total_cap,
                });
        
                return acc;
            }, {});
        }        

        res.json({
            businesspermit: userTransactions,
            businesspermit1: userTransactions1,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


router.get('/cedulacert', async (req, res) => {
    const query = `SELECT ut.transaction_id, tt.trans_type, ut.user_id, ut.status_type, ut.date_processed, co.l_name, co.f_name, co.m_name, co.suffix_type, co.sex_id, cc.cedula_date, cc.prov_id, cc.city_id, cc.region_id, 
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ci.czn_id, ci.cvl_id, p.prov_name, c.city_name, r.region_name, cv.cvl_status, vp.valid_id_type, ct.acc_no, st.sex_type, 
    ci.height, ci.weight, ci.acr_no, ct.income_id, ct.salary_id, ct.gross_id, ct.emp_status, cci.ctc_attachment, ct.pob_status, ti.amount, ti.valid_id, ti.purpose_id
    
    FROM user_transaction ut 
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN cedula_doc_owner co ON ut.transaction_id = co.transaction_id AND co.transaction_id IS NOT NULL 
    LEFT JOIN cedula_other_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL 
    LEFT JOIN cedula_transaction_info ct ON ut.transaction_id = ct.transaction_id AND ct.transaction_id IS NOT NULL 
    LEFT JOIN cedula_images cci ON ut.transaction_id = cci.transaction_id AND cci.transaction_id IS NOT NULL 
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL 
    LEFT JOIN cedula_cert cc ON ut.transaction_id = cc.transaction_id AND cc.transaction_id IS NOT NULL 
    LEFT JOIN cities c ON cc.city_id = c.city_id 
    LEFT JOIN region r ON cc.region_id = r.region_id 
    LEFT JOIN province p ON cc.prov_id = p.prov_id 
    LEFT JOIN cvl_status cv ON ci.cvl_id = cv.cvl_id 
    LEFT JOIN valid_id_type vp ON ti.valid_id = vp.valid_id 
    LEFT JOIN sex_type st ON co.sex_id = st.sex_id 
    
    WHERE ut.trans_type_id = 4 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;
    
    try {
        const result = await queryDatabase(query);

        let userTransactions = [];

        if (result.length > 0) {
            userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        console.log('User Transactions:', userTransactions);

    res.json({
      cedulacert: userTransactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


router.get('/lcr', async (req, res) => {

    // Birth Certificate Details Process
    const query = `SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, br.l_name AS reql_name, br.f_name AS reqf_name, br.m_name AS reqm_name, st.sex_id, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, bi.birth_date, 
    bo.l_name, bo.m_name, bo.f_name, bo.suffix_type, bo.hospital_name, bo.country, bo.birth_reg_no, 
    r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, 
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, 
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type, 
    fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, 
    mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, 
    
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id 
    
    FROM user_transaction ut 
    
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL 
    LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL 
    LEFT JOIN birth_doc_owner bo ON ut.transaction_id = bo.transaction_id and bo.transaction_id IS NOT NULL 
    LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL 
    LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL 
    LEFT JOIN father_info fi ON ut.transaction_id = fi.transaction_id AND fi.transaction_id IS NOT NULL 
    LEFT JOIN mother_info mi ON ut.transaction_id = mi.transaction_id AND mi.transaction_id IS NOT NULL 
    LEFT JOIN region r ON bc.region_id = r.region_id 
    LEFT JOIN region r1 ON ai.region_id = r1.region_id 
    LEFT JOIN province p ON bc.prov_id = p.prov_id 
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id 
    LEFT JOIN cities c ON bc.city_id = c.city_id 
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id 
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id 
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id 
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id 
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
    
    WHERE ut.trans_type_id = 5 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    // Death Certificate Details Process
    const query1 = `SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, dc.death_date, 
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, 
    do.l_name, do.f_name, do.m_name, do.suffix_type, do.sex_id, st.sex_type, 
    dr.l_name AS reql_name, dr.f_name AS reqf_name, dr.m_name AS reqm_name, dr.suffix_type AS reqsuffix, 
    dr.owner_rel, dr.mobile_no, dr.tel_no, 
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, 
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type 
    
    FROM user_transaction ut 
    
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL 
    LEFT JOIN death_doc_owner do ON ut.transaction_id = do.transaction_id AND do.transaction_id IS NOT NULL 
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL 
    LEFT JOIN death_requestor dr ON ut.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL 
    LEFT JOIN region r ON dc.region_id = r.region_id 
    LEFT JOIN region r1 ON ai.region_id = r1.region_id 
    LEFT JOIN province p ON dc.prov_id = p.prov_id 
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id 
    LEFT JOIN cities c ON dc.city_id = c.city_id 
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id 
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id 
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id 
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
    LEFT JOIN sex_type st ON do.sex_id = st.sex_id 
    
    WHERE ut.trans_type_id = 6 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    // Marriage Certificate Details Process
    const query2 = `SELECT ut.transaction_id, ut.user_id, tt.trans_type, ut.status_type, ut.date_processed, r.region_name AS region, p.prov_name AS province, c.city_name AS city, mc.marriage_date, 
    hi.husband_fname, hi.husband_mname, hi.husband_lname, hi.suffix_type AS husband_suffix, 
    wi.wife_fname, wi.wife_mname, wi.wife_lname, wi.suffix_type AS wife_suffix, 
    ci.consent_lname AS reql_name, ci.consent_fname AS reqf_name, ci.consent_mname AS reqm_name, ci.suffix_type AS reqsuffix, ci.owner_rel, ci.tel_no, ci.mobile_no, 
    ti.amount, ti.copies, ptt.print_type, ti.valid_id, ti.purpose_id, 
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, 
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code, pt.purpose_type, vt.valid_id_type 
    
    FROM user_transaction ut 
    
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id 
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL 
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL 
    LEFT JOIN husband_info hi ON ut.transaction_id = hi.transaction_id AND hi.transaction_id IS NOT NULL 
    LEFT JOIN wife_info wi ON ut.transaction_id = wi.transaction_id AND wi.transaction_id IS NOT NULL 
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL 
    LEFT JOIN consent_info ci ON ut.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL 
    LEFT JOIN region r ON mc.region_id = r.region_id 
    LEFT JOIN region r1 ON ai.region_id = r1.region_id 
    LEFT JOIN province p ON mc.prov_id = p.prov_id 
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id 
    LEFT JOIN cities c ON mc.city_id = c.city_id 
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id 
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id 
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id 
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id 
    
    WHERE ut.trans_type_id = 7 AND (ut.status_type = 'Complete' OR ut.status_type = 'Rejected' OR ut.status_type = 'Expired') ORDER BY ut.date_processed DESC`;

    try {
        const result = await queryDatabase(query);
        const result1 = await queryDatabase(query1);
        const result2 = await queryDatabase(query2);

        let userTransactions = [];
        let userTransactions1 = [];
        let userTransactions2 =[];

        if (result.length > 0) {
            userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        if (result1.length > 0) {
            userTransactions1 = result1.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        if (result2.length > 0) {
            userTransactions2 = result2.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });
        }

        res.json({
            birthcert: userTransactions,
            deathcert: userTransactions1,
            marriagecert: userTransactions2,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});



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


  


export default router;