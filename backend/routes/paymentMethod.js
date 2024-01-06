import express from 'express';
import conn2 from './connection.js';

const router = express.Router();
router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const taxPaymentTransaction = req.body.taxPaymentTransaction;

        console.log(taxPaymentTransaction);

        if (typeof taxPaymentTransaction !== 'object' || !taxPaymentTransaction.amount) {
            console.error('Invalid taxPaymentTransaction');
            return res.status(400).json({ error: 'Invalid taxPaymentTransaction' });
        }

        const amount = Math.round(taxPaymentTransaction.amount); // Ensure amount is an integer

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
                        description: 'RPTAX',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: amount,
                                description: 'RPTAX',
                                name: 'RPTAX',
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease']
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

export default router;