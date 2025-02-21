const { Web3 } = require('web3');
const { createPlayer, isExistPlayer } = require('../database');
const { sign } = require('jsonwebtoken');
const { getNonce } = require('../constants/utils');

const { TOKEN_SECRET_KEY, TOKEN_EXPIRES } = process.env;
const web3 = new Web3();

const login = async ({ body }, res) => {
  try {
    const { signature, nonce, address } = body;

    // Get an address by data
    const recoveredAddress = web3.eth.accounts.recover(nonce, signature);

    if (recoveredAddress !== address) {
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
    });

    return res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to login!' });
  }
};

const logout = async (_, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
    });

    return res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to logout!' });
  }
};

const nonce = (_, res) => {
  try {
    const randomNonce = getNonce();

    return res.status(200).send({ nonce: randomNonce });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate nonce!' });
  }
};

module.exports = { login, logout, nonce };
