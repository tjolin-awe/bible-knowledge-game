import 'regenerator-runtime/runtime'
import Phaser, { AUTO } from 'phaser'


import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import Question from './scenes/Question'
import Login from './scenes/Login'
import AnswerScreen from './scenes/AnswerScreen'
import Title from './scenes/Title'
import Preloader from './scenes/Preloader'
import Story from './scenes/Story'
import Settings from './scenes/Settings'
import Attribution from './scenes/Attribution'
import GameConnection from './scenes/GameConnection'
import LevelSelect from './scenes/LevelSelect'
import Restart from './scenes/Restart'
import LevelComplete from './scenes/LevelComplete'

let width = 1280
let height = 800
if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	width = 640
	height = 960	
 }

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	}, 
	scale: {
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.Scale.CENTER_BOTH,
	   width: width,
	   height: height
    },
	scene: [Bootstrap, Preloader, Title, Settings, Attribution, GameConnection, Login, Story, LevelSelect, Game, Question, AnswerScreen, GameOver, Restart, LevelComplete]

	}
	
export default new Phaser.Game(config)

