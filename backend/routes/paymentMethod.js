import express from 'express';
import conn2 from './connection.js';
import twilio from 'twilio';
import fetch from 'node-fetch';
import dotenv from 'dotenv'

dotenv.config();


const router = express.Router();


const client = async () => {
    try {
      const accountSid = process.env.ACCOUNT_SID;
      const authToken =process.env.AUTH_TOKEN;
      const twilioPhoneNumber = process.env.FROM;
  
      const client = new twilio(accountSid, authToken);
  
      const message = 'Thank you for your payment! -Centralized Manila ~ TUP TEST'; 
  
      const sentMessage = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: '+639754137348',
      });
  
      console.log('SMS sent successfully:', sentMessage.sid);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  



router.post("/create-checkout-session/:transaction_id", async (req, res) => {
    try {
        const data = req.body.data;
        const trans_type = req.body.trans_type;
        const user_id = req.body.user_id;

        // Validate data
        if (typeof data !== 'object' || !data.amount) {
            console.error('Invalid data');
            return res.status(400).json({ error: 'Invalid data' });
        }

        // Convert amount to an integer
        const amount = parseInt(data.amount);
        const newAmount = amount * 100;

        // Validate amount
        if (isNaN(amount)) {
            console.error('Invalid amount - should be an integer');
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Replace this with your actual logic to get user_id and trans_type
        
        const { transaction_id } = req.params;
        const success_url = `http://localhost:5173/paymentsuccess/${user_id}?transaction_id=${transaction_id}&amount=${newAmount}&user_id=${user_id}&trans_type=${trans_type}`;
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
                        description: trans_type,
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: newAmount, // Adjusted amount here
                                description: 'MANILA CENTRALIZATION',
                                name: trans_type,
                                quantity: 1
                            }
                        ],
                        payment_method_types: ['gcash', 'grab_pay', 'paymaya', 'dob_ubp', 'dob', 'card', 'billease'],
                        success_url: success_url,
                        cancel_url: cancel_url,
                        transaction_id: transaction_id,
                    }
                }
            })
        };

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', options);
        const responseData = await response.json();
        // console.log("id", response); 
        if (responseData.data && responseData.data.attributes && responseData.data.attributes.checkout_url) {
            const checkoutSessionUrl = responseData.data.attributes.checkout_url;
            // Trigger fetchSessionData after successful checkout
            const sessionId = responseData.data.id; // Extracting the session ID
            console.log("Retrieving Id",sessionId )

            // Update the database with Paymongo session ID
            const query = `UPDATE user_transaction SET paymongo_id = ? WHERE transaction_id = ?;`;
            const values = [sessionId, transaction_id];
        
            try {
                const result1 = await queryDatabase(query, values);
                if (result1 && result1.affectedRows > 0) {
                    res.json({
                        message: "Successful transaction!",
                        success: result1,
                        push_notif: result1,
                        checkoutSessionUrl: checkoutSessionUrl
                    });
                } else {
                    // Insertion failed
                    res.status(500).json({ error: "Error updating transaction status" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Error executing queries" });
            }
        

        } else {
            console.error('Invalid checkout session - Response structure is unexpected:', responseData);
            return res.status(500).json({ error: 'Error creating checkout session' });
        }
    } catch (error) {
        console.error('Error processing checkout session:', error);
        res.status(500).json({ error: 'Error processing checkout session' });
    }
});



router.get('/create-checkout-retrieve/:transaction_id', async (req, res) => {
    try {
        const transactionId = req.params.transaction_id;

        try {
            // Retrieve paymongo_id from the database
            const result = await queryDatabase('SELECT paymongo_id FROM user_transaction WHERE transaction_id = ?', [transactionId]);
            if (result.length > 0) {
                const paymongo_id = result[0].paymongo_id;

                // Construct the options object for the GET request to PayMongo API
                const options = {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'authorization': 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
                    }
                };

                // Make the GET request to PayMongo API
                const response = await fetch(`https://api.paymongo.com/v1/checkout_sessions/${paymongo_id}`, options);
                const responseData = await response.json();

                // Process the retrieved data
                const amount = responseData.data.attributes.payment_intent.attributes.amount;
                const newAmount = amount / 100;
                console.log("amount", newAmount)
                const payid = responseData.data.attributes.payments[0].id;
                console.log("payid", payid)
                const sourceType = responseData.data.attributes.payments[0].attributes.source.type;
                console.log("Payment Method", sourceType)

                // Construct the refund options object
                const refundOptions = {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        authorization: 'Basic c2tfdGVzdF91VjNVc0xXQUtTeFBDbTE4OTl0YTNtZVA6'
                    },
                    body: JSON.stringify({
                        data: {
                            attributes: {
                                amount: newAmount,
                                reason: 'others',
                                payment_id: payid
                            }
                        }
                    })
                };

                // Make the refund request to PayMongo API
                const refundResponse = await fetch('https://api.paymongo.com/refunds', refundOptions);
                const refundData = await refundResponse.json();

                console.log("refundData" , refundData)

                // Handle the retrieved data (send it back or process it further)
                res.status(200).json(responseData);
            } else {
                res.status(404).json({ message: "Transaction ID not found" });
            }
        } catch (error) {
            console.error("Error retrieving paymongo_id from database or making API requests:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/success/:transaction_id', async (req, res) => {
    const transID = req.params.transaction_id;
    const amount = req.body.amount;
    const newAmount = amount / 100;
    const user_id = req.body.user_id;

    const notif_title = 'Transaction Payment Success';
    const notif_message = `<p className="text-[0.8rem] pb-2">Your payment of <span className="font-medium dark:text-white">P ${newAmount}</span> for <span className="font-medium dark:text-white">${transID}</span> has been successfully received. Please await further updates.</p>`;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    const updateQuery = `UPDATE user_transaction SET status_type = 'Paid' WHERE transaction_id = ?;`;

    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
    const values = [user_id, formattedDate, notif_title, notif_message];

    try {
        const result = await queryDatabase(updateQuery, [transID]);
        const result1 = await queryDatabase(query, values);

        // Check if the update was successful before sending SMS
        if (result && result.affectedRows > 0) {
            // Update successful, send SMS

            //COMMENT KO MUNA TO PARA D MAG SEND
            // await client();

            res.json({
                message: "Successful transaction!",
                success: result,
                push_notif: result1,
            });
        } else {
            // Update failed
            res.status(500).json({ error: "Error updating transaction status" });
        }
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