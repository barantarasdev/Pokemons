const { getRandomPokemon, getPokemonById } = require('../database');

class Arena {
  constructor() {}

  #getDamage({ level = 1, power = 1, attack, defense }) {
    const randomFactor = Math.random();

    if (randomFactor <= 0.01) {
      return 0;
    }

    return (
      ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
      randomFactor
    );
  }

  #getLog({ name = 'You', damage }) {
    if (damage === 0) {
      return `${name} missed the target`;
    }

    return `${name} took damage - ${damage}`;
  }

  #attack({ attack, defense, name }) {
    const damage = this.#getDamage({
      attack,
      defense,
    });
    const log = this.#getLog({
      damage,
      name,
    });

    return { damage, log };
  }

  async start(id) {
    const currentPokemon = await getPokemonById(id);
    const randomPokemon = await getRandomPokemon(currentPokemon.type);

    const response = {
      randomPokemon,
      opponent: null,
      isOpponentAttacker: false,
      isLoss: false,
    };

    if (Number(currentPokemon.base.Speed) < Number(randomPokemon.base.Speed)) {
      const attackResponse = this.#attack({
        attack: randomPokemon.base.Attack,
        defense: currentPokemon.base.Defense,
      });

      response.isOpponentAttacker = true;
      response.opponent = attackResponse;

      if (currentPokemon.base.HP - attackResponse.damage <= 0) {
        response.isLoss = true;
      }
    }

    return response;
  }

  startAttack({ me, opponent }) {
    const response = {
      me: null,
      opponent: null,
      isLoss: false,
      isWin: false,
    };

    const meAttackResponse = this.#attack({
      attack: me.attack,
      defense: opponent.defense,
      name: opponent.name,
    });

    if (opponent.hp - meAttackResponse.damage <= 0) {
      response.isWin = true;

      return response;
    }
    response.me = meAttackResponse;

    const opponentAttackResponse = this.#attack({
      attack: opponent.attack,
      defense: me.defense,
    });

    if (me.hp - opponentAttackResponse.damage <= 0) {
      response.isLoss = true;

      return response;
    }
    response.opponent = opponentAttackResponse;

    return response;
  }
}

module.exports = new Arena();
