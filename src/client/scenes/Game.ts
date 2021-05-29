import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer } from '../../types/ITicTacToeState'
import type Server from '../services/Server'
import {  MapSchema } from '@colyseus/schema'
import { Cell, Player } from '../../server/TicTacToeState'

// add to top of file to help with typing
interface TrailToData
{
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
	private player1img?: Phaser.GameObjects.Image
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
	private correcteffect?: Phaser.GameObjects.Particles.ParticleEmitter
	private wrongeffect?: Phaser.GameObjects.Particles.ParticleEmitter 
	private player2img?: Phaser.GameObjects.Image
	private multiplayer: boolean = false
	
	private stopEffect: boolean = false
	
	private handleCollectMoney(obj1: Phaser.GameObjects.Image, obj2: Phaser.GameObjects.Text, score: number)
	{
		
		console.log('emit trail')
		console.log(`x = ${obj2.x}`)
		this.events.emit('trail-to', {
		fromX: obj1.x,
		fromY: obj1.y,
		toX: obj2.x + obj2.width * 0.5,
		toY: obj2.y + obj2.height * 0.5,
		score: score,
		display: obj2

	})
	
		
	}

	private blockId?:number = 0
    
	private createAnswerEffect()
	{
		const particles = this.add.particles('star')

		this.events.on('trail-to', (data: TrailToData) => {
			
				const trail = particles.createEmitter({
					x: data.fromX,
					y: data.fromY,
					quantity: 5,
					speed: { random: [50, 100] },
					lifespan: { random: [200, 400]},
					scale: { random: true, start: 1, end: 0 },
					rotate: { random: true, start: 0, end: 180 },
					angle: { random: true, start: 0, end: 270 },
					blendMode: 'ADD'
				})
			
			let screenCenterX = this.game.scale.width / 2
			let screenCenterY = this.game.scale.height / 2
			const xVals = [data.fromX, screenCenterX + 100, screenCenterX - 100, data.toX]
			const yVals = [data.fromY, screenCenterY + 100, screenCenterY - 100, data.toY]
			
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
				}
			})
		})
	}

	constructor() {
		super('game')
	}

	init() {
		this.cells = []
	
	}


	preload() {


		this.load.image('player', 'assets/player.png')
		this.load.image('nametag', 'assets/nametag.png')
		this.load.image('square','assets/square.png')
		this.load.image('notification', 'assets/notification.png')
		this.load.image('star', 'assets/star.png')

	
	}


	private stopcurrentaction: boolean = false
	private lastAmount: number = 0
	async create(data: IGameSceneData) {

	
		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
				console.log("tab is active -game")


				this.stopcurrentaction = false;
				this.scene.setActive(true)
				this.scene.stop('question')
				this.scene.stop('answer')

				if (this.scene.isSleeping('game')) {
					this.scene.wake('game')
					this.server?.playerReady(this.server?.playerId)
				}



			} else {
				console.log("tab is inactive -game")

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



		const { server, onGameOver, currentcells, name, multiplayer } = data	

		this.multiplayer = multiplayer
		this.server = server

	
			if (!this.server) {
				throw new Error('server instance missing')
			}
			this.server.onGameStateChanged(this.handleGameStateChanged, this)
			this.server.onPlayersReady(this.handlePlayersReady, this)
			this.server.onceStateChanged(this.createBoard, this)
			this.onGameOver = onGameOver

		
		
		this.events.on('wake',(sys: Phaser.Scenes.Systems, data: any)=>{

			console.log('game onStart event START')
			if (!this.server)
				return

			this.time.delayedCall(200, ()=> {
				if (this.server?.playerId)
				{
				
					this.displayPlayers(true)
				}
			})
			this.server?.playerReady(this.server?.playerId)
			console.log('game onStart event END')
		})

		await this.server.join(name, multiplayer)

	}

	private createBoard(state: ITicTacToeState) {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		this.add.image(0, 0, 'background2').setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0)
	
		this.add.image(screenCenterX,10,'notification')
		this.turnText = this.add.text(screenCenterX, 30, 'Waiting for another player')
			.setOrigin(0.5).setFontFamily('Impact').setFontSize(32)

		const { width, height } = this.scale
		const sizex = 180
		const sizey = 120

		let x = 1
		let y = 1
		let squareval = 0

		state.board.forEach((cellState, idx) => {

			let cellposx = x  * sizex + sizex / 2 + 10
			let cellposy = y  * sizey + sizey / 2
			const cell = this.add.image(cellposx, cellposy,'square').setOrigin(0.5,0.5).setDisplaySize(sizex -10, sizey -10)
			let text = this.add.text(0, 0, '')

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
			
				if (cellState.type == 0) {
					cell.setTexture('header')
					text.setPosition(cellposx, cellposy)
					text.setText(cellState.category).setWordWrapWidth(sizex - 10)
						.setAlign('left').setOrigin(0.5)
						.setColor('white')
						.setFontSize(24)
						.setFontFamily('swiss921').setFontStyle('bold').setShadow(2, 2, 'black', 2, false, true)

				}
				else {
					cell.setTexture('square')
					text.setPosition(cellposx, cellposy).setOrigin(0.5)
					text.setText('$' + (cellState.value).toString())
						.setPipeline('Light2D').setColor('#cd934a').setFontSize(48).setFontFamily('swiss921').setFontStyle('bold').setShadow(2, 2, 'black', 2, true, true).setLineSpacing(0.5)
					text.setInteractive().on('pointerover', () => {

						cell.setTexture('header')
						text.setFontSize(50)
					})
					text.setInteractive().on('pointerout', function () {

						cell.setTexture('square')
						text.setFontSize(48)
					}).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {

					

						
							let turn = this.server?.makeSelection(Number.parseInt(idx))
							console.log(turn)
							if (turn?.result == false) {
						
							this.waitMessage?.setPosition(screenCenterX,0)
							this.waitMessage?.setText(turn.message)
							this.waitMessage?.setVisible(true)
							
							var _this = this
							var tween = this.tweens.add({
								targets: this.waitMessage,
								y: screenCenterY,
								ease: 'Bounce',
								duration: 2000,
								yoyo: false,
								repeat: 0,
								onStart: function () { },
								onComplete: function () { _this.waitMessage?.setVisible(false).setPosition(screenCenterX,0) },
								onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
								onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
							});
						}
					
					})

				

					this.cells[Number.parseInt(idx)].text = text
					this.cells[Number.parseInt(idx)].score = squareval
				}
			}

			x++

			if (x > 5) {
				x = 1
				y++
			}

		})

		
		
		if (this.multiplayer) {
			this.time.delayedCall(500,()=> {
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
			this.time.delayedCall(1000, ()=> {
			
				this.turnText?.setText('Bible Knowledge Game')
				this.handleGameStateChanged(GameState.Playing)

			})
		}

		this.waitMessage = this.add.text(screenCenterX, 0,'Not your turn yet').setFontSize(72).setFontFamily('impact').setVisible(false).setOrigin(0.5).setShadow(2,2,'black',2,true)
		this.server?.onBoardChanged(this.handleBoardChanged, this)
		this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this)
		this.server?.onPlayerWon(this.handlePlayerWon, this)

		
		this.createAnswerEffect()
	
		this.cameras.main.fadeIn(2000, 0, 0, 0)


	}

	private displayPlayers(effect: boolean) {

		if (!this.server || !this.server?.players)
			return 


		if (this.server?.playerId == '')
			return
		
		this.server.players?.forEach((player: Player, key: string) => {

			if (player.id === this.server?.playerId) 
			{
			
				// Me - I'm always going to be player1score
				if (player.lastscore < player.score) {
					
					console.log('I answered correct')
					if (this.lastSquare != null && this.player1score) {
						console.log(this.stopEffect)
						if (!this.stopEffect)
							this.handleCollectMoney(this.lastSquare, this.player1score, player.score) 
						else {
							this.player1score.setText(player.score.toString())
							this.player1score.setColor(player.score < 0 ? 'red' : 'white')
						}
					}
				
									
				}
				else {

					console.log('I answered wrong')
					this.player1score?.setText(player.score.toString())
					this.player1score?.setColor(player.score >= 0 ? 'white' : 'red')
				}
				
			}
			else 
			{
				if (player.lastscore < player.score) {
					
					console.log('other player answered correct')
					if (this.lastSquare != null && this.player2score) {
						if (!this.stopEffect)
						this.handleCollectMoney(this.lastSquare, this.player2score, player.score) 
					}
				
									
				}
				else {
					console.log('other player answered wrong')
					this.player2score?.setText(player.score.toString())
					this.player2score?.setColor(player.score >= 0 ? 'white' : 'red')
				}
				
			}
			
		})

		if (this.server.players.size > 1) {
			let x,y = 0

			 
			if (this.multiplayer) {
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
		}
			
		this.emitter?.setPosition(x,y)
		this.stopEffect =true 

	}





	}

	private handleBoardChanged(newValue: Cell, idx: string, players: MapSchema<IPlayer>) {



		this.stopEffect = false
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

		console.log('player ready!')
		
		this.locked = !ready
		if (ready == true) {
			console.log('control unlocked')
		}
		else {
			console.log('control locked')
		}
		
	

	}
	private handlePlayerWon(playerId: string) {
		this.time.delayedCall(1000, () => {
			if (!this.onGameOver) {
				return
			}

			this.onGameOver({
				winner: playerId == this.server?.playerId 
			})
		})
	}

	private handleGameStateChanged(state: GameState) {
		if (state === GameState.Playing) {

			if (!this.server)
				return
			if (!this.server.players)
				return

			// The game has begun create and display the player names and scores
			
			

				let col1 = 80
				let col2 = this.game.scale.width - col1
				
				console.log('HANDLE GAMESTATE CHANGE!')
				
				let player = this.server.players.get(this.server.playerId)
				if (player) {
					this.add.image(col1, 140, 'nametag').setOrigin(0.5).setDepth(998).alpha = 0.7
				    this.player1img = this.add.image(col1, 60,'player').setOrigin(0.5,0.5).setDepth(998)
					this.player1img.alpha = 0.7
					this.player1score = this.add.text(80, 135,'').setFontSize(32).setShadow(2,2,'black').setFontFamily('impact').setOrigin(0.5).setDepth(999)						
					this.add.text(col1, 85, player.name).setFontSize(24).setShadow(2, 2, 'black').setFontFamily('impact').setOrigin(0.5,0.5).setDepth(999)
					
					var shape3 = new Phaser.Geom.Rectangle(0, 0, this.player1img.width, this.player1img.height)
					var particles = this.add.particles('flares')

					if (this.emitter)
						this.emitter.stop()

						this.emitter = particles.createEmitter({
							frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
							x: this.player1img.x - this.player1img.width / 2,
							y: this.player1img.y - this.player1img.height / 2,
							scale: { start: 0.5, end: 0 },
							
						  
							blendMode: 'ADD',
							emitZone: { type: 'random', source: shape3, quantity: 42, yoyo: false }
						})
	
					

				

				if (this.multiplayer) {
				let opponent: Player | undefined
				this.server.players.forEach((player2: Player, key: string)=> {
					if (key !== player?.id)
						opponent = player2
				})

				
				if (opponent !== undefined) {
					this.add.image(col2, 140, 'nametag').setOrigin(0.5).setDepth(998).alpha = 0.7
					this.player2img = this.add.image(col2, 60,'player').setOrigin(0.5,0.5).setDepth(998)
					this.player2img.alpha = 0.7
					this.player2score = this.add.text(col2, 135,'').setFontSize(32).setShadow(2,2,'black').setFontFamily('impact').setOrigin(0.5).setDepth(999)						
					this.add.text(col2, 85, opponent.name).setFontSize(24).setShadow(2, 2, 'black').setFontFamily('impact').setOrigin(0.5,0.5).setDepth(999)
					
				}
				}
			}

				//if (player.id === this.server?.activePlayer)
				//	this.arrow = this.add.image(playerdisplay.x, playerdisplay.y, 'flood', 'arrow-white').setOrigin(0.5)

		
			this.displayPlayers(false)
		}
	}
}