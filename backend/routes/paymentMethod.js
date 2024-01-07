import express from 'express';
import conn2 from './connection.js';

const router = express.Router();

router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const taxPaymentTransaction = req.body.taxPaymentTransaction;
        const { transaction_id } = req.params;

        // Validate taxPaymentTransaction
        if (typeof taxPaymentTransaction !== 'object' || !taxPaymentTransaction.amount) {
            console.error('Invalid taxPaymentTransaction');
            return res.status(400).json({ error: 'Invalid taxPaymentTransaction' });
        }

        // Convert amount to an integer
        const amount = parseInt(taxPaymentTransaction.amount);

        // Validate amount
        if (isNaN(amount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Replace this with your actual logic to get user_id and trans_type
        const user_id = taxPaymentTransaction.user_id;
        const trans_type = taxPaymentTransaction.trans_type;

        console.log(user_id)
        console.log(trans_type)

        const success_url = `http://localhost:5173/transachistory/${user_id}`;
        const cancel_url = `http://localhost:5173/transachistory/${user_id}`;

        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        paid_signal: 'Pending',
                        description: 'PAYMENT CENTRALIZATION',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount * 100, // Adjusted amount here
                                description: 'MANILA CENTRALIZATION',
                                name: trans_type,
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url,
                        cancel_url: cancel_url,
                        
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();
        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
        
            // Assuming checkout_session.payment.paid is an event from Paymongo
            if (success_url && JSON.parse(options.body).data.attributes.paid_signal === 'Paid') {
                // Update the status in the database to 'Paid'
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Paid'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Paid.`);
                await queryDatabase(updateQuery, [transaction_id]);
            } else {
                // Update the status in the database to 'Pending' or any other status as needed
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Pending'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Pending.`);
                await queryDatabase(updateQuery, [transaction_id]);
            }
        
            res.json({ checkoutSessionUrl });
        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            return res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error processing checkout session:', error);
        res.status(500).json({ error: 'Error processing checkout session' });
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


//-------------------------------------TAX CLEARANCE------------------------------------//
router.post("/create-checkout-session1/:transaction_id", async (req, res) => {
    try {
        const taxClearanceTransaction = req.body.taxClearanceTransaction;
        const { transaction_id } = req.params;

        // Validate taxClearanceTransaction
        if (typeof taxClearanceTransaction !== 'object' || !taxClearanceTransaction.amount) {
            console.error('Invalid taxClearanceTransaction');
            return res.status(400).json({ error: 'Invalid taxClearanceTransaction' });
        }

        // Convert amount to an integer
        const amount = parseInt(taxClearanceTransaction.amount);

        // Validate amount
        if (isNaN(amount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Replace this with your actual logic to get user_id and trans_type
        const user_id = taxClearanceTransaction.user_id;
        const trans_type = taxClearanceTransaction.trans_type;

        const success_url = `http://localhost:5173/transachistory/${user_id}`;
        const cancel_url = `http://localhost:5173/transachistory/${user_id}`;

        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        paid_signal: 'Pending',
                        description: 'Manila CENTRALIZATION',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount * 100, // Adjusted amount here
                                description: 'PAYMENT CENTRALIZATION',
                                name: trans_type,
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url,
                        cancel_url: cancel_url,
                        
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();
        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
        
            // Assuming checkout_session.payment.paid is an event from Paymongo
            if (success_url && JSON.parse(options.body).data.attributes.paid_signal === 'Paid') {
                // Update the status in the database to 'Paid'
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Paid'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Paid.`);
                await queryDatabase(updateQuery, [transaction_id]);
            } else {
                // Update the status in the database to 'Pending' or any other status as needed
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Pending'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Pending.`);
                await queryDatabase(updateQuery, [transaction_id]);
            }
        
            res.json({ checkoutSessionUrl });
        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            return res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error processing checkout session:', error);
        res.status(500).json({ error: 'Error processing checkout session' });
    }
});

router.post("/create-checkout-session2/:transaction_id", async (req, res) => {
    try {
        const birthTransaction = req.body.birthTransaction;
        const { transaction_id } = req.params;

        // Validate birthTransaction
        if (typeof birthTransaction !== 'object' || !birthTransaction.amount) {
            console.error('Invalid birthTransaction');
            return res.status(400).json({ error: 'Invalid birthTransaction' });
        }

        // Convert amount to an integer
        const amount = parseInt(birthTransaction.amount);

        // Validate amount
        if (isNaN(amount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Replace this with your actual logic to get user_id and trans_type
        const user_id = birthTransaction.user_id;
        const trans_type = birthTransaction.trans_type;
        console.log(user_id)
        console.log(trans_type)

        const success_url = `http://localhost:5173/transachistory/${user_id}`;
        const cancel_url = `http://localhost:5173/transachistory/${user_id}`;

        const options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        paid_signal: 'Pending',
                        description: 'Manila CENTRALIZATION',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount * 100, // Adjusted amount here
                                description: 'PAYMENT CENTRALIZATION',
                                name: 'Birth Certificate Transaction Details',
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url,
                        cancel_url: cancel_url,
                        
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();
        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
        
            // Assuming checkout_session.payment.paid is an event from Paymongo
            if (success_url && JSON.parse(options.body).data.attributes.paid_signal === 'Paid') {
                // Update the status in the database to 'Paid'
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Paid'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Paid.`);
                await queryDatabase(updateQuery, [transaction_id]);
            } else {
                // Update the status in the database to 'Pending' or any other status as needed
                const updateQuery = `
                    UPDATE user_transaction
                    SET status_type = 'Pending'
                    WHERE transaction_id = ?;
                `;
                
                console.log(`Transaction ${transaction_id} marked as Pending.`);
                await queryDatabase(updateQuery, [transaction_id]);
            }
        
            res.json({ checkoutSessionUrl });
        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            return res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error processing checkout session:', error);
        res.status(500).json({ error: 'Error processing checkout session' });
    }
});

export default router;