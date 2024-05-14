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
                            <img src="https://i.ibb.co/KhkptHZ/email-thanks-banner.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: auto;" width="100%" />
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
                              <p style="font-size:16px;line-height:18px;margin:2px 0px 16px 0px">Centralized Manila Team</p>

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


  const RegisteredAccountEmail = (user_email, body) => {
    return `
    <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tbody>
          <tr style="width:100%">
            <td><img src="https://i.ibb.co/p09dYX5/email-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="40%" height="auto" />
              <p style="font-size:16px;line-height:26px;margin:16px 0">Greetings Mr./Ms./Mrs. ${body.l_name}!</p>
              <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to Centralized Manila, your portal to an amazing new world filled with efficient digital services.</p>
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
                <tbody>
                  <tr>
                    <td><a href="/" style="background-color:#3E7DEC;border-radius:3px;color:white;font-size:16px;text-decoration:none;text-align:center;display:inline-block;padding:12px 12px 12px 12px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Get started</span><span><!--[if mso]><i style="letter-spacing: 12px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:16px;line-height:26px;margin:16px 0">Best regards,<br />Centralized Manila Team</p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
              <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">© 2024 Centralized Manila. All rights reserved.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>

      `;
  };


  const ResetPassMail = (user_email, body) => {
    return `
    <body style="font-family:HelveticaNeue,Helvetica,Arial,sans-serif; background-color: #e5e5f7; opacity: 0.8; background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px); background-size: 10px 10px;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#ffffff">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align: center; padding: 20px">
              <tbody>
                <tr>
                  <td><img src="https://i.ibb.co/p09dYX5/email-logo.png" style="display:block; outline:none; border:none; text-decoration:none; margin:auto;" width="120" /></td>
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
                          <td data-id="__react-email-column" style="border-bottom:1px solid rgb(0, 94, 255);width:102px"></td>
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
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">Dear Mr./Ms./Mrs. ${body.l_name}!,</p>
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">You updated the password for your Centralized Manila account on ${body.formattedDate}. If this was you, then no further action is required.</p>
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">However if you did NOT perform this password change, please<!-- --> <a href="/forgotpass" style="color:#067df7;text-decoration:underline" target="_blank">reset your account password</a> <!-- -->immediately.</p>
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">Still have questions? Reach us<!-- --> <a href="#" style="color:#067df7;text-decoration:underline" target="_blank">Centralized Manila</a></p>
                    <p style="font-size:14px;line-height:1.5;margin:16px 0">Best regards,<br />Centralized Manila Team</p>
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
                  <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© 2024 Centralized Manila. All rights reserved.</p>
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

  const RefundMail = (user_email, body, amount, formattedDate) => {
    return `
    <body style="font-family:HelveticaNeue,Helvetica,Arial,sans-serif; background-color: #e5e5f7; opacity: 0.8; background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px); background-size: 10px 10px;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#ffffff">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align: center; padding: 20px">
              <tbody>
                <tr>
                  <td><img src="https://i.ibb.co/p09dYX5/email-logo.png" style="display:block; outline:none; border:none; text-decoration:none; margin:auto;" width="120" /></td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size:12px;line-height:1.5;margin:5px 0;font-weight:bold">Centralized Manila</p>
                    <p style="font-size:12px;line-height:1.5;margin:5px 0">Padre Burgos Ave, Ermita, Manila, 1000 Metro Manila</p>
                    <p style="font-size:12px;line-height:1.5;margin:5px 0px 0px 0px">${formattedDate}</p>
                  </td>
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
                          <td data-id="__react-email-column" style="border-bottom:1px solid rgb(0, 94, 255);width:102px"></td>
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
                  <th></th>
                  <th style="white-space:nowrap;padding:5px 0px 5px 0px;">REFUND RECEIPT</th>
                  <th></th>
                </tr>
                <tr>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                </tr>
                <tr>
                  <td></td>
                  <td style="white-space:nowrap;font-weight:bold;padding:5px 0px 5px 0px;">Transaction ID <span style="font-weight:normal">${body.data.transaction_id}</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="padding:10px 0px 0px 0px;white-space:nowrap;">Customer Name</td>
                  <td></td>
                  <td style="padding:10px 0px 0px 0px; white-space:nowrap;">${body.f_name} ${body.l_name}</td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="white-space:nowrap;">Service Requested</td>
                  <td></td>
                  <td style="white-space:nowrap;">${body.service_requested}</td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="white-space:nowrap;">Amount Paid</td>
                  <td></td>
                  <td style="white-space:nowrap;">${body.data.amount}</td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="white-space:nowrap;">Refund Amount</td>
                  <td></td>
                  <td style="white-space:nowrap;">${body.data.amount}</td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="white-space:nowrap;">Refunded To</td>
                  <td></td>
                  <td style="white-space:nowrap;">${body.formatted_payment_method}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td style="white-space:nowrap;">--------------------</td>
                </tr>
                <tr style="white-space:nowrap;">
                  <td style="white-space:nowrap;font-weight:bold">Total Refunded Amount</td>
                  <td></td>
                  <td style="white-space:nowrap;font-weight:bold">${body.data.amount}</td>
                </tr>
                <tr>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                  <td><hr style="border-top: 3px dotted black;"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align: center; padding: 20px">
      <tbody>
        <tr>
          <td>
            <p style="font-size:12px;line-height:1.5;margin:5px 0;font-weight:bold">Thank you for choosing Centralized Manila. Please retain this copy for your records.</p>
            <p style="font-size:12px;line-height:1.5;margin:5px 0">------ Customer Copy ------</p>
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
                  <p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© 2024 Centralized Manila. All rights reserved.</p>
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
                    <img src="https://i.ibb.co/p09dYX5/email-logo.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: 55px;" />
                  </td>
                </tr>
                <tr>
                  <td style="border: 1px solid rgb(0,0,0, 0.1); border-radius: 3px">
                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="overflow: hidden">
                      <tbody>
                        <tr>
                          <td>
                            <img src="https://i.ibb.co/KhkptHZ/email-thanks-banner.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: auto;" width="100%" />
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
                              
                              <p style="font-size:16px;line-height:18px;margin:50px 0px 10px 0px">Best regards,</p>
                              <p style="font-size:16px;line-height:18px;margin:2px 0px 16px 0px">Centralized Manila Team</p>

                              <hr style="margin:10px 0"/>
                              <p style="font-size:14px;line-height:24px;margin:16px 0">If you did not initiate this transaction, there is a possibility that someone else may be attempting to access the Centralized Manila account associated with <span style="font-weight: 700;"> ${user_email}</span></p>
                              <p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:-5px">This email is sent as your address is listed as the recovery email for Centralized Manila. If this is incorrect, please contact <span style="font-weight: 700;">centralizedmanila@gmail.com</span> to remove your email address from that Google Account.</p>
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


  const RegistryMail = (user_email, body, dynamicSex) => {
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
                            <img src="https://i.ibb.co/6sPV2BW/email-verified.png" style="display: block; outline: none; border: none; text-decoration: none; max-width: 100%; height: auto;" width="100%" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0">
                        <tbody style="width:100%">
                          <tr style="width:100%; color:black !important;">
                            <td style="padding:0px 20px 10px 20px">
                              
                              
                              <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${dynamicSex} ${body.f_name} ${body.l_name}!</h1>
                              <h2 style="font-size:26px;font-weight:bold;text-align:center">We received a request to process your ${body.data.type} through your email address <span style="font-weight: 700;">${user_email}</span>.</h2>
                              <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
                              <div style="border: 3px dashed #38bdf8; padding: 3px; border-radius: 3px;">
                                  <div style="background-color: #38bdf8; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #1e40af;">
                                  ${body.status_type}
                                  </div>
                              </div>
                              <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Date: </span>${body.data.date}</p>
                              <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Time: </span>${body.data.time}</p>


                              <p style="font-size:16px;line-height:18px;margin:50px 0px 10px 0px">Best regards,</p>
                              <p style="font-size:16px;line-height:18px;margin:2px 0px 16px 0px">Centralized Manila Team</p>

                              <hr style="margin:10px 0"/>
                              <p style="font-size:14px;line-height:24px;margin:16px 0">If you did not initiate this transaction, there is a possibility that someone else may be attempting to access the Centralized Manila account associated with <span style="font-weight: 700;"> ${user_email}</span></p>
                              <p style="font-size:14px;line-height:24px;margin:16px 0;margin-top:-5px">This email is sent as your address is listed as the recovery email for Centralized Manila. If this is incorrect, please contact <span style="font-weight: 700;">centralizedmanila@gmail.com</span> to remove your email address from that Google Account.</p>

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

    

  router.get('/regis/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    const query = `
        SELECT uc.user_email, up.f_name, up.l_name 
        FROM user_contact uc
        JOIN user_personal up ON uc.user_id = up.user_id
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
    const amount = typeof rawAmount === 'string' ? parseInt(rawAmount.replace(/,/g, ''), 10) : rawAmount;
    const statusType = req.body.status_type;
    const sexType = req.body.sex_type;
    

     let completeMessage = "";

  switch (transType) {
    // case "Real Property Tax Payment":
    //   completeMessage = "Your real property tax payment has been successfully processed and is now marked as complete.";
    //   break;

    // case "Real Property Tax Clearance":
    //   completeMessage = "Your real property tax clearance has been successfully processed and is now marked as complete.";
    //   break;

    case "Birth Certificate":
      completeMessage = `
      <p style="font-size:16px;line-height:24px;margin:16px 0">To claim the requested document, you must bring:</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; An authorization letter from the document owner and their original valid ID if you are not the document owner. Additionally, if the document owner is under 18 years old, you must provide an authorization letter from the mother with her valid ID.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Original and a photocopy of your ID that shows your address from the place where you are obtaining the document.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Supporting documents that prove your relationship to the owner of the document.</h2>
      `;
      break;

    case "Marriage Certificate":
      completeMessage = `
      <p style="font-size:16px;line-height:24px;margin:16px 0">To claim the requested document, you must bring:</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; An authorization letter from the document owner and their original valid ID if you are not the document owner.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Original and a photocopy of the ID of one of the spouses is needed.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Supporting documents that prove your relationship to the owner of the document.</h2>
      `;
      break;

    case "Death Certificate":
      completeMessage = `
      <p style="font-size:16px;line-height:24px;margin:16px 0">To claim the requested document, you must bring:</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Original and a photocopy of your ID that shows your address from the place where you are obtaining the document.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">&#183; Supporting documents that prove your relationship to the owner of the document.</h2>
      `;
      break;
    // default:
    //   completeMessage = "Your transaction has been successfully processed and is now marked as complete.";
  }

    const message = {
      Pending: `
      <h2 style="font-size:26px;font-weight:bold;text-align:center">We have received a request to process your ${transType} via the email address <span style="font-weight: 700;">${user_email}</span>.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">The transaction will be processed once the payment is received. Please ensure that the payment is made to proceed with the transaction, and we will notify you once the transaction is complete. If you have any questions, please do not hesitate to reach out to us.</p>        
      <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #fef08a; padding: 3px; border-radius: 3px;">
            <div style="background-color: #fef08a; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #854d0e;">
                Pending
            </div>
        </div>
      `,
      Paid: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">We are pleased to inform you that your ${transType} has been successfully processed. The payment for this transaction has been received and confirmed.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">Thank you for your prompt payment. If you have any further inquiries, please feel free to contact us.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #a7f3d0; padding: 3px; border-radius: 3px;">
            <div style="background-color: #a7f3d0; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #065f46;">
                Paid
            </div>
        </div>
      `,
      Processing: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">Your ${transType} is currently being processed.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">Our team is diligently working to complete the transaction, and we will notify you once it has been successfully processed.</h2>
        <h2 style="font-size:26px;font-weight:bold;text-align:center">Thank you for your patience and understanding.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #e9d5ff; padding: 3px; border-radius: 3px;">
            <div style="background-color: #e9d5ff; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #6b21a8;">
                Processing
            </div>
        </div>
      `,
      Canceled: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">We regret to inform you that your ${transType} request has been canceled.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">If you have any questions or concerns regarding this cancellation, please contact our customer support for further assistance.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #e2e8f0; padding: 3px; border-radius: 3px;">
            <div style="background-color: #e2e8f0; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #020617;">
                Canceled
            </div>
        </div>
      `,
      Rejected: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">We are sorry, but your ${transType} request has been rejected.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">Please review the provided details and make sure all information is accurate.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0; text-align: justify;">We want to assure you that the paid transaction will be automatically refunded in full, with the refund currently being processed.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">If you need further assistance or clarification, feel free to reach out to our customer support team.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #fecaca; padding: 3px; border-radius: 3px;">
            <div style="background-color: #fecaca; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #991b1b;">
                Rejected
            </div>
        </div>
      `,
      Expired: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">Unfortunately, your ${transType} request has expired.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">Please initiate a new transaction if you still wish to proceed with the payment.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">If you have any questions, don't hesitate to contact our support team for assistance.</h2>
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
        <div style="border: 3px dashed #fed7aa; padding: 3px; border-radius: 3px;">
           <div style="background-color: #a7f3d0; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #065f46;">
                Expired
            </div>
        </div>
        `,
      Refunded: `
      <h2 style="font-size:26px;font-weight:bold;text-align:center">We are pleased to inform you that your Rejected ${transType} request has been refunded.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0; text-align: justify;">We're reaching out to confirm that the refund for your transaction has been successfully processed. By now, you should have received a receipt for this refund via email.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">If you need further assistance or clarification, feel free to reach out to our customer support team.</h2>
      <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>
      <div style="border: 3px dashed #a7f3d0; padding: 3px; border-radius: 3px;">
        <div style="background-color: #a7f3d0; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #065f46;">
          Refunded
          </div>
      </div>
      <p style="font-size:16px;line-height:24px;margin:16px 0"> <span style="font-weight: 600;">Account Name:</span> ${body.f_name} ${body.l_name}  </p>
      `,
      Complete: `
        <h2 style="font-size:26px;font-weight:bold;text-align:center">Congratulations! Your ${transType} has been successfully processed and is now marked as complete.</h2>
        ${completeMessage}
        <p style="font-size:16px;line-height:24px;margin:16px 0">This transaction is currently labeled as:</p>

        <div style="border: 3px dashed #93c5fd; padding: 3px; border-radius: 3px;">
            <div style="background-color: #93c5fd; padding: 4px; font-size:32px; text-align: center; letter-spacing: 3px; font-weight: bold; border-radius: 3px; text-transform: uppercase; color: #1f347a !important;">
                Complete
            </div>
        </div>
        `,
    };

   


    const dynamicSex = (sexType === 'Female') ? 'Ms./Mrs.' : 'Mr.';
    
    const dynamicMessage = message[statusType] || message.Pending;
    
    const dynamicAmountTitle = (statusType === 'Pending') ? 'Amount to pay:' : 'Amount:';

  
    const rp_tdn = body.data.rp_tdn;
    const rp_pin = body.data.rp_pin;
    const bus_reg_no = body.data.bus_reg_no;
    const bus_tin = body.data.bus_tin;


    const hashValue = (value) => {
      if (value !== undefined && value !== null) {
        return value.slice(0, -3).replace(/./g, '*') + value.slice(-3);
      }
      return value;
    };

    const hashedTdn = hashValue(rp_tdn);
    const hashedPin = hashValue(rp_pin);
    const hashedRegNo = hashValue(bus_reg_no);
    const hashedTin = hashValue(bus_tin);



    let htmlContent;
    let typeInfo = "";

    switch (transType) {
      case "Real Property Tax Payment":
        typeInfo = `
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Account Name: </span>${body.data.acc_name}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TDN: </span>${hashedTdn}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">PIN: </span>${hashedPin}</p>
        `
        htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
        break;
      
      case "Real Property Tax Clearance":
        typeInfo = `
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TDN: </span>${hashedTdn}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">PIN: </span>${hashedPin}</p>
        `
        htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
        break;
      
      case "Business Permit":
        typeInfo = `
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Business Name: </span>${body.data.bus_name}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Registration No.: </span>${hashedRegNo}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">TIN: </span>${hashedTin}</p>
        `
        htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
        break;

      case "Community Tax Certificate":
        typeInfo = `
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Full Name: </span>${body.f_name} ${body.l_name}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">City: </span>${body.data.city_name}</p>
        `
        htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
        break;

      default:
        typeInfo = `
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Full Name: </span>${body.f_name} ${body.l_name}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">City: </span>${body.data.reqcity}</p>
        <p style="font-size:16px;line-height:22px;margin:16px 0"><span style="font-weight: 600;">Purpose: </span>${body.data.purpose_type}</p>
        `
        htmlContent = FormatMail(user_email, typeInfo, body, amount, dynamicSex, dynamicMessage, dynamicAmountTitle);
    }

    if (!user_email) {
      return res.status(400).json({ error: "user_email is missing or empty!" });
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

  
  router.post('/refund/:user_email', async (req, res) => {

    const { user_email } = req.params;
    const body = req.body;
    const transType = req.body.data.trans_type;
    const amount = req.body.data.amount / 100;

    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    // console.log("Refund/body", body)


    // const statType = req.body.status_type;
  
    if (!user_email) {
    return res.status(400).json({ error: "user_email is missing or empty!" });
    }

    try {
      const result = await transporter.sendMail({
        from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
        to: user_email,
        subject: transType,
        html: RefundMail(user_email, body, amount, formattedDate),
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



  router.post('/status-verified-email/:user_email', async (req, res) => {

    const { user_email } = req.params;
    const body = req.body;
    const transType = req.body.data.trans_type;
    const amount = req.body.data.amount / 100;
    const sexType = req.body.sex_type;

    const dynamicSex = (sexType === 'Female') ? 'Ms./Mrs.' : 'Mr.';

    // const statType = req.body.status_type;
  
    if (!user_email) {
    return res.status(400).json({ error: "user_email is missing or empty!" });
    }

    try {
      const result = await transporter.sendMail({
        from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
        to: user_email,
        subject: transType,
        html: RegistryMail(user_email, body, dynamicSex),
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


  router.post('/status-updated-email/:user_email', async (req, res) => {

    const { user_email } = req.params;
    const body = req.body;
    const transType = req.body.data.trans_type;
    const sexType = req.body.sex_type;

    const dynamicSex = (sexType === 'Female') ? 'Ms./Mrs.' : 'Mr.';
  
    if (!user_email) {
    return res.status(400).json({ error: "user_email is missing or empty!" });
    }


    try {
      const result = await transporter.sendMail({
        from: { name: "Centralized Manila", address: process.env.MAIL_USERNAME },
        to: user_email,
        subject: transType,
        html: RegistryMail(user_email, body, dynamicSex),
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


export default router;