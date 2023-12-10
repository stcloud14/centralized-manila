import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

const router = Router();


router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, \
    ti.amount, ti.copies, ti.print_type, ti.valid_id, ti.purpose_id, \
    \
    tp.acc_name AS tpacc_name, tp.rp_tdn AS tptdn, tp.rp_pin AS tprp_pin, tp.year_id AS tpyear_id, tp.period_id AS tpperiod_id, \
    \
    tc.rp_tdn AS tcrp_tdn, tc.rp_pin AS tcrp_pin, \
    \
    \
    cd.region_id AS cedregion_id, cd.prov_id AS cedprov_id, cd.city_id AS cedcity_id, \
    cdo.l_name AS cedl_name, cdo.f_name AS cedf_name, cdo.m_name AS cedm_name, cdo.suffix_type AS cedsuffix_type, cdo.sex_type AS cedsex_type, \
    coi.cvl_id AS cedcvl_id, coi.czn_id AS cedczn_id, coi.height AS cedheight, coi.weight AS cedweight, coi.acr_no AS cedacr_no, \
    cti.emp_status AS cedemp_status, cti.acc_no AS cedacc_no, cti.valid_id AS cedvalid_id, cti.pob_status AS cedpob_status, cti.income_id AS cedincome_id, cti.salary_id AS cedsalary_id, cti.gross_id AS cedgross_id, \
    \
    bc.region_id AS brtregion_id, bc.prov_id AS brtprov_id, bc.city_id AS brtcity_id, \
    bdo.l_name AS brtl_name, bdo.f_name AS brtf_name, bdo.m_name AS brtm_name, bdo.suffix_type AS brtsuffix_type, bdo.sex_type AS brtsex_type, bdo.hospital_name AS brthospital_name, bdo.country AS brtcountry, bdo.birth_reg_no AS brtbirth_reg_no, \
    bi.birth_date AS brtbirth_date, bi.birth_place AS brtbirth_place, \
    br.l_name AS brtrl_name, br.f_name AS brtrf_name, br.m_name AS brtrm_name, br.suffix_type AS brtrsuffix_type, br.owner_relation AS brtrowner_relation, br.requestor_tin AS brtrrequestor_tin, br.tel_no AS brtrtel_no, br.mobile_no AS brtrmobile_no, \
    \
    dc.region_id AS dthregion_id, dc.prov_id AS dthprov_id, dc.city_id AS dthcity_id, dc.death_date AS dthdeath_date, \
    do.l_name AS dthl_name, do.f_name AS dthf_name, do.m_name AS dthm_name, do.suffix_type AS dthsuffix, do.sex_type AS dthsex, \
    dr.l_name AS dthrl_name, dr.f_name AS dthrf_name, dr.m_name AS dthrm_name, dr.suffix_type AS dthrsuffix, dr.owner_rel AS dthrowner_rel, dr.mobile_no AS dthrmobile_no, dr.tel_no AS dthrtel_no, \
    \
    \
    ai.email AS aiemail, ai.mobile_no AS aimobile_no, ai.tel_no AS aitel_no, ai.region_id AS airegion_id, ai.prov_id AS aiprov_id, ai.city_id AS aicity_id, ai.brgy_dist AS aibrgy_dist, ai.house_floor AS aihouse_floor, ai.bldg_name AS aibldg_name, ai.zip_code AS aizip_code \
    \
    FROM user_transaction ut \
    \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    \
    LEFT JOIN address_info ai ON ut.transaction_id = ai.transaction_id IS NOT NULL \
    \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    \
    LEFT JOIN rptax_clearance tc ON ut.transaction_id = tc.transaction_id AND tc.transaction_id IS NOT NULL \
    \
    LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND bp.transaction_id IS NOT NULL \
    \
    LEFT JOIN cedula_cert cd ON ut.transaction_id = cd.transaction_id AND cd.transaction_id IS NOT NULL \
    LEFT JOIN cedula_doc_owner cdo ON ut.transaction_id = cdo.transaction_id AND cdo.transaction_id IS NOT NULL \
    LEFT JOIN cedula_other_info coi ON ut.transaction_id = coi.transaction_id AND coi.transaction_id IS NOT NULL \
    LEFT JOIN cedula_transaction_info cti ON ut.transaction_id = cti.transaction_id AND cti.transaction_id IS NOT NULL \
    \
    LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL \
    LEFT JOIN birth_doc_owner bdo ON ut.transaction_id = bdo.transaction_id AND bdo.transaction_id IS NOT NULL \
    LEFT JOIN birth_info bi ON ut.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN birth_requestor br ON ut.transaction_id = br.transaction_id AND br.transaction_id IS NOT NULL \
    \
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL \
    LEFT JOIN death_doc_owner do ON ut.transaction_id = do.transaction_id AND do.transaction_id IS NOT NULL \
    LEFT JOIN death_requestor dr ON ut.transaction_id = dr.transaction_id AND dr.transaction_id IS NOT NULL \
    \
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
    WHERE ut.user_id = ?";


    try {
        const result = await queryDatabase(query, [user_id]);
    
        if (result.length > 0) {
            const userTransactions = result.map(row => {
                const formattedDthDate = moment(row.dthdeath_date).format('MMMM D, YYYY');
                const formattedDate = moment(row.date_processed).format('MMMM D, YYYY');
                const formattedTime = moment(row.date_processed).format('h:mm A');

                return {
                    ...row,
                    date: formattedDate,
                    time: formattedTime,
                    death_date: formattedDthDate,
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

// bp.sex_type, bp.bus_info_id, bp.bus_owner_id, bp.bus_contact_id, bp.bus_addr_id, \

// mc.person_info_id, mc.marriage_details_id, mc.consent_info_id \