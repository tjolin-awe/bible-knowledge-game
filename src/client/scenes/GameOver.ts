import Phaser from 'phaser'
import { Player } from '~/server/TicTacToeState'
import { BKG, Button } from '../../types/BKG'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import Server from '../services/Server'

export default class GameOver extends Phaser.Scene
{
	private screenGameoverScore?: Phaser.GameObjects.Text
	private pointsTween?: Phaser.Tweens.Tween
	private _score: any
	constructor()
	{
		super('game-over')
		
	}


	private onRestart?: () => void
	create(data: IGameOverSceneData)
	{

		
		const { winningName, winningPlayerId, winner , onRestart, server } = data

		this.onRestart= onRestart
		
		let background = this.add.image(0,0,'winscreen').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)
	
		
	    let winningPlayer = server.players?.get(winningPlayerId)

		let text = data.winner == true ? 'You Won!' : 'You Lost!'

		this._score = winningPlayer?.score

		

		if (data.winner) {
			var p0 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 500);
			var p1 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 150);
			var p2 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 150);
			var p3 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 500);
		
			var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

		
		
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
		}
		
		var fontScoreWhite = { font: '38px ' + BKG.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };

		let fontTitle = { font: '48px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }

		this.add.text(BKG.world.centerX, BKG.world.centerY, text, fontTitle).setOrigin(0.5)

		
		let restart = new Button(BKG.world.centerX, BKG.world.centerY + 200,'button-restart', this.restart,this)

		server.leave()

		if (data.winner) {
			this.screenGameoverScore = this.add.text(BKG.world.centerX, BKG.world.centerY + 50,'0', fontScoreWhite).setOrigin(0.5)

			this.gameoverScoreTween()

		}
		

		this.input.keyboard.once('keyup-SPACE', () => {
			
		})

		//this.add.image(400, 400, 'background2');
	}
	restart(){
	
			this.onRestart?.call(this)
			
			
	}
	gameoverScoreTween() {

	

		let highscore = BKG.Storage.get('BKG-highscore')

	
			
		this.screenGameoverScore?.setText(highscore);
		let self = this
		if(this._score) {
			this.pointsTween = this.tweens.addCounter({
				from: 0, to: this._score, duration: 2000, delay: 250,
				onUpdateScope: this, onCompleteScope: this,
				onUpdate: function(){
					self.screenGameoverScore?.setText(highscore+Math.floor(self.pointsTween!.getValue()));
				},
				onComplete: function(){
					var emitter = self.add.particles('green').createEmitter({
						x: BKG.world.centerX,
						y: BKG.world.centerY,
						speed: { min: -600, max: 600 },
						angle: { min: 0, max: 360 },
						scale: { start: 0.5, end: 3 },
						blendMode: 'ADD',
						active: true,
						lifespan: 2000,
						gravityY: 1000,
						quantity: 400

						
		
					});
				
					
					BKG.Storage.setHighscore('BKG-highscore',Number.parseInt(self.screenGameoverScore!.text));
					emitter.explode(50,BKG.world.centerX,BKG.world.centerY);
				
				}
			});
		}
	}
}