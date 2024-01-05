import express from 'express';
import conn2 from './connection.js';
const router = express.Router();

router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const { transaction_id } = req.params;

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
                                amount: 2000,
                                description: transaction_id,
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

        const checkoutSessionUrl = responseData.data.attributes.checkout_url;
        res.json({ checkoutSessionUrl });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
});

export default router;