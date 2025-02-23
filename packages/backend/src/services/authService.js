const { Web3 } = require('web3');
const { createPlayer, isExistPlayer } = require('../database');
const { sign } = require('jsonwebtoken');
const { getNonce } = require('../constants/utils');

const { TOKEN_SECRET_KEY, TOKEN_EXPIRES } = process.env;
const web3 = new Web3();

class Auth {
  constructor() {}

  async login({ body }, res) {
    try {
      const { signature, nonce, address } = body;

      // Get an address by data
      const recoveredAddress = web3.eth.accounts.recover(nonce, signature);

      if (
        recoveredAddress.toLocaleLowerCase() !== address.toLocaleLowerCase()
      ) {
        return res.status(401).send({ error: 'Address is not valid!' });
      }

      // Create a new token
      const token = sign({ address }, TOKEN_SECRET_KEY, {
        expiresIn: TOKEN_EXPIRES,
      });

      // Player does exist
      const isPlayer = await isExistPlayer(address);

      if (!isPlayer) {
        await createPlayer({ address });
      }

      // Send a token by httpOnly cookies
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: Boolean(process.env.NODE_ENV === 'production'),
      });

      return res.status(200).send({ message: 'Login successful' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to login!' });
    }
  }

  async logout(_, res) {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: Boolean(process.env.NODE_ENV === 'production'),
      });

      return res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to logout!' });
    }
  }

  async nonce(_, res) {
    try {
      const randomNonce = getNonce();

      return res.status(200).send({ nonce: randomNonce });
    } catch (error) {
      res.status(500).send({ error: 'Failed to generate nonce!' });
    }
  }
}

module.exports = new Auth();
