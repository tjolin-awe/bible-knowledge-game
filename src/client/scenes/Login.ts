import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer} from '../../types/ITicTacToeState'
import type Server from '../services/Server'
import { text } from 'express'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'

import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import Bootstrap from './Bootstrap'



export default class Login extends Phaser.Scene
{
	private server?: Server
	private message? : Phaser.GameObjects.Text

	private name? : Element

	constructor()
	{
		super('login')
	}

	init()
	{
		
	}

	private loggedIn:boolean = false
	preload() {
        
		
		this.load.image('bible','assets/bible.png')
    }
	private onGameOver?: (data: IGameOverSceneData) => void
	private inputtext : string = ""
	private emitter : Phaser.GameObjects.Particles.ParticleEmitter | undefined 
    create(data: IGameSceneData) {           
       

		
		const { server, onGameOver, currentcells } = data

		
		
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height /2;
   
		this.server = server
		
		this.onGameOver = onGameOver

		if (this.loggedIn) {
			this.scene.start('game', {
				server: this.server,
				onGameOver: this.onGameOver,
				currentcells: null,
				name: this.inputtext		
			})

			return 
		}

		let bible = this.add.image(0,0,'bible').setOrigin(0)
		bible.displayWidth = this.game.scale.width
		bible.displayHeight = this.game.scale.height
		
		
		var text1 = this.add.text(screenCenterX,screenCenterY / 3, "BIBLE KNOWLEDGE GAMES", { fontFamily: "swiss921", fontSize: 72, color: "#cd934a" }).setAlign('center').setOrigin(0.5)
		text1.setStroke('white', 12).setFontStyle('bold').setWordWrapWidth(780)
	
		//  Apply the shadow to the Stroke only
		text1.setShadow(2, 2, 'black', 2, true, false);
	
		const text = this.add.text(screenCenterX, screenCenterY + screenCenterY / 2, 'Enter Name',{ fixedWidth: 200, fixedHeight: 38}).setOrigin(0.5)
		text.setBackgroundColor('green').setAlign('center').setFontSize(32).setFontFamily('impact')
		
		const subtitle = this.add.text(text.x, text.y + 50,'press [ENTER] to start').setOrigin(0.5).setAlign('center')
	
		var shape2 = new Phaser.Geom.Ellipse(0, 0, 600, 200);
		
	
		var i = 0;
	
		var particles = this.add.particles('flares');
	
	    this.emitter = particles.createEmitter({
			frame: { frames: [ 'green', 'purple', 'blue' ], cycle: true },
			x: screenCenterX,
			y: text.y,
			scale: { start: 0.5, end: 0 },
			blendMode: 'ADD',
			emitZone: { type: 'edge', source: shape2, quantity: 48, yoyo:false, }
		});
		
	
		this.input.keyboard.on('keyup', (e: { keyCode: any })=> {
		//  Only allow A-Z . and -
		
				let code = e.keyCode
		
				if (code === Phaser.Input.Keyboard.KeyCodes.ENTER)
				{
					if (this.inputtext.length < 0)
						return

					if (this.emitter != undefined)
						this.emitter.stop()
		

					this.loggedIn = true
					this.scene.start('game', {
						server: this.server,
						onGameOver: this.onGameOver,
						currentcells: null,
						name: this.inputtext		
					})
				}
				else if (code === Phaser.Input.Keyboard.KeyCodes.PERIOD)
				{
					
				}
				else if (code === Phaser.Input.Keyboard.KeyCodes.MINUS)
				{
					
				}
				else if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE)
				{
					if (this.inputtext.length > 0)
						this.inputtext = this.inputtext.slice(0,-1)
					
					console.log(this.inputtext)
					text.setText(this.inputtext)
				}
				else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z)
				{
						
					
					if (this.inputtext.length > 12)
						return
					this.inputtext+= String.fromCharCode(code)
					console.log(this.inputtext);
				    text.setText(this.inputtext.toUpperCase())
				}
		},this)
    }

	


	

}







