const axios = require('axios');
require('dotenv').config();

class EmailSender {
    constructor() {
        this.apiKey = process.env.EMAIL_API_KEY;
        this.sender = process.env.SENDER_EMAIL
    }
    async send(email, subject, message) {
        let data = JSON.stringify({
            Recipients: {
                To: [
                    email
                ]
            },
            Content: {
                Body: [
                    {
                        "ContentType": "HTML",
                        "Content": message,
                        "Charset": "utf-8"
                    }
                ],
                From: `Url Shortner <${this.sender}>`,
                Subject: subject,
            }
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.elasticemail.com/v4/emails/transactional',
            headers: {
                'X-ElasticEmail-ApiKey': this.apiKey,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await axios.request(config)
        const result = { status: response.status, data: response.data };
        return result
    }
    async SendVerificationEmail(email, user, code) {
        return await this.send(email, "Verify Your Email Address", this.VerficationTemplate(user, code))
    }
    VerficationTemplate(user, code) {
        const template = `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
            <meta name="color-scheme" content="light">
            <meta name="supported-color-schemes" content="light">
            <title></title>
        
            <!--[if !mso]><!-->
            <style type="text/css">
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap');
            </style>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap"
                rel="stylesheet">
            <!--<![endif]-->
        
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
        
            <!--[if mso]>
                <style>
                    * {
                        font-family: sans-serif !important;
                    }
                </style>
            <![endif]-->
        
            <!--[if !mso]><!-->
            <!-- insert web font reference, eg: <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" rel='stylesheet' type='text/css'> -->
            <!--<![endif]-->
        
        
            <style>
                :root {
                    color-scheme: light;
                    supported-color-schemes: light;
                }
        
                html,
                body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                }
        
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
        
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
        
                #MessageViewBody,
                #MessageWebViewDiv {
                    width: 100% !important;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
        
                th {
                    font-weight: normal;
                }
        
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
        
                a {
                    text-decoration: none;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                a[x-apple-data-detectors],
                /* iOS */
                .unstyle-auto-detected-links a,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                .im {
                    color: inherit !important;
                }
        
                .a6S {
                    display: none !important;
                    opacity: 0.01 !important;
                }
        
                img.g-img+div {
                    display: none !important;
                }
        
                @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                    u~div .email-container {
                        min-width: 320px !important;
                    }
                }
        
                @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                    u~div .email-container {
                        min-width: 375px !important;
                    }
                }
        
                @media only screen and (min-device-width: 414px) {
                    u~div .email-container {
                        min-width: 414px !important;
                    }
                }
            </style>
        
            <style>
                .button-td,
                .button-a {
                    transition: all 100ms ease-in;
                }
        
                .button-td-primary:hover,
                .button-a-primary:hover {
                    background: #5582ff !important;
                    border-color: #5582ff !important;
                }
        
                .email-container p.column-header {
                    padding-top: 30px;
                }
        
                @media screen and (max-width: 600px) {
        
                    .email-container {
                        width: 100% !important;
                        margin: auto !important;
                    }
        
                    .stack-column,
                    .stack-column-center {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                    }
        
                    .stack-column-center {
                        text-align: center !important;
                    }
        
                    .center-on-narrow {
                        text-align: center !important;
                        display: block !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                        float: none !important;
                    }
        
                    table.center-on-narrow {
                        display: inline-block !important;
                    }
        
               
                    .email-container p.header-text {
                        font-size: 25px !important;
                    }
        
                    .email-container p.column-header {
                        font-size: 19px !important;
                        padding-top: 32px;
                    }
        
               
        
                    .email-container .grid .mobile-gap {
                        padding-bottom: 48px;
                    }
        
                    .email-container .grid .link-button {
                        padding: 32px 10px 10px !important;
                    }
                 
                }
            </style>
        
        </head>
        
        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #F5F6F8;">
            <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #F5F6F8;">
                <!--[if mso | IE]>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F5F6F8;">
            <tr>
            <td>
            <![endif]-->
                <!-- Email Body -->
                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="640"
                    style="margin: auto;" class="email-container">
        
                    <!-- Logo -->
                    <tr>
                        <td class="logo" style="padding: 10px 0 32px; text-align: center">
                            <img src="https://raw.githubusercontent.com/Muhammad-Zain01/url-shortner/main/public/logo.png"
                                width="200" height="46" alt="logo" border="0"
                                style="height: auto;background: #F5F6F8;font-family: Poppins;font-size: 15px;line-height: 15px;color: #555555;background-color: #F5F6F8;"
                                bgcolor="#F5F6F8">
                        </td>
                    </tr>
        
                    <!-- Section: email title -->
                    <tr>
                        <td style="padding: 48px 32px 20px; text-align: center; background-color: #ffffff;">
                            <p class="header-text"
                                style="height: auto; margin: 15px 0; background: #ffffff; font-family: Poppins; text-align: center; font-size: 28px; line-height: 34px; color: #000000; background-color: #ffffff;">
                                Verify Your Email Address
                            </p>
                            <p
                                style="height: auto; text-align: left;margin: 28px 0 15px; background: #ffffff; font-family: Poppins; font-size: 15px; line-height: 27px; color: #5F5F5F; background-color: #ffffff;">
                                Welcome,<b> ${user} </b>
                                <br>
                                <br>
                                Enter Code Below to Verify your email address.
                            </p>
                            <p
                                style="height: auto; background: #0966ad38; padding: 20px; margin: 28px 0 15px; font-family: Poppins; font-size: 30px; font-weight: bold; line-height: 27px; color: #0966adfd;">
                                ${code}
                            </p>
                        </td>
                    </tr>
        
        
                    <tr>
                        <td style="padding: 0 0x 0; margin: 20px; text-align: center; background: transparent;">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; margin: 0px; text-align: center; background: #ffffff; background-color: #ffffff;"
                            bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center" valign="top">
                                        <div style="display: flex; justify-content: center; align-items: center">
                                            <a href="https://github.com/Muhammad-Zain01" target="_blank">
                                                <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                                                    class="fadeimg" alt="github" width="38" height="38"
                                                    style="max-width: 38px;">
                                            </a>
                                            &nbsp;&nbsp;
                                            <a href="https://www.linkedin.com/in/muhammad-zain01" target="_blank">
                                                <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                                                    class="fadeimg" alt="Linked In" width="32" height="32"
                                                    style="max-width: 32px;">
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
        
                </table>
        
                <!--[if mso | IE]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </center>
        </body>
        
        </html>
            `
        return template;
    }
}

const Email = new EmailSender();
module.exports = Email