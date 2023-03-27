import { ValidateProps } from '@/api-lib/constants';
import { findUserByEmail, findUserByUsername, insertUser } from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      password: ValidateProps.user.password,
      email: ValidateProps.user.email,
      role: ValidateProps.user.role,
      subaccount: ValidateProps.user.subaccount
    },
    required: ['username', 'name', 'password', 'email'],
    additionalProperties: false,
  }),
  ...auths,
  async (req, res) => {

    let { username, name, email, password, role } = req.body;
    username = slugUsername(req.body.username);
    email = normalizeEmail(req.body.email);
    if (role) {
      if (role !== 'requestor' && role !== 'supplior') {
        res
          .status(500)
          .json({ error: { message: 'Creating a user without role' } });
        return;
      }
    }
    if (!isEmail(email)) {
      res
        .status(400)
        .json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(req.db, email)) {
      res
        .status(403)
        .json({ error: { message: 'The email has already been used.' } });
      return;
    }
    if (await findUserByUsername(req.db, username)) {
      res
        .status(403)
        .json({ error: { message: 'The username has already been taken.' } });
      return;
    }
    
    if (req.body.subaccount) {

      var masterAccountId = req.user._id.toString();

      const user = await insertUser(req.db, {
        email,
        originalPassword: password,
        bio: '',
        name,
        username,
        role,
        masterAccountId
      });
    } else {

      const user = await insertUser(req.db, {
        email,
        originalPassword: password,
        bio: '',
        name,
        username,
        role
      });

    }
    
    // login new user IF not a sub account being created since then there's a logged in user creating new ones 
    if (user && !req.body.subaccount) {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(201).json({
          user,
        });
      });
    } else {
      res.status(201).json({
        success: 'true'
      });
    }
  }
);

export default handler;
