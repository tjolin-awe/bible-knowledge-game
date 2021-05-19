import 'regenerator-runtime/runtime'
import Phaser from 'phaser'

import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import Question from './scenes/Question'
import Login from './scenes/Login'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import AnswerScreen from './scenes/AnswerScreen'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800, // window.innerWidth * window.devicePixelRatio,
	height: 600, //  window.innerHeight * window.devicePixelRatio,

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	}, 
    parent: 'phaser-container',
	dom: {
        createContainer: true
    },
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    },  
	scene: [Bootstrap, Login, Game, Question, AnswerScreen, GameOver]

}

export default new Phaser.Game(config)
