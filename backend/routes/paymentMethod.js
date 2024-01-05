import { Router } from 'express';
import conn2 from './connection.js'

const router = Router();

router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    const { tp_rp_td } = req.body;

    const lineItems = tp_rp_td.map((tp_rp_tdn) => ({
        id: "pay_a1nn2DXxeooJ9JqQfj7ytxfe",
        type: "payment",
        attributes: {
            amount: 10000,
            billing: {
                address: {
                    city: "Furview",
                    country: "PH",
                    line1: "111",
                    line2: "Wanchan St",
                    postal_code: "11111",
                    state: "Metro Manila",
                },
                email: "queue@flash.paymongo.net",
                name: "Zooey Doge",
                phone: "111-111-1111",
            },
            currency: "PHP",
            description: "Payment 1",
            fee: 1850,
            livemode: false,
            net_amount: 8150,
            payout: null,
            source: {
                id: "tok_X925Gje9FzRxfZCiBzNaSCbE",
                type: "token",
            },
            statement_descriptor: null,
            status: "paid",
            created_at: 1586093053,
            paid_at: 1586093053,
            updated_at: 1586093053,
        },
    }));

    res.json({ lineItems });
});

export default router;