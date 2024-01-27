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
                  <p style="font-size:14px;line-height:1.5;margin:16px 0">You updated the password for your Twitch account on<!-- --> <!-- -->Jun 23, 2022, 4:06:00 PM<!-- -->. If this was you, then no further action is required.</p>
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