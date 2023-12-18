import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

const router = Router();


router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, \
    ti.amount, ti.copies, ti.print_type, ti.valid_id, ti.purpose_id \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    \
    WHERE ut.user_id = ?";


    try {
        const result = await queryDatabase(query, [user_id]);
    
        if (result.length > 0) {
            const userTransactions = result.map(row => {
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                };
            });

            res.json(userTransactions);
        } else {
            // Handle case where no rows were returned
            res.status(404).send('No records found for the specified user_id');
        }
        } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});

// INPUT BIRTH CERT HERE

router.get('/birthcert/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

const query = "SELECT  r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, bc.transaction_id, bi.birth_date, \
    bo.l_name, bo.f_name, bo.m_name, bo.suffix_type, bo.sex_type, bo.hospital_name, bo.country, bo.birth_reg_no, \
    br.l_name AS reql_name,br.f_name AS reqf_name, br.m_name AS reqm_name, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, \
    fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, \
    mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, \
    ti.amount, ti.copies, ti.print_type, vt.valid_id_type, pt.purpose_type, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code \
    \
    FROM birth_cert bc \
    JOIN birth_info bi ON bc.transaction_id = bi.transaction_id \
    \
    LEFT JOIN transaction_info ti ON bc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON bc.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN birth_doc_owner bo ON bc.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL \
    LEFT JOIN birth_requestor br ON bc.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
    LEFT JOIN father_info fi ON bi.transaction_id = fi.transaction_id AND fi.transaction_id IS NOT NULL \
    LEFT JOIN mother_info mi ON bi.transaction_id = mi.transaction_id AND mi.transaction_id IS NOT NULL \
    LEFT JOIN region r ON bc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON bc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON bc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    \
    WHERE  bc.transaction_id = ?"

    try {
        const result = await queryDatabase(query, [transaction_id]);
    
        if (result.length > 0) {
            const formattedDate = moment(result[0].birth_date).format('MMMM D, YYYY');
    
            const birthTransaction = {
                ...result[0],
                birth_date: formattedDate,
            };
    
            res.json(birthTransaction);
        } else {
            res.status(404).send('No records found for the specified transaction_id');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }    
});

router.get('/deathcert/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT r.region_name AS region, p.prov_name AS province, c.city_name AS city, dc.transaction_id, dc.death_date, \
    do.l_name, do.f_name, do.m_name, do.suffix_type, do.sex_type, \
    dr.l_name AS reql_name, dr.f_name AS reqf_name, dr.m_name AS reqm_name, dr.suffix_type AS reqsuffix, \
    dr.owner_rel, dr.mobile_no, dr.tel_no, \
    ti.amount, ti.copies, ti.print_type, vt.valid_id_type, pt.purpose_type, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code \
    \
    FROM death_cert dc \
    \
    LEFT JOIN transaction_info ti ON dc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON dc.transaction_id = ai.transaction_id IS NOT NULL \
    LEFT JOIN death_doc_owner do ON dc.transaction_id = do.transaction_id AND do.transaction_id IS NOT NULL \
    LEFT JOIN death_requestor dr ON dc.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL \
    LEFT JOIN region r ON dc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON dc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON dc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    \
    WHERE dc.transaction_id = ?";


    try {
        const result = await queryDatabase(query, [transaction_id]);
    
        if (result.length > 0) {
            const formattedDate = moment(result[0].death_date).format('MMMM D, YYYY');
    
            const deathTransaction = {
                ...result[0],
                death_date: formattedDate,
            };
    
            res.json(deathTransaction);
        } else {
            res.status(404).send('No records found for the specified transaction_id');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }    
});

router.get('/taxpayment/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT tp.acc_name AS tp_acc_name, tp.rp_tdn AS tp_rp_tdn, tp.rp_pin AS tp_rp_pin, \
    y.year_period AS tp_year, tp.period_id AS tp_period, ti.amount \
    \
    FROM rptax_payment tp \
    \
    LEFT JOIN transaction_info ti ON tp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN year y ON tp.year_id = y.year_id \
    \
    WHERE tp.transaction_id = ?";


    try {
        const result = await queryDatabase(query, [transaction_id]);
    
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('No records found for the specified transaction_id');
        }
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

// \
// tc.rp_tdn AS tcrp_tdn, tc.rp_pin AS tcrp_pin, \
// \
// \
// cd.region_id AS cedregion_id, cd.prov_id AS cedprov_id, cd.city_id AS cedcity_id, \
// cdo.l_name AS cedl_name, cdo.f_name AS cedf_name, cdo.m_name AS cedm_name, cdo.suffix_type AS cedsuffix_type, cdo.sex_type AS cedsex_type, \
// coi.cvl_id AS cedcvl_id, coi.czn_id AS cedczn_id, coi.height AS cedheight, coi.weight AS cedweight, coi.acr_no AS cedacr_no, \
// cti.emp_status AS cedemp_status, cti.acc_no AS cedacc_no, cti.valid_id AS cedvalid_id, cti.pob_status AS cedpob_status, cti.income_id AS cedincome_id, cti.salary_id AS cedsalary_id, cti.gross_id AS cedgross_id, \
// \
// bc.region_id AS brtregion_id, bc.prov_id AS brtprov_id, bc.city_id AS brtcity_id, \
// bdo.l_name AS brtl_name, bdo.f_name AS brtf_name, bdo.m_name AS brtm_name, bdo.suffix_type AS brtsuffix_type, bdo.sex_type AS brtsex_type, bdo.hospital_name AS brthospital_name, bdo.country AS brtcountry, bdo.birth_reg_no AS brtbirth_reg_no, \
// bi.birth_date AS brtbirth_date, bi.birth_place AS brtbirth_place, \
// br.l_name AS brtrl_name, br.f_name AS brtrf_name, br.m_name AS brtrm_name, br.suffix_type AS brtrsuffix_type, br.owner_relation AS brtrowner_relation, br.requestor_tin AS brtrrequestor_tin, br.tel_no AS brtrtel_no, br.mobile_no AS brtrmobile_no, \
// \
// \
// \
// r.region_name AS dthregion, p.prov_name AS dthprovince, c.city_name AS dthcity, \
// \




// bp.sex_type, bp.bus_info_id, bp.bus_owner_id, bp.bus_contact_id, bp.bus_addr_id, \

// mc.person_info_id, mc.marriage_details_id, mc.consent_info_id \






//     \
//  
//     \
//     LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN rptax_clearance tc ON ut.transaction_id = tc.transaction_id AND tc.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND bp.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN cedula_cert cd ON ut.transaction_id = cd.transaction_id AND cd.transaction_id IS NOT NULL \
//     LEFT JOIN cedula_doc_owner cdo ON ut.transaction_id = cdo.transaction_id AND cdo.transaction_id IS NOT NULL \
//     LEFT JOIN cedula_other_info coi ON ut.transaction_id = coi.transaction_id AND coi.transaction_id IS NOT NULL \
//     LEFT JOIN cedula_transaction_info cti ON ut.transaction_id = cti.transaction_id AND cti.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL \
//     LEFT JOIN birth_doc_owner bdo ON ut.transaction_id = bdo.transaction_id AND bdo.transaction_id IS NOT NULL \
//     LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
//     LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
//     \
//     LEFT JOIN region r ON dc.region_id = r.region_id \
//     LEFT JOIN province p ON dc.prov_id = p.prov_id \
//     LEFT JOIN cities c ON dc.city_id = c.city_id \
//     \
