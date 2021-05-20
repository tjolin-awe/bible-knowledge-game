import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer, IAnswer} from '../../types/ITicTacToeState'
import type Server from '../services/Server'
import { text } from 'express'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import TileZToChessArray from 'phaser3-rex-plugins/plugins/board/board/tileposition/TileZToChessArray'
import { Cell, Answer} from '~/server/TicTacToeState'

export default class Game extends Phaser.Scene
{
	private server?: Server
	private onGameOver?: (data: IGameOverSceneData) => void
	private name : string = ""
	private gameStateText?: Phaser.GameObjects.Text
	private turnText?: Phaser.GameObjects.Text
	private playerText? :Phaser.GameObjects.Text
	private player2Text? : Phaser.GameObjects.Text
	private question_background? : Phaser.GameObjects.Image
	private arrow? :Phaser.GameObjects.Image

	private playerindicators? : Phaser.Tweens.Tween

	private cells: { display: Phaser.GameObjects.Graphics, value: ICell, text: Phaser.GameObjects.Text, score: number }[] = []

	private tempCounter: number = 0
	constructor()
	{
		super('game')
	}

	init()
	{
		this.cells = []
	}


	preload() {


		this.load.atlas('flood', 'assets/blobs.png', 'assets/blobs.json');
		this.load.image('background2','assets/character-select.png')
		this.load.image('green','assets/green.png')
		this.load.image('red','assets/particles/red.png')

		console.log('preload')
	}


	private stopcurrentaction: boolean = false
	async create(data: IGameSceneData)
	{

		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
			  console.log("tab is active -game")

			 
			  this.stopcurrentaction = false;
			  this.scene.setActive(true)
			  this.scene.stop('question')
			  this.scene.stop('answer')
			  this.scene.wake('game')
			  this.server?.playerReady(this.server?.playerIndex)



			} else {
			  console.log("tab is inactive -game")
			  
			  this.stopcurrentaction  =true;
				  
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
 
		
		
		const { server, onGameOver, currentcells, name } = data

		console.log('CreateBoard')
		console.log(name)
		this.name = name
		if (currentcells != null) {
			
		}
		this.server = server
		this.server?.onGameStateChanged(this.handleGameStateChanged, this)
		this.server?.onReady(this.handleReady, this)
		this.onGameOver = onGameOver

		if (!this.server)
		{
			throw new Error('server instance missing')
		}

		await this.server.join(name)


		
 
		this.server.onceStateChanged(this.createBoard, this)


		
	}

