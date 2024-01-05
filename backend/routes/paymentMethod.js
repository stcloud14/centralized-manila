import express from 'express';
import conn2 from './connection.js';
const router = express.Router();

router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    const { tp_rp_td } = req.body;

    const lineItem = {
        currency: 'PHP',
        amount: 2000,
        name: 'RPTAX',
        quantity: 1,
        description: 'rptax'
    };

    try {
        const sdk = require('@paymongo/v2');
        sdk.auth('sk_test_uV3UsLWAKSxPCm1899ta3meP');

        const response = await sdk.createACheckout({
            data: {
                attributes: {
                    send_email_receipt: false,
                    show_description: true,
                    show_line_items: true,
                    payment_method_types: ['gcash'],
                    description: 'RPTAX',
                    line_items: [lineItem]
                }
            }
        });

        res.json({ checkoutSession: response.data });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Error creating checkout session' });
    }
});

export default router;