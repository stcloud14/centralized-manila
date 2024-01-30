import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Router } from 'express';
import moment from 'moment/moment.js';
import conn2 from './connection.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

// import { logoImage } from '../../../frontend/src/images/mnl_header_pdf.png';


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


router.get('/transId/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const query = `SELECT transaction_id
      FROM user_transaction
      WHERE trans_type_id = 1 AND user_id = ?
      ORDER BY date_processed DESC
      LIMIT 1;`;

    try {
    const result = await queryDatabase(query, [user_id]);
    
    res.json(result);
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

// QR Code Link Download
router.get('/cedula/:transaction_id/download', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT  r.region_name AS region, p.prov_name AS province, c.city_name AS municipality, cc.transaction_id, cc.cedula_date, \
    co.l_name, co.f_name, co.m_name, co.suffix_type, co.sex_type, \
    ci.cvl_id, ci.czn_id, ci.height, ci.weight, ci.acr_no, cv.cvl_status, \
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
    LEFT JOIN cvl_status cv ON ci.cvl_id = cv.cvl_id \
    \
    WHERE  cc.transaction_id = ?"

        try {
            const result = await queryDatabase(query, [transaction_id]);
    
            if (result.length > 0) {
                const formattedDate = moment(result[0].date).format('MMMM D, YYYY');
                const cedulaTransaction = {
                    ...result[0],
                    date: formattedDate,
                };
    
                const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
                const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });
    
                cedulaTransaction.logoImage = `data:image/png;base64,${logoImage}`;
    
                const pdf = new jsPDF();
    
                pdf.addImage(cedulaTransaction.logoImage, 'PNG', 128, 5, 70, 35);
    
                pdf.setFontSize(16);
                pdf.setTextColor(255, 255, 255); // Set text color to white
                pdf.setFillColor(0, 0, 0); // Set background color to black

                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Set text color back to black
        
              const cedulaDetailsHeaders = ['Field', 'Value'];
              const cedulaDetailsData = [
                ['Transaction ID', cedulaTransaction.transaction_id],
                ['Last Name', cedulaTransaction.l_name],
                ['First Name', cedulaTransaction.f_name],
                ['Middle Name', cedulaTransaction.m_name],
                ['Suffix', cedulaTransaction.suffix_type],
                ['Sex', cedulaTransaction.sex_type],
                ['Region', cedulaTransaction.region],
                ['Province', cedulaTransaction.province],
                ['Municipal', cedulaTransaction.municipality],
                ['Barangay', cedulaTransaction.brgy_dist],
                ['House No. / Unit Floor', cedulaTransaction.house_floor],
                ['Stret / Building Name', cedulaTransaction.bldg_name],
                ['Zip Code', cedulaTransaction.zip_code],
                ['Civil Status', cedulaTransaction.cvl_status],
                ['Country of Citizenship', cedulaTransaction.czn_id],
                ['Height (ft)', cedulaTransaction.height],
                ['Weight (kg)', cedulaTransaction.weight],
                ['Alien Certificate of Registration No.', cedulaTransaction.acr_no],
                ['Employment Status', cedulaTransaction.emp_status],
                ['Tax Payer Account No.', cedulaTransaction.acc_no],
                ['Residence Tax Due', cedulaTransaction.cedula_date],
                ['Valid ID to Present Upon Claiming', cedulaTransaction.valid_id_type],
                ['Profession/Occupation/Business', cedulaTransaction.pob_status],
                ['Income From Real Property', cedulaTransaction.income_id],
                ['Earning From Business', cedulaTransaction.salary_id],
                ['Earning From Profession', cedulaTransaction.gross_id],
                ['Amount', cedulaTransaction.amount],
              ];
              
              pdf.autoTable({
                head: [cedulaDetailsHeaders], 
                body: cedulaDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid', 
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {
                }
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=cedula_cert_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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

// QR Code Link Download
router.get('/birthcert/:transaction_id/download', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT bi.user_id, r.region_name AS region, p.prov_name AS province, c.city_name AS municipal, bc.transaction_id, bi.birth_date, \
        bo.l_name, bo.f_name, bo.m_name, bo.suffix_type, st.sex_type, bo.hospital_name, bo.country, bo.birth_reg_no, \
        br.l_name AS reql_name, br.f_name AS reqf_name, br.m_name AS reqm_name, br.suffix_type AS reqsuffix, br.owner_relation, br.requestor_tin, br.tel_no, br.mobile_no, \
        fi.father_fname, fi.father_mname, fi.father_lname, fi.suffix_type AS fathersuffix, \
        mi.mother_fname, mi.mother_mname, mi.mother_lname, mi.suffix_type AS mothersuffix, \
        ti.amount, ti.copies, ptt.print_type, vt.valid_id_type, pt.purpose_type, \
        ai.email, ai.mobile_no, ai.tel_no, r1.region_name AS reqregion, p1.prov_name AS reqprovince, c1.city_name AS reqcity, \
        ai.brgy_dist, ai.house_floor, ai.bldg_name, ai.zip_code \
        FROM birth_cert bc \
        JOIN birth_info bi ON bc.transaction_id = bi.transaction_id \
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
        WHERE  bc.transaction_id = ?";

        try {
            const result = await queryDatabase(query, [transaction_id]);
    
            if (result.length > 0) {
                const formattedDate = moment(result[0].birth_date).format('MMMM D, YYYY');
                const birthTransaction = {
                    ...result[0],
                    birth_date: formattedDate,
                };
    
                // Read the image file and convert it to base64
                const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
                const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });
    
                // Assuming birthTransaction.logoImage is a base64-encoded data URI
                birthTransaction.logoImage = `data:image/png;base64,${logoImage}`;
    
                // Generate PDF
                const pdf = new jsPDF();
    
                // Add logo at the upper right corner
                pdf.addImage(birthTransaction.logoImage, 'PNG', 128, 5, 70, 35);
    
                // Set font size and style for the header
                pdf.setFontSize(16);
                pdf.setTextColor(255, 255, 255); // Set text color to white
                pdf.setFillColor(0, 0, 0); // Set background color to black

                // Set font size and style for the rest of the document
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Set text color back to black
        
              // Add birth details using autotable plugin
              const birthDetailsHeaders = ['Field', 'Value'];
              const birthDetailsData = [
                ['Transaction ID', birthTransaction.transaction_id],
                ['Last Name', birthTransaction.l_name],
                ['First Name', birthTransaction.f_name],
                ['Middle Name', birthTransaction.m_name],
                ['Suffix', birthTransaction.suffix_type],
                ['Sex', birthTransaction.sex_type],
                ['Birth Date', birthTransaction.birth_date],
                ['Hospital Name', birthTransaction.hospital_name],
                ['Country', birthTransaction.country],
                ['Birth Registration No', birthTransaction.birth_reg_no],
                ['Requestor Last Name', birthTransaction.reql_name],
                ['Requestor First Name', birthTransaction.reqf_name],
                ['Requestor Middle Name', birthTransaction.reqm_name],
                ['Requestor Suffix', birthTransaction.reqsuffix],
                ['Requestor Owner Relation', birthTransaction.owner_relation],
                ['Requestor TIN', birthTransaction.requestor_tin],
                ['Requestor Telephone No', birthTransaction.tel_no],
                ['Requestor Mobile No', birthTransaction.mobile_no],
                ['Father First Name', birthTransaction.father_fname],
                ['Father Middle Name', birthTransaction.father_mname],
                ['Father Last Name', birthTransaction.father_lname],
                ['Father Suffix', birthTransaction.fathersuffix],
                ['Mother First Name', birthTransaction.mother_fname],
                ['Mother Middle Name', birthTransaction.mother_mname],
                ['Mother Last Name', birthTransaction.mother_lname],
                ['Mother Suffix', birthTransaction.mothersuffix],
                ['Amount', birthTransaction.amount],
                ['Number of Copies', birthTransaction.copies],
                ['Valid ID Type', birthTransaction.valid_id_type],
                ['Purpose Type', birthTransaction.purpose_type],
                ['Email', birthTransaction.email],
                ['Mobile No', birthTransaction.mobile_no],
                ['Telephone No', birthTransaction.tel_no],
                ['Region for Birth', birthTransaction.region],
                ['Province for Birth', birthTransaction.province],
                ['Municipality for Birth', birthTransaction.municipal],
                ['Brgy District for Birth', birthTransaction.brgy_dist],
                ['House Floor for Birth', birthTransaction.house_floor],
                ['Building Name for Birth', birthTransaction.bldg_name],
                ['ZIP Code for Birth', birthTransaction.zip_code],
                ['Date Processed', moment(birthTransaction.date_processed).format('MMMM D, YYYY')],
              ];
              
              pdf.autoTable({
                head: [birthDetailsHeaders], 
                body: birthDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid', 
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {
                }
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=birth_cert_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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


// QR Code Link Download
router.get('/deathcert/:transaction_id/download', async (req, res) => {
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
    
                // Read the image file and convert it to base64
                const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
                const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });
    
                // Assuming deathTransaction.logoImage is a base64-encoded data URI
                deathTransaction.logoImage = `data:image/png;base64,${logoImage}`;
    
                // Generate PDF
                const pdf = new jsPDF();
    
                // Add logo at the upper right corner
                pdf.addImage(deathTransaction.logoImage, 'PNG', 128, 5, 70, 35);
    
                // Set font size and style for the header
                pdf.setFontSize(16);
                pdf.setTextColor(255, 255, 255); // Set text color to white
                pdf.setFillColor(0, 0, 0); // Set background color to black

                // Set font size and style for the rest of the document
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Set text color back to black
        
              // Add birth details using autotable plugin
              const deathDetailsHeaders = ['Field', 'Value'];
              const deathDetailsData = [
                ['Transaction ID', deathTransaction.transaction_id],
                ['Last Name', deathTransaction.l_name],
                ['First Name', deathTransaction.f_name],
                ['Middle Name', deathTransaction.m_name],
                ['Sex', deathTransaction.sex_type],
                ['Region of Death', deathTransaction.region],
                ['Province of Death', deathTransaction.province],
                ['Municipal of Death', deathTransaction.city],
                ['Death Date', deathTransaction.death_date],
                ['Requestor Last Name', deathTransaction.reql_name],
                ['Requestor First Name', deathTransaction.reqf_name],
                ['Requestor Middle Name', deathTransaction.reqm_name],
                ['Requestor Suffix', deathTransaction.reqsuffix],
                ['Requestor Owner Relation', deathTransaction.owner_relation],
                ['Requestor Mobile No', deathTransaction.mobile_no],
                ['Requestor Region', deathTransaction.reqregion],
                ['Requestor Province', deathTransaction.reqprovince],
                ['Requestor Municipality', deathTransaction.reqcity],
                ['Barangay', deathTransaction.brgy_dist],
                ['House No. / UNit Floor', deathTransaction.house_floor],
                ['Street / Building Name', deathTransaction.bldg_name],
                ['Zip Code', deathTransaction.zip_code],
                ['No. of Copies', deathTransaction.copies],
                ['What to Print', deathTransaction.print_tyoe],
                ['Purpose', deathTransaction.purpose_type],
                ['Number of Copies', deathTransaction.copies],
                ['Valid ID to Present Upon Claiming', deathTransaction.valid_id_type],
                ['Amount', deathTransaction.amount],
                ['Date Processed', moment(deathTransaction.date_processed).format('MMMM D, YYYY')],
              ];
              
              pdf.autoTable({
                head: [deathDetailsHeaders], 
                body: deathDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid', 
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {
                }
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=death_cert_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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


// QR Code Link Download
router.get('/marriagecert/:transaction_id/download', async (req, res) => {
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
    
                // Read the image file and convert it to base64
                const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
                const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });
    
                // Assuming birthTransaction.logoImage is a base64-encoded data URI
                marriageTransaction.logoImage = `data:image/png;base64,${logoImage}`;
    
                // Generate PDF
                const pdf = new jsPDF();
    
                // Add logo at the upper right corner
                pdf.addImage(marriageTransaction.logoImage, 'PNG', 128, 5, 70, 35);
    
                // Set font size and style for the header
                pdf.setFontSize(16);
                pdf.setTextColor(255, 255, 255); // Set text color to white
                pdf.setFillColor(0, 0, 0); // Set background color to black

                // Set font size and style for the rest of the document
                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Set text color back to black
        
              // Add birth details using autotable plugin
              const marriageDetailsHeaders = ['Field', 'Value'];
              const marriageDetailsData = [
                ['Transaction ID', marriageTransaction.transaction_id],
                ['Husband Last Name', marriageTransaction.husband_lname],
                ['Husband First Name', marriageTransaction.husband_fname],
                ['Husband Middle Name', marriageTransaction.husband_mname],
                ['Wife Last Name', marriageTransaction.wife_lname],
                ['Wife First Name', marriageTransaction.wife_fname],
                ['Wife Middle Name', marriageTransaction.wife_mname],
                ['Region of Marriage', marriageTransaction.region],
                ['Province of Marriage', marriageTransaction.province],
                ['Municipal of Marriage', marriageTransaction.city],
                ['Marriage Date', marriageTransaction.marriage_date],
                ['Requestor Last Name', marriageTransaction.reql_name],
                ['Requestor First Name', marriageTransaction.reqf_name],
                ['Requestor Middle Name', marriageTransaction.reqm_name],
                ['Requestor Suffix', marriageTransaction.reqsuffix],
                ['Requestors Relationship to the Owner', marriageTransaction.owner_rel],
                ['Requestor Mobile No', marriageTransaction.mobile_no],
                ['Requestor Region', marriageTransaction.reqregion],
                ['Requestor Province', marriageTransaction.reqprovince],
                ['Requestor Municipality', marriageTransaction.reqcity],
                ['Barangat', marriageTransaction.brgy_dist],
                ['House No. / UNit Floor', marriageTransaction.house_floor],
                ['Street / Building Name', marriageTransaction.bldg_name],
                ['Zip Code', marriageTransaction.zip_code],
                ['No. of Copies', marriageTransaction.copies],
                ['What to Print', marriageTransaction.print_type],
                ['Purpose', marriageTransaction.purpose_type],
                ['Number of Copies', marriageTransaction.copies],
                ['Valid ID to Present Upon Claiming', marriageTransaction.valid_id_type],
                ['Amount', marriageTransaction.amount],
                ['Date Processed', moment(marriageTransaction.date_processed).format('MMMM D, YYYY')],
              ];
              
              pdf.autoTable({
                head: [marriageDetailsHeaders], 
                body: marriageDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid', 
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {
                }
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=marriage_cert_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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

{/*
// QR Code Link Download
router.get('/buspermit/:transaction_id/download', async (req, res) => {
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

     // const logoImagePath = path.join(__dirname, '../../../frontend/src/images/mnl_header_pdf.png');
        // const logoImage = fs.readFileSync(logoImagePath, 'base64');

        try {
            const result = await queryDatabase(query, [transaction_id]);
    
            if (result.length > 0) {
                const formattedDate = moment(result[0].birth_date).format('MMMM D, YYYY');
                const businessTransaction = {
                    ...result[0],
                    birth_date: formattedDate,
                };
    
                const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
                const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });
    
                cedulaTransaction.logoImage = `data:image/png;base64,${logoImage}`;
    
                const pdf = new jsPDF();
    
                pdf.addImage(businessTransaction.logoImage, 'PNG', 128, 5, 70, 35);
    
                pdf.setFontSize(16);
                pdf.setTextColor(255, 255, 255); // Set text color to white
                pdf.setFillColor(0, 0, 0); // Set background color to black

                pdf.setFontSize(12);
                pdf.setTextColor(0, 0, 0); // Set text color back to black
        
              const busDetailsHeaders = ['Field', 'Value'];
              const busDetailsData = [
                ['Transaction ID', businessTransaction.transaction_id],
                ['Last Name', businessTransaction.l_name],
                ['First Name', businessTransaction.f_name],
                ['Middle Name', businessTransaction.m_name],
                ['Suffix', businessTransaction.suffix_type],
                ['Sex', businessTransaction.sex_type],
                ['Region', businessTransaction.region],
                ['Province', businessTransaction.province],
                ['Municipal', businessTransaction.municipality],
                ['Barangay', businessTransaction.brgy_dist],
                ['House No. / Unit Floor', businessTransaction.house_floor],
                ['Stret / Building Name', businessTransaction.bldg_name],
                ['Zip Code', businessTransaction.zip_code],
                ['Civil Status', businessTransaction.cvl_status],
                ['Country of Citizenship', businessTransaction.czn_id],
                ['Height (ft)', businessTransaction.height],
                ['Weight (kg)', businessTransaction.weight],
                ['Alien Certificate of Registration No.', businessTransaction.acr_no],
                ['Employment Status', businessTransaction.emp_status],
                ['Tax Payer Account No.', businessTransaction.acc_no],
                ['Residence Tax Due', cedulaTransaction.cedula_date],
                ['Valid ID to Present Upon Claiming', cedulaTransaction.valid_id_type],
                ['Profession/Occupation/Business', cedulaTransaction.pob_status],
                ['Income From Real Property', cedulaTransaction.income_id],
                ['Earning From Business', cedulaTransaction.salary_id],
                ['Earning From Profession', cedulaTransaction.gross_id],
                ['Amount', cedulaTransaction.amount],
              ];
              
              pdf.autoTable({
                head: [busDetailsHeaders], 
                body: busDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid', 
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {
                }
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=bus_cert_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/}

router.get('/taxpayment/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT ut.user_id, tt.trans_type, tp.transaction_id, tp.acc_name AS tp_acc_name, tp.rp_tdn AS tp_rp_tdn, tp.rp_pin AS tp_rp_pin, \
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


// QR Code Link Download
router.get('/taxpayment/:transaction_id/download', async (req, res) => {
    try {
        const transaction_id = req.params.transaction_id;

        if (!transaction_id) {
            return res.status(400).json({ error: 'Transaction ID is required' });
        }

        console.log('Transaction ID:', transaction_id);

        const query = "SELECT ut.user_id, tt.trans_type, tp.transaction_id, tp.acc_name AS tp_acc_name, tp.rp_tdn AS tp_rp_tdn, tp.rp_pin AS tp_rp_pin, \
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

        const result = await queryDatabase(query, [transaction_id]);

        // console.log('SQL Query Result:', result);
        if (result.length > 0) {
            const formattedDate = result[0].date ? moment(result[0].date).format('MMMM D, YYYY') : 'N/A';
            const transactionId = result[0].transaction_id || 'N/A';

            const taxPaymentTransaction = {
                transaction_id: transactionId,
                ...result[0],
                date: formattedDate,
            };

            const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
            const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });

            taxPaymentTransaction.logoImage = `data:image/png;base64,${logoImage}`;

            const pdf = new jsPDF();

            pdf.addImage(taxPaymentTransaction.logoImage, 'PNG', 128, 5, 70, 35);

            pdf.setFontSize(16);
            pdf.setTextColor(255, 255, 255); // Set text color to white
            pdf.setFillColor(0, 0, 0); // Set background color to black

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Set text color back to black

            const paymentDetailsHeaders = ['Field', 'Value'];
            const paymentDetailsData = [
                ['Transaction ID', taxPaymentTransaction.transaction_id],
                ['Account Name', taxPaymentTransaction.tp_acc_name],
                ['Tax Declaration Number (TDN)', taxPaymentTransaction.tp_rp_tdn],
                ['Property Identification Number (PIN)', taxPaymentTransaction.tp_rp_pin],
                ['From', `${taxPaymentTransaction.tp_year} - ${taxPaymentTransaction.tp_period}`],
                ['To', `${taxPaymentTransaction.tp_year} - ${taxPaymentTransaction.tp_period}`],
                ['Date Processed', taxPaymentTransaction.date],
                ['Amount', taxPaymentTransaction.amount],
                ['Date Processed', moment(taxPaymentTransaction.date_processed).format('MMMM D, YYYY')],
            ];

            pdf.autoTable({
                head: [paymentDetailsHeaders],
                body: paymentDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid',
                headStyles: {
                    fillColor: [50, 50, 50], // Set the background color of the header row to black
                    textColor: 255, // Set the text color of the header row to white
                },
                styles: {},
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=tax_payment_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
            // console.log('Request Parameters:', req.params);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

////done to paymongo issue new db
{/*router.get('/taxclearance/:transaction_id', async (req, res) => {
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
});*/}

router.get('/taxclearance/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;

    const query = "SELECT ut.user_id, tt.trans_type, tc.transaction_id, tc.rp_tdn AS tc_rp_tdn, tc.rp_pin AS tc_rp_pin, ti.amount \
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

// QR
router.get('/taxclearance/:transaction_id/download', async (req, res) => {
    try {
        // Use the correct way to get the transaction_id from the request parameters
        const transaction_id = req.params.transaction_id;

        // Check if transaction_id is undefined or empty
        if (!transaction_id || transaction_id === 'undefined') {
            return res.status(400).json({ error: 'Invalid or missing Transaction ID' });
        }

        console.log('Transaction ID:', transaction_id);

        const query = "SELECT ut.user_id, tt.trans_type, tc.transaction_id, tc.rp_tdn AS tc_rp_tdn, tc.rp_pin AS tc_rp_pin, ti.amount \
        \
        FROM rptax_clearance tc \
        \
        LEFT JOIN transaction_info ti ON tc.transaction_id = ti.transaction_id AND ti.transaction_id IS NOT NULL \
        LEFT JOIN user_transaction ut ON tc.transaction_id = ut.transaction_id \
        LEFT JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id \
        \
        WHERE tc.transaction_id = ?";

        // Await the result of the database query
        const result = await queryDatabase(query, [transaction_id]);

        console.log('SQL Query Result:', result);

        if (result.length > 0) {
            const transactionId = result[0].transaction_id || 'N/A';

            const taxClearanceTransaction = {
                transaction_id: transactionId,
                ...result[0],
            };

            const logoImagePath = path.join(fileURLToPath(import.meta.url), '../../../frontend/src/images/mnl_header_pdf.png');
            const logoImage = fs.readFileSync(logoImagePath, { encoding: 'base64' });

            taxClearanceTransaction.logoImage = `data:image/png;base64,${logoImage}`;

            const pdf = new jsPDF();

            pdf.addImage(taxClearanceTransaction.logoImage, 'PNG', 128, 5, 70, 35);

            pdf.setFontSize(16);
            pdf.setTextColor(255, 255, 255);
            pdf.setFillColor(0, 0, 0);

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);

            const clearanceDetailsHeaders = ['Field', 'Value'];
            const clearanceDetailsData = [
                ['Transaction ID', taxClearanceTransaction.transaction_id],
                ['Tax Declaration Number (TDN)', taxClearanceTransaction.tc_rp_tdn],
                ['Property Identification Number (PIN)', taxClearanceTransaction.tc_rp_pin],
                ['Amount', taxClearanceTransaction.amount],
                ['Date Processed', moment(taxClearanceTransaction.date_processed).format('MMMM D, YYYY')],
            ];

            pdf.autoTable({
                head: [clearanceDetailsHeaders],
                body: clearanceDetailsData,
                startY: 40,
                margin: { horizontal: 10 },
                theme: 'grid',
                headStyles: {
                    fillColor: [50, 50, 50],
                    textColor: 255,
                },
                styles: {},
            });

            // Save or send the PDF
            const pdfBuffer = pdf.output('arraybuffer');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=tax_clearance_${transaction_id}.pdf`);
            res.send(Buffer.from(pdfBuffer));
        } else {
            res.status(404).json({ error: 'Transaction not found' });
            console.log('Request Parameters:', req.params);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/canceltrans/:transaction_id', async (req, res) => {
    const transaction_id = req.params.transaction_id;
    const user_id = req.body.user_id;
    const trans_type = req.body.trans_type;

    const notif_title = 'Transaction Canceled';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${trans_type}: ${transaction_id}</span> has been <span className="font-medium dark:text-white">CANCELED</span>.</p>`;
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