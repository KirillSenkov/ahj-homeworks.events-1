import WhackTheGoblin from './WhackTheGoblin.js';
import ScoreBoard from './ScoreBoard.js';
import logger from './logger.js'

const module = 'BattleField';

export default class BattleField {
    #container;
    #field;
    #holeNum;
    #continue = true;
    #scoreBoard;
    #warpCount = 0;
    #isGoblinGone = false;

	constructor() {
		this.#container = this.#makeContainer();
        this.#field = this.#container.children;
	}

    get() { return this.#container; };

    start(warpSeconds) {
        this.#scoreBoard.reset();
        this.#continue = true;
        this.#isGoblinGone = false;
        WhackTheGoblin.warpLoop(this, warpSeconds);
    }

    stop() {
        this.#continue = false;
        this.#holeNum = false;
        this.#warpCount = 0;
    };

    #askUserIfProceed() {
        const leader = this.#scoreBoard.getLeader();
        let text;

        switch (leader) {
            case 'even':
                text = 'Ничья.\n\n';
                break;
            case 'player':
                text = 'Вы победили!\n\n';
                break;
            case 'goblin':
                text = 'Вы проиграли, сударь.\nВы неудачник.\n\n';
                break;
            default:
                text = '? я чото п\n\n';
        }
        
        // поленился потратить 10 минут на рисование кастомных кнопок.
        // пришлось потратить полчаса на гугленье и пробы, как лучше всего
        // дать браузеру время отрисовать финальное очко игры,
        // прежде чем confirm() прервёт поток выполнения
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const answer = confirm(text + 'Начать заново?');
                    resolve(answer);
                });
            });
        });
    }

    #gameOver() {
        const goodbyMsg = document.createElement('p');
               
        this.#container.remove();
        goodbyMsg.textContent = 'Have a nice day, sir.';
        goodbyMsg.classList.add('goodby');
        document.body.append(goodbyMsg);   
    }

    holeWarp(intervalID, warpSeconds) {
        this.#warpCount++;
        logger.log(`WARP №${this.#warpCount}: this.#holeNum = ${this.#holeNum}.`, module);

        if (this.#field[this.#holeNum]) {
                this.#field[this.#holeNum].classList.remove('goblin');
        }

        if (this.#isGoblinGone) { this.#scoreBoard.miss(); }

        if (this.#continue) {
            this.#holeNum = this.#getHoleNum(this.#holeNum);
            this.#field[this.#holeNum].classList.add('goblin');
        } else {
            clearInterval(intervalID);

            this.#askUserIfProceed()
                .then(userAnswer => {
                    if (userAnswer) {
                        this.start(warpSeconds)
                    } else {
                        this.#gameOver();
                    }
                 });
        }

    this.#isGoblinGone = true;
    }

    #goblinHit = function(event) {
        if (!event.target.matches('.goblin')) {
            return;
        }

        if (this.#isGoblinGone) {
            this.#isGoblinGone = false;
            this.#scoreBoard.hit();
            event.target.classList.add('mjolnir-bash');
            setTimeout(() => {
                event.target.classList.remove('goblin');
            }, 400);
            setTimeout(() => {
                event.target.classList.remove('mjolnir-bash');
            }, 700);
        }
    };

	#makeContainer() {
		const container = document.createElement('div');

		container.classList.add('container');
        container.addEventListener('click', this.#goblinHit.bind(this), true);

		for (let i = 0; i < 16; i++) {
			const hole = document.createElement('div');

			hole.classList.add('hole');
			container.append(hole);
		}

        this.#scoreBoard = new ScoreBoard(this);
        container.append(this.#scoreBoard.get());

		return container;
	}

    #getHoleNum(current, min = 0, max = 15) {
		let result = Math.floor(Math.random() * (max - min + 1)) + min;

		while (result === current) {
			result = Math.floor(Math.random() * (max - min + 1)) + min;
		}

		return result;
	}
}
