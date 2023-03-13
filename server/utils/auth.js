const jwt = require('jsonwebtoken');

const secret = 'Three 9r0j3cc7 03! 16! 2023@ Br3 B3c D@n Tr@ D0G%% L3v#lUp';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ userName, _id }) {
    const payload = {userName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
