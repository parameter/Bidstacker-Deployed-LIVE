import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { insertUser } from '@/api-lib/db';
import nc from 'next-connect';
import nodemailer from 'nodemailer';
import HTML_EmailTemplate from '@/api-lib/email-template-html';
import TEXT_EmailTemplate from '@/api-lib/email-template-text';

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

    let { businessName, email, buyer, reseller, delivery, message } = req.body;
    var resultStatusArray = [];

    // EMAIL FOR CUSTOMER
    transporter.sendMail({
      from: 'info@bidstacker.se',
      to: email,
      subject: `Tack för ditt meddelande`,
      text: TEXT_EmailTemplate({
          title: `Hej ${businessName ? businessName : 'fantastiska företag'}!`,
          content_paragraphs: [
            'Tack för att ni tar kontakt med oss, någon av våra medarbetare kontaktar dig så fort det bara går.'
          ],
          signoff: 'Vänliga hälsningar, teamet på Bidstacker'
      }),
      html: HTML_EmailTemplate({
          title: `Hej ${businessName ? businessName : 'fantastiska företag'}!`,
          content_paragraphs: [
            'Tack för att ni tar kontakt med oss, någon av våra medarbetare kontaktar dig så fort det bara går.'
          ],
          signoff: 'Vänliga hälsningar, teamet på Bidstacker',
          assets_domain: 'https://bidstacker.vercel.app'
      }) 

    }, (error, response) => {

        if (!error) {
          resultStatusArray.push('customer email success');
        } else {
          resultStatusArray.push('customer email FAILED');
        }

          // EMAIL FOR BIDSTACKER
          transporter.sendMail({
            from: 'info@bidstacker.se',
            to: 'info@bidstacker.se',
            subject: `Meddelande från Kontaktformuläret`,
            text: TEXT_EmailTemplate({
                title: `Hej ${businessName ? businessName : 'fantastiska företag'}!`,
                content_paragraphs: [
                  'En besökare skrev i kontaktformuläret:',
                  message,
                  'kundensEmail: ' + email,
                  'Företagsnamn: ' + businessName,
                  'Vill bli buyer: ' + buyer,
                  'Vill bli reseller: ' + reseller,
                  'Vill bli delivery: ' + delivery
                ],
                signoff: ''
            })

          }, (error, response) => {

              if (!error) {
                resultStatusArray.push('bidstacker email success');
                res.status(200).json({ result: resultStatusArray });
              } else {
                resultStatusArray.push('bidstacker email FAILED');
                res.status(200).json({ result: resultStatusArray });
              }

          });

    });

});

export default handler;