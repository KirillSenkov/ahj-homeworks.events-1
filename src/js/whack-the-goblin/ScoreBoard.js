import logger from './logger.js'

const module = 'ScoreBoard';
const scoreLimit = 5;

export default class ScoreBoard {
    #battleField;
    #board = document.createElement('div');
    #player = document.createElement('div');
    #goblin = document.createElement('div');

    constructor(battleField) {
        this.#battleField = battleField;
		this.#board.classList.add('score-board');
		this.#board.insertAdjacentText('afterbegin', 'Player');
        this.#board.insertAdjacentElement('beforeend', this.#player);
        this.#board.insertAdjacentText('beforeend', 'Goblin');
        this.#board.insertAdjacentElement('beforeend', this.#goblin);
        this.#player.textContent = 0;
        this.#goblin.textContent = 0;
    }

    get() { return this.#board; }

    hit() {
        this.#player.textContent++;
        if (this.#player.textContent == scoreLimit) {
            this.#battleField.stop();
        }
    }

    miss() {
        this.#goblin.textContent++;
        if (this.#goblin.textContent == scoreLimit) {
            this.#battleField.stop();
        }
    }

    reset() {
        this.#player.textContent = this.#goblin.textContent = '0';
    }

    getLeader() {
        const maxScore = Math.max(Number(this.#player.textContent), Number(this.#goblin.textContent));

        if (Number(this.#player.textContent) === maxScore && Number(this.#goblin.textContent) === maxScore) {
            logger.log('getLeader() return even', module);
            return 'even';
        } else if (Number(this.#player.textContent) === maxScore) {
            logger.log('getLeader() return player', module);
            return 'player';
        } else if (Number(this.#goblin.textContent) === maxScore) {
            logger.log('getLeader() return goblin', module);
            return 'goblin';
        } else {
            logger.log('getLeader() return what?', module);
            return 'what?';
        }
    }
}