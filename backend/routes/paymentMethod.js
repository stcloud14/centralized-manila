import express from 'express';
import conn2 from './connection.js';

const router = express.Router();
router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const taxPaymentTransaction = req.body.taxPaymentTransaction;
        const { transaction_id } = req.params
        console.log(taxPaymentTransaction);
        console.log(transaction_id);

        if (typeof taxPaymentTransaction !== 'object' || !taxPaymentTransaction.amount) {
            console.error('Invalid taxPaymentTransaction');
            return res.status(400).json({ error: 'Invalid taxPaymentTransaction' });
        }

        const amount = parseInt(taxPaymentTransaction.amount); // Convert amount to an integer

        if (isNaN(amount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const user_id = taxPaymentTransaction.user_id; // Replace this with your actual logic

        const success_url = `http://localhost:5173/transachistory/${user_id}`;


        console.log(user_id)

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
                        description: transaction_id,
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount,
                                description: 'PAYMENT CENTRALIZATION',
                                name: 'TEST',
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url
   
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();

        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
            res.json({ checkoutSessionUrl });
        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
});

// const webhookOptions = {
//     method: 'POST',
//     headers: {
//         accept: 'application/json',
//         'content-type': 'application/json',
//         authorization: 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
//     },
//     body: JSON.stringify({
//         data: {
//             attributes: {
//                 events: ['checkout_session.payment.paid'],
//                 url: 'http://localhost:5173/transachistory/'
//             }
//         }
//     })
// };

// fetch('https://api.paymongo.com/v1/webhooks', webhookOptions)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export default router;