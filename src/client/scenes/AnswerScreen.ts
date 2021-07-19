import Phaser from 'phaser'
import { Answer } from '../../server/TicTacToeState'
import { BKG } from '../../types/BKG'
import { IAnswerData } from '../../types/scenes'
import type Server from '../services/Server'

export default class AnswerScreen extends Phaser.Scene {

	/** The answer's picture */
	private picture?: Phaser.GameObjects.Image

	/** The container for the answer's picture */
	private container?: Phaser.GameObjects.Image

	/** The game service */
	private server?: Server

	/** Player's answer */
	private answer?: Answer
	private timeout?: boolean

	constructor() {
		super('answer')


	}

	init() {


		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
				this.server?.playerReady(this.server?.playerId)
				this.scene.stop()
			}
		})
	}

	create(data: IAnswerData) {

		let { server, question, image, answer, correctAnswer, timeout } = data
		this.server = server
		this.answer = answer
		this.timeout = timeout

		let fontAnswer = {
			font: '46px ' + BKG.text['GAMEFONT'],
			fill: 'white',
			stroke: 'black',
			strokeThickness: 6
		}

		let fontTitle = {
			font: '72px ' + BKG.text['FONT'],
			fill: 'white',
			stroke: 'black',
			strokeThickness: 16
		}

		// Make sure the game screen is sleeping [TODO]
		this.scene.sleep('game')

		// Set background
		this.add.image(0, 0, 'levelmodebg')
			.setOrigin(0)
			.setDisplaySize(BKG.world.width, BKG.world.height)

		// Create container for correct answer's picture
		this.container = this.add.image(BKG.world.centerX, BKG.world.height, 'level1').setOrigin(0.5)
		this.container.setPosition(BKG.world.centerX, BKG.world.height + this.container.height / 2)

		// ask the LoaderPlugin to load the answer's texture
	
		
		this.load.image(image,`assets/levels/${image}`)
		this.load.once(Phaser.Loader.Events.COMPLETE, () => {
			this.picture = this.add.image(BKG.world.centerX, BKG.world.centerY + 80, 'image')
				.setOrigin(0.5)
				.setVisible(false)
				.setTexture(image).setScale(1.1)

			let status = this.add.text(BKG.world.centerX, 60, '', fontTitle)
				.setOrigin(0.5)

			status.x = BKG.world.width + status.width + 20;
			this.tweens.add({
				targets: status,
				x: BKG.world.centerX,
				duration: 500,
				ease: 'Back'
			});

			if (timeout) {
				// If no one answered
				this.add.text(BKG.world.centerX, 130, 'The correct answer is ' + correctAnswer.name, fontAnswer)
					.setOrigin(0.5)
					.setFontStyle('bold')
					.setWordWrapWidth(BKG.world.width * 0.8)
					.setAlign('center')
			} else {

				// If a player answered
				if (answer.correct == false) {

					status.setColor('red')
						.setText('INCORRECT!')
					let w = this.add.text(BKG.world.centerX, 140, 'The correct answer is ' + correctAnswer.name, fontAnswer)
						.setOrigin(0.5)
						.setFontStyle('bold')
						.setWordWrapWidth(BKG.world.width * 0.8)
						.setAlign('center')

					w.y = -w.height + 20;
					this.tweens.add({
						targets: w,
						y: 140,
						duration: 500,
						ease: 'Back'
					})

				} else {

					status.setColor('green').setText('CORRECT')
					let a = this.add.text(BKG.world.centerX, 100, correctAnswer.name)
						.setFontFamily('swiss921')
						.setFontSize(48).setShadow(2, 2, 'black', 2, true)
						.setOrigin(0.5).setFontStyle('bold')
						.setWordWrapWidth(BKG.world.width * 0.8)
						.setAlign('center')

					a.y = -a.height + 20;
					this.tweens.add({ targets: a, y: 140, duration: 500, ease: 'Back' })
				}
			}

			var self = this
			this.tweens.add({
				targets: this.container,
				y: BKG.world.centerY + 50,
				ease: 'Power4',
				duration: 1000,
				yoyo: false,
				repeat: 0,
				onComplete: function () {

					self.picture?.setVisible(true)

				
							// slide the answer's picture off screen after 4 seconds
							self.time.delayedCall(4000, () => {
								if (self.picture && self.container) {
									self.tweens.add({
										targets: [self.picture, self.container],
										y: BKG.world.height + self.container?.height / 2,
										ease: 'Power4',
										duration: 1000,
										yoyo: false,
										repeat: 0,
									});
								}
								self.cameras.main.fadeOut(1000)
							})
						
					

				},
			})
		})



		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
			(cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {


					
					let playerkey = this.answer?.player

					if (playerkey == null)
						playerkey = ''
				
					this.scene.stop()
					this.scene.wake('game', {
						correct: timeout == false ? this.answer!.correct : false,
						answering_player: this.answer?.player,
						score: this.server?.players?.get(playerkey)?.score,
						answered: this.answer == null ? false : true
					
					})
				
			})

		// Start the loader plugin to load the correct answer's picture
		this.load.start()
	}
}