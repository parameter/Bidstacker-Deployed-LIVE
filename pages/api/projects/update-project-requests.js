import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { updateProjectWithRequest } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

handler.put(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  try {
    const result = await updateProjectWithRequest({
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
