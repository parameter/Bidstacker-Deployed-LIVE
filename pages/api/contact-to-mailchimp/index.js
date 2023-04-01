import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const mailchimp = require('@mailchimp/mailchimp_marketing');

export const config = {
    api: {
        bodyParser: true,
    }
}

const handler = nc(ncOpts);

handler.use(database);

handler.post(
    ...auths,
    async (req, res) => {

    mailchimp.setConfig({
      apiKey: process.env.NEXT_MAILCHIMP_API_KEY,
      server: process.env.NEXT_MAILCHIMP_SERVER,
    });
    
    try {
        const response = await mailchimp.lists.addListMember(process.env.NEXT_MAILCHIMP_LISTID, {
            email_address: req.body.email_address,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.contactName,
                COMPNAME: req.body.businessName,
                PHONE: req.body.contactNumber,
                CONTACT: req.body.contactName,
            }
        });

        if (response.status === 'subscribed') {
            res.status(200).json({ status: 'subscribed' })
        }

    } catch (error) {
        res.status(200).json({ status: 'failed' })
    }
});

export default handler;