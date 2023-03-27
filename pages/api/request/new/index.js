import { auths, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import { insertRequest } from '@/api-lib/db';
import path from 'path';
import axios from 'axios';

const handler = nc(ncOpts);

handler.use(database);

export const config = {
  api: {
    externalResolver: true,
  },
};

handler.post(...auths, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }

  console.log('req.user', req.user);

  const groupId = new ObjectId();

  var requests = [];

  /*
    var form = new multiparty.Form({
      autoFiles: true,
      uploadDir: path.join(process.env.ROOT_DIR || process.cwd(), `public/uploads/`)
    });

    form.on('part', function(part) {
      // You *must* act on the part by reading it
      // NOTE: if you want to ignore it, just call "part.resume()"
    
      if (part.filename === undefined) {
        // filename is not defined when this is a field and not a file
        console.log('got field named ' + part.name);
        // ignore field's content
        part.resume();
      }
    
      if (part.filename !== undefined) {
        // filename is defined when this is a file
        count++;
        console.log('got file named ' + part.name);
        // ignore file's content here
        part.resume();
      }
    
      part.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
      });
    });
    
    // Close emitted after form parsed
    form.on('close', function() {
      console.log('Upload completed!');
      res.setHeader('text/plain');
      res.end('Received ' + count + ' files');
    });

     */

  req.body.requests.forEach((item) => {
    delete item.id;
    item.groupId = groupId;
    requests.push(item);
  });

  const result = insertRequest({
    db: req.db,
    groupId: groupId,
    request_metadata: {
      status: 'new',
      requestor: req.user._id,
      ...req.body.request_metadata
    },
    request_items: requests,
    delivery: {
      ...req.body.delivery,
      ...req.body.deliveryPersonalInfo,
      status: 'pending',
    },
  });
   
  return res.json({ result: result });
});

export default handler;
