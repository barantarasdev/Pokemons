import detectEthereumProvider from '@metamask/detect-provider';

class MetaMaskProvider {
  constructor() {
    this.provider = null;
  }

  async init() {
    this.provider = await detectEthereumProvider();
  }

  #setup() {
    const provider = this.provider;

    if (!provider || provider !== window.ethereum) {
      alert('Please install MetaMask!');
    }
  }

  async #getAddress() {
    const accounts = await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          alert('Please connect to MetaMask!');
        } else {
          alert(err);
        }
      });

    return accounts[0];
  }

  async getSignature(nonce) {
    this.#setup();

    try {
      const address = await this.#getAddress();
      const signature = await this.provider.request({
        method: 'personal_sign',
        params: [nonce, address],
      });

      return { signature, address };
    } catch (err) {
      alert(err);
    }
  }
}

const metamaskProvider = new MetaMaskProvider();
metamaskProvider.init();

export default metamaskProvider;
