import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { insertProject } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  try {
    const result = await insertProject({
      db: req.db,
      projectTitle: req.body.projectTitle,
    });

    return res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

export default handler;
