import nodemailer from 'nodemailer';
import { Router } from 'express';

import dotenv from 'dotenv';

dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 465,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });


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

const FormatMail = (user_email, data, trans_type) => {
  return `
  <div style="max-width: 48rem; margin-left: auto; margin-right: auto;">
      <div style="background: radial-gradient(at center top, rgb(64, 141, 81), rgb(41, 81, 65)); display: flex; padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 1.25rem; padding-right: 1.25rem; justify-content: space-between; align-items: center; ">
        <div style="text-align: center; margin: auto">
          <span style="font-size: 1.25rem; font-weight: 700; color: #ffffff;">
            MUNICIPALITY OF RODRIGUEZ, RIZAL 
          </span>
          <br/>
          <span style="font-size: 0.875rem; font-weight: 500; color: #ffffff;">
                M.H. Del Pilar Road, Rodriguez 1860 Rizal.
          </span>
        </div>
      </div>
      <div
        style="padding-top: 1.25rem; padding-bottom: 1.25rem;">
        <h1 style="font-size: 1.5rem; line-height: 2rem; font-weight: 700; text-align: center; text-transform: uppercase;">
          Request
        </h1>
        <p style="margin-top: 0.5rem; font-weight: 700;">
          Dear ${data.acc_name},
        </p>
        <div style="text-align: justify;">
          <p style="margin-top: 0.75rem;">
            We received a request to process your ${trans_type}
            through your email address,
            <span style="font-weight: 700;">${user_email}</span>
            
          </p>
          <p style="margin-top: 0.75rem;">Your account verification code is:</p>
          <div style="text-align: center; font-size: 3rem; font-weight: 700; height: 70px; margin: auto">
                "Your Request is PENDING"
          </div>
          <p>
            If you did not request this code, it is possible that someone else
            is trying to access the Centralized Manila account of
            <span style="font-weight: 700;"> ${user_email}</span>
          </p>
          <p style="margin-top: 0.5rem;">
            Your received this message because this email address is listed as
            the recovery email for the Centralized Manila. If that is incorrect,
            please contact
            <span style="font-weight: 700;">services.CentralizedManila@gmail.com</span>
            to remove your email address from that Google Account.
          </p>
          <p>${data.amount}</p>
        </div>
        <p style="margin-top: 0.75rem; font-weight: 700;">
          Sincerely yours,
        </p>
        <p style="font-weight: 700; ">Centralized Manila</p>
      </div>
      <div style="background: radial-gradient(at center top, rgb(64, 141, 81), rgb(41, 81, 65)); color: #ffffff; padding-top: 1rem; padding-bottom: 1rem; margin: auto; text-align: center;">
        Â© 2023 Centralized Manila, Inc. All Rights Reserved.
      </div>
    </div>
    `;
};



  router.post('/send-email/:user_email', async (req, res) => {

    const { user_email } = req.params;
    const data = req.body.data;
    const transType = req.body.trans_type;
  
    if (!user_email) {
    return res.status(400).json({ error: "user_email is missing or empty!" });
    }

    try {

        // const result = await Send(user_email);

        const result = transporter.sendMail({
            from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
            to: user_email,
            subject: transType,
            html: FormatMail(user_email, data, transType), 
        });

        if (!result.response) return res.status(400).json({ error: "Error sending email" });

        res.json({
        type: found[0].type,
        message: "Email has been successfully sent!",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

  });



//   router.post('/send-email/:userEmail', async (req, res) => {
//     const user_id = req.params.user_id;

//     const query = "SELECT user_email FROM user_contact WHERE user_id = ?";
  
//     try {
//     const result = await queryDatabase(query, [user_id]);
    
//     res.json(result[0].user_email);
//     console.log(result[0].user_email);
//     } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving data');
//     }
//   });


  
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