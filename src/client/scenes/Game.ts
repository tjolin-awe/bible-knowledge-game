import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData, IGameWakeSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer } from '../../types/ITicTacToeState'
import Server from '../services/Server'
import { MapSchema } from '@colyseus/schema'
import { Cell, Player } from '../../server/TicTacToeState'
import { BKG, Button } from '../../types/BKG'
import Bootstrap from './Bootstrap'
import GetValue from 'phaser3-rex-plugins/plugins/utils/object/GetValue'

// add to top of file to help with typing
interface TrailToData {
	fromX: number
	fromY: number
	toX: number
	toY: number
	score: number
	display: Phaser.GameObjects.Text
}
export default class Game extends Phaser.Scene {
	private server?: Server
	private onGameOver?: (data: IGameOverSceneData) => void

	private turnText?: Phaser.GameObjects.Text
	private player1score?: Phaser.GameObjects.Text
	private player2score?: Phaser.GameObjects.Text

	private lastSquare?: Phaser.GameObjects.Image
	private waitMessage?: Phaser.GameObjects.Text

	private arrow?: Phaser.GameObjects.Image
	private cells: { display: Phaser.GameObjects.Image, value: ICell, text: Phaser.GameObjects.Text, score: number }[] = []
	private player1img!: Phaser.GameObjects.Image
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
	private correcteffect?: Phaser.GameObjects.Particles.ParticleEmitter
	private wrongeffect?: Phaser.GameObjects.Particles.ParticleEmitter
	private player2img?: Phaser.GameObjects.Image
	private multiplayer: boolean = false
	private screenGameoverGroup?: Phaser.GameObjects.Group
	private screenGameoverBg?: Phaser.GameObjects.Image
	private screenGameoverText?: Phaser.GameObjects.Text
	private screenGameoverBack?: Button
	private screenGameoverRestart?: Button
	private screenGameoverScore?: Phaser.GameObjects.Text
	private player1DisplayGroup?: Phaser.GameObjects.Group
	private level?: string
	private player1Nametag?: Phaser.GameObjects.Image
	private animationPlayer = false
	private stopcurrentaction: boolean = false
	private lastAmount: number = 0
	private answersound?: Phaser.Sound.BaseSound
	private player1name?: Phaser.GameObjects.Text
	private player2DisplayGroup?: Phaser.GameObjects.Group
	private player2Nametag?: Phaser.GameObjects.Image
	private player2name?: Phaser.GameObjects.Text
	private homebtn?: Button
	private settingsbtn?: Button
	private fontTitle!: { font: string; fill: string; stroke: string; strokeThickness: number }
	private screenPausedGroup?: Phaser.GameObjects.Group
	private screenPausedBg?: Phaser.GameObjects.Sprite
	private screenPausedText?: Phaser.GameObjects.Text
	private screenPausedBack: any
	private screenPausedContinue?: Button
	private _gamePaused: any
	private screenPausedMessage?: Phaser.GameObjects.Text

	private handleCollectMoney(obj1: Phaser.GameObjects.Image, obj2: Phaser.GameObjects.Text, score: number) {

		BKG.Sfx.play('correct_answer')
		this.events.emit('trail-to', {
			fromX: obj1.x,
			fromY: obj1.y,
			toX: obj2.x + obj2.width * 0.5,
			toY: obj2.y + obj2.height * 0.5,
			score: score,
			display: obj2

		})


	}

	private blockId?: number = 0

