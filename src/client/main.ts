import 'regenerator-runtime/runtime'
import Phaser from 'phaser'


import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import Question from './scenes/Question'
import Login from './scenes/Login'
import AnswerScreen from './scenes/AnswerScreen'
import Title from './scenes/Title'



const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width:  1280,
	height:  800,

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	}, 
	scale: {
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.Scale.CENTER_BOTH
    },
	scene: [Bootstrap, Title, Login, Game, Question, AnswerScreen, GameOver]

}

export default new Phaser.Game(config)
