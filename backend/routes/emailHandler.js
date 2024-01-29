import nodemailer from 'nodemailer';
import conn2 from './connection.js';
import { Router } from 'express';

import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use secure connection (SSL/TLS)
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    debug: true, // Enable debugging
});

const router = Router();


const FormatMail = (user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle) => {
  return `
  <body style="background-color: #fff; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; color: black !important;">
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 42rem;">
    <tbody>
      <tr>
        <td>
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tbody>
              <tr>
                <td style="padding:3px">
                  <img src="https://i.ibb.co/p09dYX5/email-logo.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: 55px;" />
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid rgb(0,0,0, 0.1); border-radius: 3px">
                  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="overflow: hidden">
                    <tbody>
                      <tr>
                        <td>
                          <img src="https://i.ibb.co/wS7kBf2/email-banner.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: auto;" width="100%" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0">
                      <tbody style="width:100%">
                        <tr style="width:100%; color:black !important;">
                          <td style="padding:0px 20px 10px 20px">
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><span style="font-weight: 600;">Transaction ID: ${body.data.transaction_id} </span></p>
                            
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${dynamicSex} ${body.l_name}!</h1>
                            ${dynamicMessage}

                            ${typeInfo}
                            <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Date: </span>${body.data.date}</p>
                            <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Time: </span>${body.data.time}</p>
                            <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">${dynamicAmountTitle} </span>P ${amount}.00</p>

                            <p style="font-size:16px;line-height:18px;margin:50px 0px 10px 0px">Best regards,</p>
                            <p style="font-size:16px;line-height:18px;margin:2px 0px 16px 0px">Centralized Manila</p>

                            <hr style="margin:10px 0"/>
                            <p style="font-size:14px;line-height:24px;margin:16px 0">If you did not initiate this transaction, there is a possibility that someone else may be attempting to access the Centralized Manila account associated with <span style="font-weight: 700;"> ${user_email}</span></p>
                            <p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:-5px">This email is sent as your address is listed as the recovery email for Centralized Manila. If this is incorrect, please contact <span style="font-weight: 700;">centralizedmanila@gmail.com</span> to remove your email address from the account.</p>

                            </td>
                        </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 45px 0px 0px 0px">
                  <img src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/yelp-footer.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: auto;" width="100%" />
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 20px; text-align: center; color: rgb(0,0,0, 0.7); font-size: 12px; line-height: 24px;">
                © 2024 Centralized Manila. All rights reserved.
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
    `;
};


