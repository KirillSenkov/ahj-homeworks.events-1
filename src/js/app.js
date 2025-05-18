import '../css/style.css';
import WhackTheGoblin from './whack-the-goblin/WhackTheGoblin.js';
import logger from './whack-the-goblin/logger.js'

const warpSeconds = 2;
const module = 'app';

document.addEventListener('DOMContentLoaded', () => {
	logger.log(`BEFORE WhackTheGoblin.startWhacking(${warpSeconds});`, module);
	WhackTheGoblin.startWhacking(warpSeconds);
	logger.log(`AFTER WhackTheGoblin.startWhacking(${warpSeconds});`, module);
});
