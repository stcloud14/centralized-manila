import { Router, response } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';



const router = Router();

// router.post("/create-checkout-session/:transaction_id", async (req, res) => {
//     try {
//         const { transaction_id } = req.params;

//         const options = {
//             method: 'POST',
//             headers: {
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
//             },
//             body: JSON.stringify({
//                 data: {
//                     attributes: {
//                         send_email_receipt: true,
//                         show_description: true,
//                         show_line_items: true,
//                         description: 'RPTAX',
//                         line_items: [
//                             {
//                                 currency: 'PHP',
//                                 amount: 2000,
//                                 description: transaction_id,
//                                 name: 'RPTAX',
//                                 quantity: 1
//                             }
//                         ],
//                         payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease']

//                     }
//                 }
//             })
//         };

//         const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
//         const responseData = await response.json();

//         const checkoutSessionUrl = responseData.data.attributes.checkout_url;
//         res.json({ checkoutSessionUrl });
//     } catch (error) {
//         console.error('Error creating checkout session:', error);
//         res.status(500).json({ error: 'Error creating checkout session' });
//     }
// });


router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = "SELECT ut.user_id, ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, \
    ti.amount, ti.copies, ti.print_id, ti.valid_id, ti.purpose_id \
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

router.get('/cedula/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT  r.region_name AS region, p.prov_name AS province, c.city_name AS municipality, cc.transaction_id, cc.cedula_date, \
    co.l_name, co.f_name, co.m_name, co.suffix_type, co.sex_type, \
    ci.cvl_id, ci.czn_id, ci.height, ci.weight, ci.acr_no, \
    ct.emp_status, ct.acc_no, ct.valid_id, ct.pob_status, ct.income_id, ct.salary_id, ct.gross_id, \
    ti.amount, ti.copies, ti.print_id, vt.valid_id_type, pt.purpose_type, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code \
    \
    FROM cedula_cert cc \
    \
    LEFT JOIN transaction_info ti ON cc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON cc.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN cedula_doc_owner co ON cc.transaction_id = co.transaction_id AND co.transaction_id IS NOT NULL \
    LEFT JOIN cedula_other_info ci ON cc.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN cedula_transaction_info ct ON cc.transaction_id = ct.transaction_id AND ct.transaction_id IS NOT NULL \
    LEFT JOIN region r ON cc.region_id = r.region_id \
    LEFT JOIN province p ON cc.prov_id = p.prov_id \
    LEFT JOIN cities c ON cc.city_id = c.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    \
    WHERE  cc.transaction_id = ?"

    try {
        const result = await queryDatabase(query, [transaction_id]);
    
        if (result.length > 0) {
            const formattedDate = moment(result[0].cedula_date).format('MMMM D, YYYY');
    
            const cedulaTransaction = {
                ...result[0],
                cedula_date: formattedDate,
            };
    
            res.json(cedulaTransaction);
        } else {
            res.status(404).send('No records found for the specified transaction_id');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }    
});