router.get('/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  const query = `
      SELECT uc.user_email, up.f_name, up.l_name, st.sex_type
      FROM user_contact uc
      JOIN user_personal up ON uc.user_id = up.user_id
      JOIN sex_type st ON up.sex_id = st.sex_id
      WHERE uc.user_id = ?`;

  try {
      const result = await queryDatabase(query, [user_id]);

      if (result.length > 0) {
          const { user_email, f_name, l_name, transaction_id } = result[0];
          if (user_email) {
              res.json({ user_email, f_name, l_name, transaction_id });
          } else {
              console.error("Missing user_email in the database");
              res.status(500).json({ error: "Internal Server Error" });
          }
      } else {
          console.error("User not found");
          res.status(404).json({ error: "User not found" });
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
  }
});


    router.post('/send-email/:user_email', async (req, res) => {

      const { user_email } = req.params;
      const body = req.body;
      const transType = req.body.data.trans_type;
      const rawAmount = req.body.data.amount;
      const amount = parseInt(rawAmount.replace(/,/g, ''), 10);
      const statusType = req.body.status_type;
      const sexType = req.body.sex_type;
     

      const message = {
        Pending: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">We have received a request to process your ${transType} via the email address <span style="font-weight: 700;">${user_email}</span>.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">We appreciate your patience, and we will notify you once the transaction is complete. If you have any questions, please do not hesitate to reach out to us.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">P E N D I N G</h1>
        `,
        Paid: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">We are pleased to inform you that your ${transType} has been successfully processed. The payment for this transaction has been received and confirmed.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Thank you for your prompt payment. If you have any further inquiries, please feel free to contact us.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">P A I D</h1>
        `,
        Processing: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Your ${transType} is currently being processed.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Our team is diligently working to complete the transaction, and we will notify you once it has been successfully processed.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Thank you for your patience and understanding.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">P R O C E S S I N G</h1>
        `,
        Canceled: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">We regret to inform you that your ${transType} request has been canceled.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">If you have any questions or concerns regarding this cancellation, please contact our customer support for further assistance.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">C A N C E L E D</h1>
        `,
        Rejected: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">We are sorry, but your ${transType} request has been rejected.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Please review the provided details and make sure all information is accurate.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">If you need further assistance or clarification, feel free to reach out to our customer support team.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">R E J E C T E D</h1>
        `,
        Expired: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Unfortunately, your ${transType} request has expired.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Please initiate a new transaction if you still wish to proceed with the payment.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">If you have any questions, don't hesitate to contact our support team for assistance.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">E X P I R E D</h1>
        `,
        Complete: `
          <h2 style="font-size:26px;font-weight:bold;text-align:center">Congratulations! Your ${transType} has been successfully processed and is now marked as complete.</h2>
          <h2 style="font-size:26px;font-weight:bold;text-align:center">You will receive a confirmation email shortly. If you have any additional questions or need further assistance, feel free to reach out to our customer support team.</h2>
          <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
          <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:3px;border:2px dashed black;">C O M P L E T E</h1>
        `,
      };


      const dynamicSex = (sexType === 'Female') ? 'Ms./Mrs.' : 'Mr.';
      
      const dynamicMessage = message[statusType] || message.Pending;
      
      const dynamicAmountTitle = (statusType === 'Pending') ? 'Amount to pay:' : 'Amount:';

    
      if (!user_email) {
      return res.status(400).json({ error: "user_email is missing or empty!" });
      }


      let htmlContent;
      let typeInfo = "";

      switch (transType) {
        case "Real Property Tax Payment":
          typeInfo = `
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Account Name: </span>${body.data.acc_name}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TDN: </span>${body.data.rp_tdn}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">PIN: </span>${body.data.rp_pin}</p>
          `
          htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
          break;
        
        case "Real Property Tax Clearance":
          typeInfo = `
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TDN: </span>${body.data.rp_tdn}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">PIN: </span>${body.data.rp_pin}</p>
          `
          htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
          break;
        
        case "Business Permit":
          typeInfo = `
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Business Name: </span>${body.data.bus_name}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Registration No.: </span>${body.data.bus_reg_no}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TIN: </span>${body.data.bus_tin}</p>
          `
          htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
          break;

        case "Community Tax Certificate":
          typeInfo = `
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Full Name: </span>${body.data.f_name} ${body.data.l_name}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">City: </span>${body.data.city_name}</p>
          `
          htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
          break;

        default:
          typeInfo = `
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Full Name: </span>${body.data.f_name} ${body.data.l_name}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">City: </span>${body.data.reqcity}</p>
          <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Purpose: </span>${body.data.purpose_type}</p>
          `
          htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
      }

      try {
        const result = await transporter.sendMail({
          from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
          to: user_email,
          subject: transType,
          html: htmlContent,
        });
      
        if (!result.response) {
          return res.status(400).json({ error: "Error sending email" });
        }
      
        res.json({
          message: "Email has been successfully sent!",
        });
      
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });


    
    router.post('/reset-email/:user_email', async (req, res) => {

      const { user_email } = req.params;
      const body = req.body;
      const transType = req.body.data.trans_type;
      const amount = req.body.data.amount / 100;
      const formattedDate = req.body.data.formattedDate;

      // const statType = req.body.status_type;
    
      if (!user_email) {
      return res.status(400).json({ error: "user_email is missing or empty!" });
      }

      try {
        const result = await transporter.sendMail({
          from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
          to: user_email,
          subject: transType,
          html: ResetPassMail(user_email, body, amount),
        });
      
        if (!result.response) {
          return res.status(400).json({ error: "Error sending email" });
        }
      
        res.json({
          message: "Email has been successfully sent!",
        });
      
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });



    router.post('/updateexpired', async (req, res) => {
      const expiryUpdateQuery = `UPDATE user_transaction SET status_type = 'Expired' WHERE expiry_date < CURRENT_DATE AND status_type = 'Pending';`;

      try {
        const expiryUpdateResult = await queryDatabase(expiryUpdateQuery);
    
        const expiredTransactionsQuery = `
            SELECT uc.user_email, ut.transaction_id, ut.user_id, up.f_name, up.l_name, tt.trans_type, ut.status_type, ti.amount
            FROM user_contact uc
            JOIN user_personal up ON uc.user_id = up.user_id
            JOIN user_transaction ut ON uc.user_id = ut.user_id
            JOIN transaction_type tt ON ut.trans_type_id = tt.trans_type_id
            JOIN transaction_info ti ON ut.transaction_id = ti.transaction_id
            WHERE ut.status_type = 'Expired' AND ut.expiry_emailed = false
        `;
    
        const expiredTransactionsResult = await queryDatabase(expiredTransactionsQuery);
        const data = expiredTransactionsResult;
    
        // Check if there are new transactions to email
        if (data.length > 0) {
            // Send email for each expired transaction
            const emailPromises = data.map(async (transaction) => {
                try {
                    const resultEmail = await transporter.sendMail({
                        from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
                        to: transaction.user_email,
                        subject: transaction.trans_type,
                        html: FormatExpiredMail(transaction),
                    });
    
                    if (!resultEmail.response) {
                        throw new Error("Error sending email");
                    }
    
                    const expiryEmailedQuery = `UPDATE user_transaction SET expiry_emailed = true WHERE transaction_id = ?;`;
                    const expiryEmailedValues = [transaction.transaction_id];
                    await queryDatabase(expiryEmailedQuery, expiryEmailedValues);

                    const notif_title = 'Transaction Expired';
                    const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-medium dark:text-white">${transaction.trans_type}: ${transaction.transaction_id}</span> has <span className="font-medium dark:text-white">EXPIRED</span> due to non-payment. Kindly generate a new transaction if you would like to make another request.</p>`;
                    const date = new Date();
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

                    const query = "INSERT INTO user_notif (`user_id`, `date`, `title`, `message`) VALUES (?, ?, ?, ?)";
                    const values = [transaction.user_id, formattedDate, notif_title, notif_message];
                    await queryDatabase(query, values);
    
                    return { success: true, transaction: transaction };

                } catch (err) {
                    console.error(err);
                    throw new Error(`Error sending email for transaction: ${transaction.trans_type}`);
                }
            });
    
            const emailResults = await Promise.all(emailPromises);
    
            res.json({
                message: "Expired pending transactions!",
                success: expiryUpdateResult && emailResults.every((result) => result.success),
                emailResults: emailResults,
            });
        } else {
            res.json({
                message: "No expired pending transactions found.",
                success: expiryUpdateResult,
            });
        }
      
      } catch (err) {
          console.error(err);
          res.status(500).json({ error: err.message });
      }
      
    });



    router.post('/registered-send-email/:user_email', async (req, res) => {

      const { user_email } = req.params;
      const body = req.body;
      const transType = req.body.data.trans_type;

    
      if (!user_email) {
      return res.status(400).json({ error: "user_email is missing or empty!" });
      }

      try {
        const result = await transporter.sendMail({
          from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
          to: user_email,
          subject: transType,
          html: RegisteredAccountEmail(user_email, body),
        });
      
        if (!result.response) {
          return res.status(400).json({ error: "Error sending email" });
        }
      
        res.json({
          message: "Email has been successfully sent!",
        });
      
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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


  router.post('/status-verified-email/:user_email', async (req, res) => {

    const { user_email } = req.params;
    const body = req.body;
    const transType = req.body.data.trans_type;
    const verification = req.body.data.verification;
    const amount = req.body.data.amount / 100;
    const formattedDate = req.body.data.formattedDate;

    // const statType = req.body.status_type;
  
    if (!user_email) {
    return res.status(400).json({ error: "user_email is missing or empty!" });
    }

    try {
      const result = await transporter.sendMail({
        from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
        to: user_email,
        subject: transType,
        html: VerificationMail(user_email, body, amount),
      });
    
      if (!result.response) {
        return res.status(400).json({ error: "Error sending email" });
      }
    
      res.json({
        message: "Email has been successfully sent!",
      });
    
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });



export default router;