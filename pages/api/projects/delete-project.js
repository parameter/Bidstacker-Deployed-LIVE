import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { deleteProject } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

export const config = {
  api: {
    externalResolver: true,
  },
};

handler.delete(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const result = await deleteProject({
    db: req.db,
    projectId: req.body.projectId,
  });
  if (!result) return res.status(500).end();

  return res.status(200).json({ result: result });
});

export default handler;
