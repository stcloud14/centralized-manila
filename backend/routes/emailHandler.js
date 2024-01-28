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

const FormatMail = (user_email, body, amount) => {
  return `
  <body style="background-color: #fff; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; color:black!important">
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 42rem;">
    <tbody>
      <tr>
        <td>
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tbody>
              <tr>
                <td style="padding:3px">
                  <img src="https://i.ibb.co/0GZ4s69/mnl-header-pdf.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: 55px;" />
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
                        <tr style="width:100%">
                          <td style="padding:0px 20px 10px 20px">
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${body.l_name}!</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">We received a request to process your ${body.data.trans_type} through your email address <span style="font-weight: 700;">${user_email}</span></h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">The current status of this transaction is:</p>
                            <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:5px;border-style: dashed;">${body.status_type}</h1>
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><span style="font-weight: 600;">Amount to pay: </span>P ${amount}.00</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">If you did not request this transaction, it is possible that someone else is trying to access the Centralized Manila account of <span style="font-weight: 700;"> ${user_email}</span></p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"> You received this message because this email address is listed as the recovery email for the Centralized Manila. If that is incorrect, please contact <span style="font-weight: 700;">centralizedmanila@gmail.com</span> to remove your email address from that Google Account.</p>
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


const FormatExpiredMail = (transaction) => {
  return `
  <body style="background-color: #fff; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; color:black!important">
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 42rem;">
    <tbody>
      <tr>
        <td>
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tbody>
              <tr>
                <td style="padding:3px">
                  <img src="https://i.ibb.co/0GZ4s69/mnl-header-pdf.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: 55px;" />
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
                        <tr style="width:100%">
                          <td style="padding:0px 20px 10px 20px">
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${transaction.l_name}!</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">We received a request to process your ${transaction.trans_type} through your email address <span style="font-weight: 700;">${transaction.user_email}</span></h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">The current status of this transaction <span style="font-weight: 600;">'${transaction.transaction_id}'</span> is:</p>
                            <h1 style="font-size:32px;font-weight:bold;text-align:center;padding:5px;border-style: dashed;">E X P I R E D</h1>
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><span style="font-weight: 600;">Amount: </span>P ${transaction.amount}.00</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">If you did not request this transaction, it is possible that someone else is trying to access the Centralized Manila account of <span style="font-weight: 700;"> ${transaction.user_email}</span></p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"> You received this message because this email address is listed as the recovery email for the Centralized Manila. If that is incorrect, please contact <span style="font-weight: 700;">centralizedmanila@gmail.com</span> to remove your email address from that Google Account.</p>
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


const ResetPassMail = (user_email, body, amount) => {
  return `
  <body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#ffffff">
    <tbody>
      <tr style="width:100%">
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:30px">
            <tbody>
              <tr>
                <td><img src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/twitch-logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="114" /></td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:100%;display:flex">
            <tbody>
              <tr>
                <td>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                    <tbody style="width:100%">
                      <tr style="width:100%">
                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(145,71,255);width:102px"></td>
                        <td data-id="__react-email-column" style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:5px 20px 10px 20px">
            <tbody>
              <tr>
                <td>
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">Hi ${body.l_name}!,</p>
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">You updated the password for your Centralized Manila account on ${body.formattedDate}. If this was you, then no further action is required.</p>
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">However if you did NOT perform this password change, please<!-- --> <a href="http://localhost:5173/forgotpass" style="color:#067df7;text-decoration:underline" target="_blank">reset your account password</a> <!-- -->immediately.</p>
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">Still have questions? Please contact<!-- --> <a href="#" style="color:#067df7;text-decoration:underline" target="_blank">Centralized Manila</a></p>
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">Thanks,<br />Centralized Manila Team</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:0 auto">
    <tbody>
      <tr>
        <td>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%">
                <td align="right" data-id="__react-email-column" style="width:50%;padding-right:8px"><img src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/twitch-icon-twitter.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                <td align="left" data-id="__react-email-column" style="width:50%;padding-left:8px"><img src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/twitch-icon-facebook.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
              </tr>
            </tbody>
          </table>
          <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
            <tbody style="width:100%">
              <tr style="width:100%">
                <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© 2022 Twitch, All Rights Reserved <br />350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA</p>
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


const RegisteredAccountEmail = (user_email, body) => {
  return `
  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td><img alt="Koala" height="50" src="https://react-email-demo-7s5r0trkn-resend.vercel.app/static/koala-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="170" />
            <p style="font-size:16px;line-height:26px;margin:16px 0">Hi ${body.l_name},</p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Centralized Manila, the sales intelligence platform that helps you uncover qualified leads and close deals faster.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
              <tbody>
                <tr>
                  <td><a href="http://localhost:5173/" style="background-color:#5F51E8;border-radius:3px;color:#fff;font-size:16px;text-decoration:none;text-align:center;display:inline-block;padding:12px 12px 12px 12px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />The Centralized team</p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">470 Noor Ave STE B #1148, South San Francisco, CA 94080</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

    `;
};




    router.get('/:user_id', async (req, res) => {
        const user_id = req.params.user_id;
    
        const query = "SELECT uc.user_email, up.f_name, up.l_name FROM user_contact uc JOIN user_personal up ON uc.user_id = up.user_id WHERE uc.user_id = ?";
    
        try {
        const result = await queryDatabase(query, [user_id]);
    
        if (result.length > 0 && result[0].user_email) {
            const user_email = result[0].user_email;
            const f_name = result[0].f_name;
            const l_name = result[0].l_name;
            res.json({ user_email, f_name, l_name });
        } else {
            console.error("Invalid response format or missing user_email");
            res.status(404).json({ error: "User not found or missing email" });
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
      const amount = req.body.data.amount / 100;

      // const statType = req.body.status_type;
    
      if (!user_email) {
      return res.status(400).json({ error: "user_email is missing or empty!" });
      }

      try {
        const result = await transporter.sendMail({
          from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
          to: user_email,
          subject: transType,
          html: FormatMail(user_email, body, amount),
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
                  const notif_message = `<p className="text-[0.8rem] pb-2">Your request for <span className="font-semibold dark:text-white">${transaction.trans_type}: ${transaction.transaction_id}</span> has <span className="font-semibold dark:text-white">EXPIRED</span> due to non-payment. Kindly generate a new transaction if you would like to make another request.</p>`;
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



  
// const Send = async (email) => {
//     const result = await transporter.sendMail({
//       from: { name: "Bagong Montalban", address: process.env.MAIL_USERNAME },
//       to: email,
//       subject: "Password Request",
//       html: FormatMail(email),
//     });
  
//     return result;
//   };
  
//   const SentPIN = async (req, res) => {
//     try {
//       const { email } = req.params;
//     //   const { type } = req.body;
  
//       const found = await User.find({ email: email });
//     //   console.log(found[0].type);
//     if (found.length === 0)
//     return res.status(400).json({ error: "Email not registered!" });
  
//     //   if (type !== found[0].type)
//     //     return res.status(400).json({
//     //     //   error: Access denied: Only registered ${type} account can proceed.,
//     //     });
  
//     //   const code = GeneratePIN();
//     //   console.log(code);
//     //   const result = await Send(
//     //     email,
//     //     "Password Security Code",
//     //     "4 Digit PIN",
//     //     code
//     //   );
//     const result = await Send(email);
//       if (!result.response) return res.status(400).json({ error: "Error email" });
  
//     //   const update = await User.findOneAndUpdate(
//     //     { email: email },
//     //     {
//     //     //   $set: { pin: code },
//     //     }
//     //   );
  
//     res.status(200).json({
//         // update,
//         type: found[0].type,
//         message: "Email has been successfully sent!",
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };


export default router;