	private createBoard(state: ITicTacToeState)
	{


	
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height /2;
   
		this.add.image(0,0,'background2').setScale(0.5,0.55).setPosition(400,260)
		this.turnText = this.add.text(screenCenterX, 50, '')
		.setOrigin(0.5).setFontFamily('Impact').setFontSize(42)

		const { width, height } = this.scale
		const sizex = 120 
		const sizey = 80 

		let x = 1
		let y = 1
		let squareval = 0

		let categorys =['Important Figures in the Bible',
		"Days of God's Creation","Animals in The Bible",
		"The Ark that Noah Built", "The Great Walls of Jerico"]
		
		console.log(state.board)

		const col1 = screenCenterX / 2
		const col2 = screenCenterX + screenCenterX / 2
		const ypos =  this.cameras.main.height - this.cameras.main.height / 6;
		this.playerText = this.add.text(col1,ypos,'...').setFontSize(28).setShadow(2,2,'black').setFontFamily('impact').setOrigin(0.5)
		this.player2Text = this.add.text(col2,ypos,'...').setFontSize(28).setShadow(2,2,'black').setFontFamily('impact').setOrigin(0.5)
		
		
		this.arrow = this.add.image(this.playerText.x - this.playerText.width, this.playerText.y, 'flood', 'arrow-white').setOrigin(0.5)
		this.playerindicators = this.tweens.add({

			targets: this.arrow,
			x: '+=24',
			ease: 'Sine.easeInOut',
			duration: 900,
			yoyo: true,
			repeat: -1

		});
		
		
		state.board.forEach((cellState, idx) => {
			//const cell = this.add.rectangle(x * 129, y * 65, sizex, sizey, 0x060CE9)
			//const cell = this.add.image(x * 129,y*65, 'gradient')
			
			

			const cell = this.add.graphics().setPosition(x * sizex - 15, y * sizey + 1)
			let text =  this.add.text(0,0,'')
		
			
			
			
				this.cells.push({
					display: cell,
					value: cellState,
					text: text,
					score: 0
				
			})
			
			if (this.cells[Number.parseInt(idx)].value.result === true)
			{
				
					cell.setVisible(false)
					this.cells[Number.parseInt(idx)].text.setVisible(false)
				
			}
			else
			{
			
				if (cellState.type == 0){
					cell.fillGradientStyle(0x0f00c8,0x2f1ff5,0x0f00c8,0x2f1ff5,1);
					cell.fillRect(0, 0 , sizex - 10, sizey - 10);
					text.setPosition(x * sizex -8,  y * sizey + 10)
					text.setText(cellState.category).setWordWrapWidth(sizex -10)
				.setAlign('left').setColor('white').setFontSize(14).setFontFamily('swiss921').setFontStyle('bold').setShadow(2, 2, 'black', 2,false, true)
				
				} 
				else {
				cell.fillGradientStyle(0x050052,0x050052,0x0a00a3,0x050052,1);
				cell.fillRect(0, 0 , sizex - 10, sizey - 10);
				
				text.setPosition(x * sizex - 5,  y * sizey + 12)
				text.setText('$' + (cellState.value).toString())
				.setPipeline('Light2D').setColor('#cd934a').setFontSize(42).setFontFamily('swiss921').setFontStyle('bold').setShadow(2, 2, 'black',2,true, true).setLineSpacing(0.5)
					text.setInteractive().on('pointerover', ()=>{


						
						cell.clear()
						cell.fillGradientStyle(0x0f00c8,0x2f1ff5,0x0f00c8,0x2f1ff5,1)
						cell.fillRect(0, 0 , sizex - 10, sizey - 10)
					})
					text.setInteractive().on('pointerout', function () {
						
						cell.clear()
						cell.fillGradientStyle(0x050052,0x050052,0x0a00a3,0x050052,1);
						cell.fillRect(0, 0 , sizex - 10, sizey - 10);
					}).on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
						
						let result = this.tempCounter > 3	

						if (!this.locked)
						{
							this.turnText?.setText('Question in Progress...')
				
							this.server?.makeSelection(Number.parseInt(idx), result, this.cells[Number.parseInt(idx)].score, this.name)
						
						}
						this.tempCounter++
					})

					text.on('pointerdown', ()=> {

				

					this.cameras.main.on('camerafadeoutcomplete', ()=> {
					}, this);

					//  Every time you click, fade the camera

				
					//  Get a random color
					//var red = Phaser.Math.Between(50, 255);
					//var green = Phaser.Math.Between(50, 255);
					//var blue = Phaser.Math.Between(50, 255);

				 
					//this.cameras.main.fade(2000, red, green, blue);

				})
			

			this.cells[Number.parseInt(idx)].text = text 
			this.cells[Number.parseInt(idx)].score = squareval
		}	
		}
				

				
				

		
	

			x++

			if (x > 5)
			{
				x = 1
				y++
				squareval+=100
			}
		
		})

		if (this.server?.gameState === GameState.WaitingForPlayers)
		{
			const width = this.scale.width
			this.gameStateText = this.add.text(width * 0.5, 50, 'Waiting for another player')
				.setOrigin(0.5).setFontFamily('Impact').setFontSize(42)
		} 
		else {
		
		if (this.server){
			let players = this.server?.players

			this.displayPlayers()
		}
		
		}
		this.server?.onBoardChanged(this.handleBoardChanged, this)
		this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this)
		this.server?.onPlayerWon(this.handlePlayerWon, this)
		
		this.cameras.main.fadeIn(2000, 0, 0, 0)
		
		
	}

	private displayPlayers()
	{		
		
		let players = this.server?.players
		let p1score = 0
		let p2score = 0

		let player1 = players?.get('0')
		let player2 = players?.get('1')

		
		if (player1)
			p1score = player1.score
		
		if (player2)
			p2score = player2.score
			
		let incontrol = false
		if (this.server?.activePlayer == this.server?.playerIndex)
			incontrol = true

		if (this.name === player1?.name) {
			this.playerText?.setText(player1?.name + ": " + p1score.toString())
			this.player2Text?.setText(player2?.name + ": " + p2score.toString())
		}
		else {
			this.playerText?.setText(player2?.name + ": " + p2score.toString())
			this.player2Text?.setText(player1?.name + ": " + p1score.toString())
		}

		if (incontrol) {
			if (this.playerText) {
				this.arrow?.setPosition(this.playerText.x - this.playerText.width, this.playerText.y).setOrigin(0.5)
				this.playerText.setColor('green')
				this.player2Text?.setColor('white')
				this.turnText?.setText("It's your turn!")
			}
			console.log('in control')
		}
		else {
			if (this.player2Text) {
				this.arrow?.setPosition(this.player2Text.x - this.player2Text.width, this.player2Text.y).setOrigin(0.5)
				this.playerText?.setColor('white')
				this.player2Text.setColor('green')
				this.turnText?.setText("It's your opponents Turn")
			}
		}


		this.playerindicators?.stop()
		this.playerindicators = this.tweens.add({

			targets: this.arrow,
			x: '+=24',
			ease: 'Sine.easeInOut',
			duration: 900,
			yoyo: true,
			repeat: -1

		});
		
	}

	private handleBoardChanged(newValue: Cell, idx: string, players: MapSchema<IPlayer>)
	{



		const cell = this.cells[idx]
		
		this.displayPlayers()
		
		if (cell.value.result !== newValue.result)
		{
			if (newValue.result)
			{
					var particles = this.add.particles('green').setPosition(cell.display.x + 120 / 2, cell.display.y + 60 / 2)
					
					var emitter = particles.createEmitter({
						speed: 100,
						lifespan: 2000,
						scale: { start: 1, end: 0 },
						blendMode: 'ADD'
					})

					
						emitter.stop()
						cell.display.setVisible(false)
						this.cells[idx].text.setVisible(false)
				
						if (this.stopcurrentaction ==false) {
							console.log('launching question')
						this.scene.sleep()
					
						this.scene.launch('question', { server: this.server, question : cell.value.question, image: newValue.image, answers: newValue.answers, category: newValue.category, amount: newValue.value })
						
						} else {
							console.log('aborted question launch')
							this.stopcurrentaction = false
						}
						
				
			}

			cell.value = newValue
			cell.display.setVisible(false)
						this.cells[idx].text.setVisible(false)
		}
	}

	private handlePlayerTurnChanged(playerIndex: number, players: MapSchema<IPlayer>)
	{
		console.log('PLAYER TURN!')

		
	 
		console.log(this.server?.playerIndex)
		console.log(playerIndex)
		if (this.server?.playerIndex === playerIndex) {
			console.log('My turn')		
			this.turnText?.setText("It's your turn!")	
			this.tempCounter = 0
			this.turnText?.setVisible(true)
		} else {

			this.turnText?.setText("It's your opponents turn")	
			console.log('Not my turn')	

			
			this.turnText?.setVisible(true)
			
		}
		console.log('player changed')
		this.displayPlayers()

		// TODO: show a message letting the player know it is their turn
	}

	private locked: boolean = false
	private handleReady(ready: boolean)
	{


		this.locked = !ready
		console.log('handler for ready fired: ')
		if (ready == true) {
			console.log('control unlocked')
		}
		else {
			console.log('control locked')
		} 

		this.displayPlayers()
		
	}
	private handlePlayerWon(playerIndex: number)
	{
		this.time.delayedCall(1000, () => {
			if (!this.onGameOver)
			{
				return
			}

			this.onGameOver({
				winner: this.server?.playerIndex === playerIndex
			})
		})
	}

	private handleGameStateChanged(state: GameState)
	{
		if (state === GameState.Playing && this.gameStateText)
		{
			
		
			if (this.playerText) {
				this.arrow?.setPosition(this.playerText.x - this.playerText?.width, this.playerText?.height).setOrigin(0.5)
			
				

				
			}

			this.displayPlayers()
			this.turnText?.setText("It's your turn!")	

			
			this.gameStateText.destroy()
			this.gameStateText = undefined
		}
	}
}