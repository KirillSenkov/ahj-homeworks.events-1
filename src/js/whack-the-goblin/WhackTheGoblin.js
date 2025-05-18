import './whack-the-goblin.css';
import BattleField from './BattleField.js';
import logger from './logger.js'

const module = 'WhackTheGoblin';

export default class WhackTheGoblin {
	static startWhacking(warpSeconds) {
		const { body } = document;
		const battleField = new BattleField();

		body.append(battleField.get());
		WhackTheGoblin.warpLoop(battleField, warpSeconds);
	}

	static warpLoop(battleField, warpSeconds) {
		logger.log(`NEW WhackTheGoblin.warpLoop(${battleField}, ${warpSeconds}) started.`, module);
		const intervalID = setInterval(() => {
			battleField.holeWarp(intervalID, warpSeconds);
		}, warpSeconds * 1000);
	}
}
