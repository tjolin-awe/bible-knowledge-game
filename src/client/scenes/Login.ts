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

	preload() {
        
		this.load.scenePlugin({
			key: 'rexuiplugin',
			url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
			sceneKey: 'rexUI'
		})
		
		this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
    }
	private onGameOver?: (data: IGameOverSceneData) => void
	private inputtext : string = ""
	private emitter : Phaser.GameObjects.Particles.ParticleEmitter | undefined 
    create(data: IGameSceneData) {           
       
		const { server, onGameOver, currentcells } = data
		
		this.server = server
		
		this.onGameOver = onGameOver
		const text = this.add.text(400, 300, 'Enter Name', { fixedWidth: 200, fixedHeight: 38}).setOrigin(0.5)
		text.setBackgroundColor('green').setAlign('center').setFontSize(32).setFontFamily('impact')
		
		const subtitle = this.add.text(400,350,'press [ENTER] to start').setOrigin(0.5).setAlign('center')
		var shape1 = new Phaser.Geom.Circle(0, 0, 160);
		var shape2 = new Phaser.Geom.Ellipse(0, 0, 600, 200);
		var shape3 = new Phaser.Geom.Rectangle(-150, -150, 400, 400);
		var shape4 = new Phaser.Geom.Line(-150, -150, 150, 150);
		var shape5 = new Phaser.Geom.Triangle(-150,150,150);

		var shapes = [ shape1, shape2, shape3, shape4 ];
	
		var i = 0;
	
		var particles = this.add.particles('flares');
	
	    this.emitter = particles.createEmitter({
			frame: { frames: [ 'green', 'purple', 'blue' ], cycle: true },
			x: 400,
			y: 300,
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