	private createAnswerEffect() {
		const particles = this.add.particles('star')

		this.events.on('trail-to', (data: TrailToData) => {

			const trail = particles.createEmitter({
				x: data.fromX,
				y: data.fromY,
				quantity: 5,
				speed: { random: [50, 100] },
				lifespan: { random: [200, 400] },
				scale: { random: true, start: 1, end: 0 },
				rotate: { random: true, start: 0, end: 180 },
				angle: { random: true, start: 0, end: 270 },
				blendMode: 'ADD'
			})

			const xVals = [data.fromX, BKG.world.centerX + 100, BKG.world.centerX - 100, data.toX]
			const yVals = [data.fromY, BKG.world.centerY + 100, BKG.world.centerY - 100, data.toY]

			this.tweens.addCounter({
				from: 0,
				to: 1,
				ease: Phaser.Math.Easing.Sine.InOut,
				duration: 1000,
				onUpdate: tween => {
					const v = tween.getValue()
					const x = Phaser.Math.Interpolation.CatmullRom(xVals, v)
					const y = Phaser.Math.Interpolation.CatmullRom(yVals, v)

					trail.setPosition(x, y)
				},
				onComplete: () => {
					trail.explode(50, data.toX, data.toY)
					trail.stop()


					data.display.setText(data.score.toString())
					data.display?.setColor(data.score >= 0 ? 'white' : 'red')
					this.time.delayedCall(1000, () => {
						particles.removeEmitter(trail)
					})

					this.tweens.add({ targets: data.display, duration: 1000, scale: 1.3, ease: 'Sine.easeInOut', yoyo: true });

					this.displayPlayers(true)
				}
			})
		})
	}

	constructor() {
		super('game')
	}

	init() {
		this.cells = []

		this.events.on('wake', (sys: Phaser.Scenes.Systems, data: IGameWakeSceneData) => {


			this.server?.playerReady(this.server?.playerId)
			if (data === undefined)
				return

			let { correct, answering_player, score, answered } = data

			console.log(correct)
			if (!answered && !this.multiplayer) {
				this.stateGameover()
				return
			}

			if (correct == true) {


				let scorelabel = answering_player == this.server?.playerId ? this.player1score : this.player2score


				if (this.lastSquare && scorelabel)
					this.handleCollectMoney(this.lastSquare, scorelabel, score)
			}
			else {
				if (this.multiplayer == false) {
					this.stateGameover()
					return
				} else {
					this.displayPlayers(true)

				}
			}

			//this.displayPlayers(true)

		})

	}