router.get('/birthcert/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT bi.user_id, r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, bc.transaction_id, bi.birth_date, \
    bo.l_name, bo.f_name, bo.m_name, bo.suffix_type, st.sex_type, bo.hospital_name, bo.country, bo.birth_reg_no, \
    br.l_name AS reql_name,br.f_name AS reqf_name, br.m_name AS reqm_name, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, \
    fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, \
    mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, \
    ti.amount, ti.copies, ptt.print_type, vt.valid_id_type, pt.purpose_type, \
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
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
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
    ti.amount, ti.copies, ptt.print_type, vt.valid_id_type, pt.purpose_type, \
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
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
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

router.get('/marriagecert/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT  r.region_name AS region, p.prov_name AS province, c.city_name AS city, mc.transaction_id, mc.marriage_date, \
    hi.husband_fname, hi.husband_mname, hi.husband_lname, hi.suffix_type AS husband_suffix, \
    wi.wife_fname, wi.wife_mname, wi.wife_lname, wi.suffix_type AS wife_suffix, \
    ci.consent_lname AS reql_name, ci.consent_fname AS reqf_name, ci.consent_mname AS reqm_name, ci.suffix_type AS reqsuffix, ci.owner_rel, ci.tel_no, ci.mobile_no, \
    ti.amount, ti.copies, ptt.print_type, vt.valid_id_type, pt.purpose_type, \
    ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
    ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code \
    \
    FROM marriage_cert mc \
    \
    LEFT JOIN transaction_info ti ON mc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON mc.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN husband_info hi ON mc.transaction_id = hi.transaction_id AND hi.transaction_id IS NOT NULL \
    LEFT JOIN wife_info wi ON mc.transaction_id = wi.transaction_id AND wi.transaction_id IS NOT NULL \
    LEFT JOIN consent_info ci ON mc.transaction_id = ci.transaction_id AND ci.transaction_id IS NOT NULL \
    LEFT JOIN region r ON mc.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON mc.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON mc.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE  mc.transaction_id = ?"

    try {
        const result = await queryDatabase(query, [transaction_id]);
    
        if (result.length > 0) {
            const formattedDate = moment(result[0].marriage_date).format('MMMM D, YYYY');
    
            const marriageTransaction = {
                ...result[0],
                marriage_date: formattedDate,
            };
    
            res.json(marriageTransaction);
        } else {
            res.status(404).send('No records found for the specified transaction_id');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }    
});

router.get('/buspermit/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT  r.region_name AS bus_bregion, p.prov_name AS bus_bprovince, c.city_name AS bus_bcity, \
    ba.brgy_dist AS bus_bbgy, ba.house_floor AS bus_bhnum, ba.bldg_name AS bus_bstreet, ba.zip_code AS bus_bzip, bp.transaction_id,\
    bp.bus_name, bp.bus_franchise, bp.bus_reg_no, bp.bus_tin, bp.bus_lessor, bp.bus_rent, bp.owned, \
    bo.bus_fname, bo.bus_mname, bo.bus_lname, bo.suffix_type AS bus_suffix, st.sex_type AS bus_sex,\
    ai.email AS bus_email, ai.tel_no AS bus_tel_no, ai.mobile_no AS bus_mobile_no, \
    bot.bus_floor, bot.bus_emp, bot.bus_male_emp, bot.bus_female_emp, bot.bus_van_no, bot.bus_truck_no, bot.bus_motor_no,\
    bp.bus_lessor, bp.bus_rent, bi.bus_tax_incentives,\
    bi.bus_dti_reg, bi.bus_rptax_decbldg, bi.bus_sec_paid, bi.bus_sec_articles, bi.bus_nga, bi.bus_sec_front, bi.bus_rptax_decland, bi.bus_fire, bi.bus_page2, bi.bus_page3, bi.bus_page4, bi.bus_page5,\
    bbt.bus_type_label AS bus_type, \
    ti.amount as bus_amount, ti.copies, ptt.print_type, ti.valid_id, pt.purpose_type, \
    r1.region_name AS bus_region, p1.prov_name AS bus_province, c1.city_name AS bus_city, \
    ai.brgy_dist AS bus_brgy, ai.house_floor AS bus_hnum, ai.bldg_name AS bus_street, ai.zip_code AS bus_zip  \
    \
    FROM bus_permit bp \
    \
    LEFT JOIN transaction_info ti ON bp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN address_info ai ON bp.transaction_id = ai.transaction_id AND ai.transaction_id IS NOT NULL \
    LEFT JOIN bus_address ba ON bp.transaction_id = ba.transaction_id AND ba.transaction_id IS NOT NULL \
    LEFT JOIN bus_owner bo ON bp.transaction_id = bo.transaction_id AND bo.transaction_id IS NOT NULL \
    LEFT JOIN bus_images bi ON bp.transaction_id = bi.transaction_id AND bi.transaction_id IS NOT NULL \
    LEFT JOIN bus_operation bot ON bp.transaction_id = bot.transaction_id AND bot.transaction_id IS NOT NULL \
    LEFT JOIN region r ON ba.region_id = r.region_id \
    LEFT JOIN region r1 ON ai.region_id = r1.region_id \
    LEFT JOIN province p ON ba.prov_id = p.prov_id \
    LEFT JOIN province p1 ON ai.prov_id = p1.prov_id \
    LEFT JOIN cities c ON ba.city_id = c.city_id \
    LEFT JOIN cities c1 ON ai.city_id = c1.city_id \
    LEFT JOIN valid_id_type vt ON ti.valid_id = vt.valid_id \
    LEFT JOIN purpose_type pt ON ti.purpose_id = pt.purpose_id \
    LEFT JOIN bus_type bbt ON bp.bus_type = bbt.bus_type \
    LEFT JOIN sex_type st ON bo.sex_id = st.sex_id \
    LEFT JOIN print_type ptt ON ti.print_id = ptt.print_id \
    \
    WHERE  bp.transaction_id = ?"

    const query1 = "SELECT bus_office, bus_line, bus_psic, bus_products, bus_units_no, bus_total_cap\
    \
    FROM bus_activity \
    \
    WHERE transaction_id = ?"
    

    try {
        const result = await queryDatabase(query, [transaction_id]);
        const result1 = await queryDatabase(query1, [transaction_id]);
    
        if (result.length > 0 && result1.length > 0) {
            const formattedDate = moment(result[0].business_date).format('MMMM D, YYYY');
    
            const businessTransaction = {
                ...result[0],
                bus_activity: result1,
                business_date: formattedDate,
            };
    
            res.json(businessTransaction);
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

    const query = "SELECT ut.user_id, tt.trans_type, tp.acc_name AS tp_acc_name, tp.rp_tdn AS tp_rp_tdn, tp.rp_pin AS tp_rp_pin, \
    y.year_period AS tp_year, tp.period_id AS tp_period, ti.amount \
    \
    FROM rptax_payment tp \
    \
    LEFT JOIN transaction_info ti ON tp.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN user_transaction ut ON tp.transaction_id = ut.transaction_id \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
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


////done to paymongo issue new db
router.get('/taxclearance/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;
 
    const query = "SELECT ut.user_id, tt.trans_type, tc.rp_tdn AS tc_rp_tdn, tc.rp_pin AS tc_rp_pin, ti.amount \
    \
    FROM rptax_clearance tc \
    \
    LEFT JOIN transaction_info ti ON tc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN user_transaction ut ON tc.transaction_id = ut.transaction_id \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    \
    WHERE tc.transaction_id = ?";


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


router.post('/canceltrans/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;

    const notif_title = 'Transaction Canceled';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-semibold dark:text-white">${trans_type}: ${transaction_id}</span> has been <span className="font-semibold dark:text-white">CANCELED</span>.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Canceled' WHERE transaction_id = ?;`;

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(updateQuery, [transaction_id]);
        const result1 = await queryDatabase(query,values);

        res.json({
            message: "Updated transaction!",
            success: result,
            notif: result1,
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




export default router;