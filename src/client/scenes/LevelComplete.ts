import Phaser from 'phaser'
import NextTurnCommand from '~/server/commands/NextTurnCommand'
import { BKG, Button } from '../../types/BKG'
import { IGameOverSceneData, IGameSceneData, ILevelOverSceneData } from '../../types/scenes'
import Server from '../services/Server'
import Bootstrap from './Bootstrap'

export default class GameOver extends Phaser.Scene
{
	private container?: Phaser.GameObjects.Image
	private picture?: Phaser.GameObjects.Image
	private onGameOver?: (data: IGameOverSceneData) => void
	constructor()
	{
		super('levelcomplete')
		
	}


	private server?: Server
	private onRestart?: () => void
	create(data: ILevelOverSceneData)
	{

		
		const { winner , onRestart, onGameOver, server } = data

		this.onGameOver= onGameOver
		this.onRestart= onRestart
		this.server = server
	
		let background = this.add.image(0,0,'winscreen').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)
	
		// Create container for correct answer's picture
		this.container = this.add.image(BKG.world.centerX, BKG.world.height, 'level1').setOrigin(0.5)
		this.container.setPosition(BKG.world.centerX, BKG.world.height + this.container.height / 2)

		let activeLevel = BKG.Storage.get('BKG-active-level')
		let nextLevel = Number.parseInt(activeLevel) + 1
		
		BKG.Storage.set('BKG-active-level',nextLevel)
		BKG.Storage.set(`BKG-level-${nextLevel}`, true);
      
		const text = data.winner 
			? 'Level Complete'
			: 'Level Failed'


		if (data.winner) {
			var p0 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 500);
			var p1 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 150);
			var p2 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 150);
			var p3 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 500);
		
			var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

			
			
			let player = server.players?.get(server.playerId)


			var max = 28;
			var points = [];
			var tangents = [];
		
			for (var c = 0; c <= max; c++)
			{
				var t = curve.getUtoTmapping(c / max,0);
		
				points.push(curve.getPoint(t));
				tangents.push(curve.getTangent(t));
			}
		
			var tempVec = new Phaser.Math.Vector2();
		
			var spark0 = this.add.particles('spark0');
			var spark1 = this.add.particles('spark1');
		
			for (var i = 0; i < points.length; i++)
			{
				var p = points[i];
		
				tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);
		
				var angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));
		
				var particles = (i % 2 === 0) ? spark0 : spark1;
		
				particles.createEmitter({
					x: tempVec.x,
					y: tempVec.y,
					angle: angle,
					speed: { min: -100, max: 500 },
					gravityY: 200,
					scale: { start: 0.4, end: 0.1 },
					lifespan: 800,
					blendMode: 'SCREEN'
				});
			}
		
			

			let nextbtn = new Button(BKG.world.centerX, BKG.world.centerY + 150, 'nextbtn', this.next,this).setVisible(false)

			var self = this
			this.tweens.add({
				targets: this.container,
				y: BKG.world.centerY + 50,
				ease: 'Power4',
				duration: 1000,
				yoyo: false,
				repeat: 0,
				onComplete: function () {

					self.picture?.setVisible(true).setAlpha(0)

					self.tweens.add({
						targets: self.picture,
						alphaTopLeft: { value: 1, duration: 2000, ease: 'Power1' },
						alphaBottomRight: { value: 1, duration: 2000, ease: 'Power1' },
						alphaBottomLeft: { value: 1, duration: 2000, ease: 'Power1' },
						onComplete: function () {
							// slide the answer's picture off screen after 4 seconds
							nextbtn.setVisible(true)
						}
					})

				},
			})
		}
		else {
	
			let restart = new Button(BKG.world.centerX, BKG.world.centerY + 150,'button-restart', this.restart,this)
	
		}


		
		


		let fontTitle = { font: '48px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }

		this.add.text(BKG.world.centerX, BKG.world.centerY, text, fontTitle).setOrigin(0.5)


		
		this.input.keyboard.once('keyup-SPACE', () => {
			
		})

		//this.add.image(400, 400, 'background2');
	}
	restart(){
	
			this.onRestart?.call(this)
			
			
	}
	next() {

	
		this.scene.stop('levelselect')
		this.scene.start('levelselect', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
			multiplayer: false
		})
		this.scene.stop()
	}
}
