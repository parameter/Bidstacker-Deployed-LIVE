import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { editProjectTitle } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.use(database);

export const config = {
  api: {
    externalResolver: true,
  },
};

handler.put(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  const result = await editProjectTitle({
    db: req.db,
    projectId: req.body.projectId,
    projectTitle: req.body.input,
  });
  if (!result) return res.status(500).end();

  return res.status(200).json({ result: result });
});

export default handler;
