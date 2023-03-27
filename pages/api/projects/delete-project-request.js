import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { deleteRequestFromProject } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  try {
    const result = await deleteRequestFromProject({
      db: req.db,
      projectId: req.body.projectId,
      groupId: req.body.groupId,
    });

    return res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

export default handler;
