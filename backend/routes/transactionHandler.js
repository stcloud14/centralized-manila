import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';

const router = Router();


router.get('/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = "SELECT ut.transaction_id, tt.trans_type, ut.status_type, ut.date_processed, \
    ti.amount, ti.copies, ti.print_type, ti.valid_id, ti.purpose, \
    \
    tp.acc_name, tp.rp_tdn AS rtp_tdn, tp.rp_pin AS rtp_pin, tp.year_id, tp.period_id, \
    \
    tc.rp_tdn AS rtc_tdn, tc.rp_pin AS rtc_pin, \
    \
    bp.sex_type, bp.bus_info_id, bp.bus_owner_id, bp.bus_contact_id, bp.bus_addr_id, \
    \
    ct.l_name, ct.f_name, ct.m_name, ct.sex_id, ct.suffix_id, ct.addr_info_id, \
    ct.ced_trans_info_id, ct.ced_other_info_id, \
    \
    bc.birth_parents_id, bc.birth_tin_no, bc.owner_rel, bc.bcert_info_id, \
    \
    dc.death_name, dc.death_date, dc.suffix_type, dc.sex_type, dc.death_req_id, \
    \
    mc.person_info_id, mc.marriage_details_id, mc.consent_info_id \
    \
    FROM user_transaction ut \
    LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
    LEFT JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
    LEFT JOIN rptax_payment tp ON ut.transaction_id = tp.transaction_id AND tp.transaction_id IS NOT NULL \
    LEFT JOIN rptax_clearance tc ON ut.transaction_id = tc.transaction_id AND tc.transaction_id IS NOT NULL \
    LEFT JOIN bus_permit bp ON ut.transaction_id = bp.transaction_id AND bp.transaction_id IS NOT NULL \
    LEFT JOIN cedula_tax ct ON ut.transaction_id = ct.transaction_id AND ct.transaction_id IS NOT NULL \
    LEFT JOIN birth_cert bc ON ut.transaction_id = bc.transaction_id AND bc.transaction_id IS NOT NULL \
    LEFT JOIN death_cert dc ON ut.transaction_id = dc.transaction_id AND dc.transaction_id IS NOT NULL \
    LEFT JOIN marriage_cert mc ON ut.transaction_id = mc.transaction_id AND mc.transaction_id IS NOT NULL \
    WHERE user_id = 'RL1741'";


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