	create(data: IGameSceneData) {


		BKG.Sfx.sounds['correct_answer'] = this.sound.add('correct_answer');
		//this.answersound = this.sound.add('correct_answer')

		BKG.Sfx.sounds['choose-square'] = this.sound.add('choose')


		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {


				this.stopcurrentaction = false;
				this.scene.setActive(true)
				this.scene.stop('question')
				this.scene.stop('answer')

				if (this.scene.isSleeping('game')) {
					this.scene.wake('game')
					this.server?.playerReady(this.server?.playerId)
				}



			} else {

				this.stopcurrentaction = true;

			}
		})



		this.cells = []


		this.lights.enable();
		this.lights.setAmbientColor(0x808080);

		var spotlight = this.lights.addLight(400, 300, 280).setIntensity(3);

		this.input.on('pointermove', function (pointer: { x: number; y: number }) {

			spotlight.x = pointer.x;
			spotlight.y = pointer.y;

		});




		const { server, onGameOver, currentcells, level, multiplayer } = data


		this.multiplayer = multiplayer
		this.server = server
		this.level = level

		if (!this.server) {
			throw new Error('server instance missing')
		}
		this.server.onGameStateChanged(this.handleGameStateChanged, this)
		this.server.onPlayersReady(this.handlePlayersReady, this)
		this.server.onceStateChanged(this.createBoard, this)
		this.onGameOver = onGameOver




		let name = BKG.Storage.get('BKG-player')



		this.server.join(name, level, multiplayer)

	}

	private createBoard(state: ITicTacToeState) {




		this.fontTitle = { font: '32px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }


		if (this.game.device.os.desktop) {
			this.add.image(0, 0, 'background2').setDisplaySize(BKG.world.width, BKG.world.height).setOrigin(0)

		} else {
			this.add.image(-120, 0, 'background2').setDisplaySize(BKG.world.width + 250, BKG.world.height).setOrigin(0)
		}
		let notification = this.add.image(BKG.world.centerX, 10, 'notification')
		let message = this.multiplayer ? 'Waiting for another player' : 'Bible Knowledge Game'
		this.turnText = this.add.text(BKG.world.centerX, 30, message, this.fontTitle)
			.setOrigin(0.5).setWordWrapWidth(notification.width - 20)




		this.homebtn = this.game.device.os.desktop
			? new Button(BKG.world.width - 50, BKG.world.height / 4, 'button-pause', this.managePause, this, false).setOrigin(0.5)
			: new Button(50, BKG.world.height - 100, 'button-pause', this.managePause, this, false).setOrigin(0.5)


		this.homebtn.on('pointerover', () => {
			this.tweens.add({ targets: this.homebtn, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' })

		}).on('pointerout', () => {
			this.tweens.add({ targets: this.homebtn, duration: 500, scale: 1, ease: 'Sine.easeInOut' })

		})

		this.settingsbtn = this.game.device.os.desktop
			? new Button(BKG.world.width - 50, BKG.world.height / 4 + this.homebtn.height * 1.5, 'button-settings', this.clickSettings, this, false).setOrigin(0.5).setScale(0.9)
			: new Button(50 + this.homebtn.width * 1.5, BKG.world.height - 100, 'button-settings', this.clickSettings, this, false).setOrigin(0.5).setScale(0.9)


		this.settingsbtn.on('pointerover', () => {
			this.tweens.add({ targets: this.settingsbtn, duration: 500, scale: 1.1, ease: 'Sine.easeInOut' })

		}).on('pointerout', () => {
			this.tweens.add({ targets: this.settingsbtn, duration: 500, scale: 0.9, ease: 'Sine.easeInOut' })

		})


		this.createPlayerIcons()
		this.tweens.add({ targets: this.turnText, duration: 1000, scale: 1.05, ease: 'Sine.easeInOut', yoyo: true, loop: -1 });

		const { width, height } = this.scale

		let sizex = 0
		let sizey = 0
		if (this.sys.game.device.os.desktop) {
			sizex = 180
			sizey = 120

		} else {
			sizex = 130//  180
			sizey = 130// 120
		}

		let x = this.game.device.os.desktop ? 1 : 0
		let y = 1
		let squareval = 0
		var fontSquares = { font: '42px ' + BKG.text['GAMEFONT'], fill: '#cd934a', stroke: 'black', strokeThickness: 6 }
		var fontCategories = { font: '24px ' + BKG.text['GAMEFONT'], fill: 'white', stroke: 'black', strokeThickness: 4 }


		state.categories.forEach((category, idx) => {


			let cellposx = x * sizex + sizex / 2
			let cellposy = y * sizey + sizey / 2 + 12

			if (x == 0)
				cellposx -= 1

			const catsquare = this.add.image(cellposx, cellposy, 'header').setOrigin(0.5, 0.5).setDisplaySize(sizex - 5, sizey - 5)
			let category_text = this.add.text(cellposx, cellposy, category.title, fontCategories)
				.setWordWrapWidth(sizex - 10).setAlign('left').setOrigin(0.5)

			x++
		})

		x = this.game.device.os.desktop ? 1 : 0
		y++

		state.board.forEach((cellState, idx) => {

			let cellposx = x * sizex + sizex / 2
			let cellposy = y * sizey + sizey / 2 + 12

			if (x == 0)
				cellposx -= 1

			const cell = this.add.image(cellposx, cellposy, 'square').setOrigin(0.5, 0.5).setDisplaySize(sizex - 5, sizey - 5)
			let text = this.add.text(cellposx, cellposy, '', fontSquares)


			this.cells.push({
				display: cell,
				value: cellState,
				text: text,
				score: 0

			})

			if (this.cells[Number.parseInt(idx)].value.result === true) {

				cell.setVisible(false)
				this.cells[Number.parseInt(idx)].text.setVisible(false)

			}
			else {

				/* if (cellState.type == 0) {
					cell.setTexture('header')
					text.setText(cellState.category)

					text.setWordWrapWidth(sizex - 10).setAlign('left').setOrigin(0.5)

				} */
				//else {
				cell.setTexture('square')
				text.setOrigin(0.5)
				text.setText('$' + (cellState.value).toString())
				text.setPipeline('Light2D')
				text.setInteractive({ useHandCursor: true }).on('pointerover', () => {

					cell.setTexture('header')
					text.setFontSize(48)
				})
				text.setInteractive().on('pointerout', function () {

					cell.setTexture('square')
					text.setFontSize(42)
				}).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {




					let turn = this.server?.makeSelection(Number.parseInt(idx))
					BKG.Sfx.play('choose')

					if (turn?.result == false) {

						this.waitMessage?.setPosition(BKG.world.centerX, 0)
						this.waitMessage?.setText(turn.message)
						this.waitMessage?.setVisible(true)
						this.server?.playerReady(this.server?.playerId)

						var _this = this
						var tween = this.tweens.add({
							targets: this.waitMessage,
							y: BKG.world.centerY,
							ease: 'Bounce',
							duration: 2000,
							yoyo: false,
							repeat: 0,
							onStart: function () { },
							onComplete: function () { _this.waitMessage?.setVisible(false).setPosition(BKG.world.centerX, 0) },
							onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
							onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
						});
					}

				})



				this.cells[Number.parseInt(idx)].text = text
				this.cells[Number.parseInt(idx)].score = squareval
				//	}
			}

			x++

			if (this.game.device.os.desktop) {
				if (x > 5) {
					x = 1
					y++
				}
			} else {
				if (x > 4) {
					x = 0
					y++
				}
			}

		})



		if (this.multiplayer) {
			this.time.delayedCall(500, () => {
				if (this.server?.players) {
					if (this.server.players.size > 1) {
						this.handleGameStateChanged(GameState.Playing)

					}
					else {
						this.turnText?.setText('Waiting for another player')
					}
				}
			})
		} else {
			this.time.delayedCall(1000, () => {

				this.turnText?.setText('Bible Knowledge Game')
				this.handleGameStateChanged(GameState.Playing)

			})
		}

		this.waitMessage = this.add.text(BKG.world.centerX, 0, 'Not your turn yet').setFontSize(72).setFontFamily('impact').setVisible(false).setOrigin(0.5).setShadow(2, 2, 'black', 2, true)
		this.server?.onBoardChanged(this.handleBoardChanged, this)
		this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this)
		this.server?.onPlayerWon(this.handlePlayerWon, this)


		this.createAnswerEffect()





		var fontScoreWhite = { font: '38px ' + BKG.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };


		if (this.server) {
			let player = this.server.players?.get(this.server.playerId)



			this.screenPausedGroup = this.add.group();
			this.screenPausedBg = this.add.sprite(0, 0, 'overlay').setDisplaySize(BKG.world.width, BKG.world.height)

			this.screenPausedBg.setAlpha(0.95);
			this.screenPausedBg.setOrigin(0, 0);
			this.screenPausedText = this.add.text(BKG.world.centerX, 100, BKG.text['gameplay-paused'], this.fontTitle);
			this.screenPausedText.setOrigin(0.5, 0);
			this.screenPausedMessage = this.add.text(BKG.world.centerX, 300, 'What would you like to do?', fontScoreWhite).setWordWrapWidth(BKG.world.width - 60).setAlign('center')
			this.screenPausedMessage.setOrigin(0.5, 0.5);
			this.screenPausedBack = new Button(100, BKG.world.height - 100, 'button-mainmenu', this.stateBack, this);
			this.screenPausedBack.setOrigin(0, 1);
			this.screenPausedContinue = new Button(BKG.world.width - 100, BKG.world.height - 100, 'button-continue', this.managePause, this);
			this.screenPausedContinue.setOrigin(0, 1);
			this.screenPausedGroup.add(this.screenPausedBg);
			this.screenPausedGroup.add(this.screenPausedText);
			this.screenPausedGroup.add(this.screenPausedMessage);
			this.screenPausedGroup.add(this.screenPausedBack);
			this.screenPausedGroup.add(this.screenPausedContinue);
			this.screenPausedGroup.toggleVisible();

			this.screenGameoverGroup = this.add.group();
			this.screenGameoverBg = this.add.sprite(0, 0, 'overlay').setDisplaySize(BKG.world.width, BKG.world.height)
			this.screenGameoverBg.setAlpha(0.95);
			this.screenGameoverBg.setOrigin(0, 0);
			this.screenGameoverText = this.add.text(BKG.world.centerX, 100, BKG.text['gameplay-gameover'], this.fontTitle);
			this.screenGameoverText.setOrigin(0.5, 0);
			this.screenGameoverBack = new Button(100, BKG.world.height - 100, 'button-mainmenu', this.stateBack, this);
			this.screenGameoverBack.setOrigin(0, 1);
			this.screenGameoverRestart = new Button(BKG.world.width - 100, BKG.world.height - 100, 'button-restart', this.stateRestart, this);
			this.screenGameoverRestart.setOrigin(1, 1);
			this.screenGameoverScore = this.add.text(BKG.world.centerX, 300, 'Oops, you got one wrong. You must nswer all questions correctly in order to reach the next level', fontScoreWhite).setWordWrapWidth(BKG.world.width - 60).setAlign('center')
			this.screenGameoverScore.setOrigin(0.5, 0.5);
			this.screenGameoverGroup.add(this.screenGameoverBg);
			this.screenGameoverGroup.add(this.screenGameoverText);
			this.screenGameoverGroup.add(this.screenGameoverBack);
			this.screenGameoverGroup.add(this.screenGameoverRestart);
			this.screenGameoverGroup.add(this.screenGameoverScore);
			this.screenGameoverGroup.toggleVisible();
		}

		this.cameras.main.fadeIn(2000, 0, 0, 0)


	}
	managePause() {
		this._gamePaused = !this._gamePaused;

		BKG.Sfx.play('click');
		if (this._gamePaused) {

			this.homebtn!.input.enabled = false
			this.settingsbtn!.input.enabled = false

			this.cells.forEach((value: { text: Phaser.GameObjects.Text }) => {

				value.text.input.enabled = false

			})


			this.screenPausedGroup?.setVisible(true)
			this.screenPausedBack.x = -this.screenPausedBack.width - 20;
			this.tweens.add({ targets: this.screenPausedBack, x: 100, duration: 500, delay: 250, ease: 'Back' });
			this.screenPausedContinue!.x = BKG.world.width + this.screenPausedContinue!.width + 20;
			this.tweens.add({ targets: this.screenPausedContinue, x: BKG.world.width - 250, duration: 500, delay: 250, ease: 'Back' });
		}
		else {
			this.homebtn!.input.enabled = true
			this.settingsbtn!.input.enabled = true

			this.cells.forEach((value: { text: Phaser.GameObjects.Text }) => {

				value.text.input.enabled = true
			})
			this.screenPausedBack.x = 100;
			this.tweens.add({ targets: this.screenPausedBack, x: -this.screenPausedBack.width - 20, duration: 500, ease: 'Back' });
			this.screenPausedContinue!.x = BKG.world.width - 100;
			this.tweens.add({ targets: this.screenPausedContinue, x: BKG.world.width + this.screenPausedContinue!.width + 20, duration: 500, ease: 'Back' });
			this.screenPausedGroup?.setVisible(false)
		}
	}
	private clickSettings: () => void
		= () => {

			this.scene.sleep()
			this.scene.launch('settings', { screen: 'game' })
		}

	private clickHome: () => void
		= () => {

			if (!this.onGameOver) {
				return
			}




			this.scene.sleep()
			this.scene.launch('restart', { winner: false, onGameOver: this.onGameOver, server: this.server })


		}

	private displayPlayers(effect: boolean) {

		if (!this.server || !this.server?.players)
			return


		if (this.server?.playerId == '')
			return

		this.server.players?.forEach((player: Player, key: string) => {

			let playerscore = this.server?.playerId == player.id ? this.player1score : this.player2score
			playerscore?.setText(player.score.toString())
			playerscore?.setColor(player.score < 0 ? 'red' : 'white')
		})

		let x, y = 0
		if (this.multiplayer == true) {


			if (this.server.activePlayer === this.server?.playerId) {

				this.turnText?.setText("It's your turn!")

				if (this.player1img) {
					x = this.player1img.x - this.player1img.width / 2
					y = this.player1img.y - this.player1img.height / 2
				}
			}
			else {
				this.turnText?.setText("It's your opponents turn")

				if (this.player2img) {
					x = this.player2img.x - this.player2img.width / 2
					y = this.player2img.y - this.player2img.height / 2
				}

			}
		}
		else {
			this.turnText?.setText('Bible Knowledge Game')
			if (this.player1img) {
				x = this.player1img.x - this.player1img.width / 2
				y = this.player1img.y - this.player1img.height / 2
			}
		}
		this.emitter?.setPosition(x, y)
	}

	private handleBoardChanged(newValue: Cell, idx: string, players: MapSchema<IPlayer>) {



		if (idx === undefined || this._gamePaused)
			return


		console.log('unlock stop effect')

		const cell = this.cells[idx]
		this.lastSquare = cell.display
		//this.displayPlayers()

		if (cell.value.result !== newValue.result) {
			if (newValue.result) {
				var particles = this.add.particles('green').setPosition(cell.display.x + 120 / 2, cell.display.y + 60 / 2)

				var emitter = particles.createEmitter({
					speed: 100,
					lifespan: 2000,
					scale: { start: 1, end: 0 },
					blendMode: 'ADD'
				})


				emitter.stop()
				//cell.display.setVisible(false)
				this.cells[idx].text.setVisible(false)

				if (this.stopcurrentaction == false) {



					this.scene.sleep()
					this.scene.launch('question', { server: this.server, question: cell.value.question, image: newValue.image, answers: newValue.answers, category: newValue.category, amount: newValue.value })

				} else {
					this.stopcurrentaction = false


				}


			}

			cell.value = newValue
			this.cells[idx].text.setVisible(false)

			//this.displayPlayers()
		}
	}


	private handlePlayerTurnChanged(playerIndex: number, players: MapSchema<IPlayer>) {
		//this.displayPlayers(false)
	}

	private locked: boolean = false
	private handlePlayersReady(ready: boolean) {


		this.locked = !ready




	}
	private handlePlayerWon(playerId: string) {

		this.time.delayedCall(1000, () => {
			if (!this.onGameOver) {
				return
			}

			if (this.server) {
				this.onGameOver({
					winningPlayerId: playerId,
					winner: playerId == this.server?.playerId,
					playerReset: false,
					server: this.server,
					multiplayer: this.multiplayer
				})
			}
		})
	}

	private createPlayerIcons() {

		let col1 = 60
		let col2 = this.game.scale.width - col1

		if (this.emitter)
			this.emitter.stop()

		var particles = this.add.particles('flares')

		var fontScore = { font: '32px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 4 }

		this.player1DisplayGroup = this.add.group()
		this.player1Nametag = this.add.image(col1, 120, 'nametag').setOrigin(0.5).setAlpha(0.7)

		this.player1img = this.add.image(col1, 50, 'player').setOrigin(0.5, 0.5).setAlpha(0.7)
		this.player1score = this.add.text(60, 115, '0', fontScore).setOrigin(0.5)
		this.player1name = this.add.text(col1, 80, BKG.Storage.get('BKG-player'), fontScore).setOrigin(0.5, 0.5)
		var shape3 = new Phaser.Geom.Rectangle(0, 0, this.player1img.width, this.player1img.height)
		this.player1DisplayGroup.add(this.player1Nametag)
		this.player1DisplayGroup.add(this.player1img)
		this.player1DisplayGroup.add(this.player1score)
		this.player1DisplayGroup.add(this.player1name)

		this.player2DisplayGroup = this.add.group()
		this.player2Nametag = this.add.image(col2, 120, 'nametag').setOrigin(0.5).setAlpha(0.7)
		this.player2img = this.add.image(col2, 50, 'player').setOrigin(0.5, 0.5).setAlpha(0.7)
		this.player2score = this.add.text(col2, 115, '0', fontScore).setOrigin(0.5)
		this.player2name = this.add.text(col2, 80, '', fontScore).setOrigin(0.5)

		this.player2DisplayGroup.add(this.player2Nametag)
		this.player2DisplayGroup.add(this.player2img)
		this.player2DisplayGroup.add(this.player2score)
		this.player2DisplayGroup.add(this.player2name)
		this.player2DisplayGroup.setVisible(false)

		this.emitter = particles.createEmitter({
			frame: { frames: ['red', 'green', 'blue'], cycle: true },
			x: this.player1img.x - this.player1img.width / 2,
			y: this.player1img.y - this.player1img.height / 2,
			scale: { start: 0.5, end: 0 },


			blendMode: 'ADD',
			emitZone: { type: 'random', source: shape3, quantity: 42, yoyo: false }
		})

	}

	private handleGameStateChanged(state: GameState) {


		if (state === GameState.Playing) {


			if (!this.server)
				return
			if (!this.server.players)
				return

			// The game has begun create and display the player names and scores
			if (this.multiplayer) {


				this.server.players.forEach((value: IPlayer, key: string) => {

					if (key !== this.server?.playerId) {

						this.player1name?.setText(value.name)
						this.player1score?.setText(value.score.toString())
						this.player2DisplayGroup?.setVisible(true)
					}
				})

			}
			this.displayPlayers(false)
		}
	}
	stateRestart() {
		BKG.Sfx.play('click');

		this.server?.leave()
		this.server = new Server()

		this.scene.stop()
		this.scene.start('game', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
			level: this.level,
			multiplayer: false
		})

	}
	stateBack() {


		BKG.Sfx.play('click');
		this.scene.stop()


		this.server?.leave()
		this.server = new Server()
		this.scene.start('levelselect', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
			multiplayer: false
		})

	}
	stateGameover() {

		this.homebtn!.input.enabled = false
		this.settingsbtn!.input.enabled = false

		this.cells.forEach((value: { text: Phaser.GameObjects.Text }) => {

			value.text.input.enabled = false

		})

		//EPT.Storage.setHighscore('EPT-highscore',this._score);
		BKG.fadeOutIn(function (self) {
			self.screenGameoverGroup.setVisible(true);
			//self.buttonPause.input.enabled = false;
			//self.buttonDummy.input.enabled = false;
			//self.screenGameoverScore.setText();
			//this.gameoverScoreTween();
		}, this);

		if (this.screenGameoverBack && this.screenGameoverRestart) {
			this.screenGameoverBack.x = -this.screenGameoverBack.width - 20;
			this.tweens.add({ targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back' });
			this.screenGameoverRestart.x = BKG.world.width + this.screenGameoverRestart.width + 20;
			this.tweens.add({ targets: this.screenGameoverRestart, x: BKG.world.width - 100, duration: 500, delay: 250, ease: 'Back' });
		}
	}
}