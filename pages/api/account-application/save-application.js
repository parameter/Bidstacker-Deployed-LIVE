import { auths, database } from '@/api-lib/middlewares';
import crypto from 'crypto';
import { ncOpts } from '@/api-lib/nc';
import { insertUser } from '@/api-lib/db';
import nc from 'next-connect';
import nodemailer from 'nodemailer';
import HTML_EmailTemplate from '@/api-lib/email-template-html';
import TEXT_EmailTemplate from '@/api-lib/email-template-text';
const mailchimp = require('@mailchimp/mailchimp_marketing');

const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: 465,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASSWORD
  }
});

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    ...auths,
    async (req, res) => {

    var resultStatusArray = [];

    let { email, contactName, businessName, contactNumber, role } = req.body.user_data;
    const password = crypto.randomBytes(16).toString('hex');

    const user = await insertUser(req.db, {
        email: email,
        originalPassword: password,
        bio: '',
        name: contactName,
        username: email,
        role: role,
        masterAccountId: null,
        businessName: businessName,
        contactNumber: contactNumber
    });

    if (user === 'user exists') {
        resultStatusArray.push('user exists FAILED');
    } else {
        resultStatusArray.push('user DB success');
    }

    // mailchimp 
    mailchimp.setConfig({
        apiKey: process.env.NEXT_MAILCHIMP_API_KEY,
        server: process.env.NEXT_MAILCHIMP_SERVER,
    });
      
    try {
        const response = await mailchimp.lists.addListMember('8a4eeba632', {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: contactName,
                COMPNAME: businessName,
                PHONE: contactNumber,
                CONTACT: contactName,
            }
        });

        if (response.status === 'subscribed') {
            resultStatusArray.push('mailchimp subscribed success');
        }

    } catch (error) {
        resultStatusArray.push('mailchimp subscribed FAILED');
    }

    // send email 
    transporter.sendMail({
        from: 'info@bidstacker.se',
        to: email,
        subject: `Vi har tagit emot er ansökan`,
        text: TEXT_EmailTemplate({
            title: `Välkommen ${contactName ? contactName : 'fantastiska människa'} till Bidstacker!`,
            content_paragraphs: [
                'Tack för ert visade intresse för att använda vår tjänst! Vi hör av oss när ert konto aktiverats samt vid kommande nyhetsuppdateringar om tjänsten.'
            ],
            signoff: 'Vänliga hälsningar, teamet på Bidstacker'
        }),
        html: HTML_EmailTemplate({
            title: `Välkommen ${contactName ? contactName : 'fantastiska människa'} till Bidstacker!`,
            content_paragraphs: [
                'Tack för ert visade intresse för att använda vår tjänst! Vi hör av oss när ert konto aktiverats samt vid kommande nyhetsuppdateringar om tjänsten.'
            ],
            signoff: 'Vänliga hälsningar, teamet på Bidstacker',
            assets_domain: 'https://bidstacker.vercel.app'
        }) 
    
    }, (error, response) => {

        if (!error) {
            resultStatusArray.push('bidstacker mail success');
        } else {
            resultStatusArray.push(error);
        }

        res.status(200).json({ result: resultStatusArray });
 
    });
      
});

export default handler;