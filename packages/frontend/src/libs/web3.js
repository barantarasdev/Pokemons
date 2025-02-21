import Web3 from 'web3';

let web3Instance = null;

export const getWeb3 = () => {
  if (!web3Instance) {
    const eth = window.ethereum;

    if (eth) {
      web3Instance = new Web3(eth);
    } else {
      throw new Error('MetaMask does not exist!');
    }
  }

  return web3Instance;
};

export const getAddress = async () => {
  const web3 = getWeb3();
  const accounts = await web3.eth.getAccounts();

  if (!accounts.length) {
    throw new Error('No accounts found!');
  }

  return accounts[0];
};

export const getSignature = async (nonce) => {
  const web3 = getWeb3();
  const address = await getAddress();
  const signature = await web3.eth.personal.sign(nonce, address, '');

  if (!signature) {
    throw new Error('Signature not created!');
  }

  return { signature, address };
};
