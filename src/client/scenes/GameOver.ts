import Phaser from 'phaser'
import { IGameOverSceneData } from '../../types/scenes'

export default class GameOver extends Phaser.Scene
{
	constructor()
	{
		super('game-over')
	}

	preload()
	{
		this.load.image('spark0', 'assets/green.png');
		this.load.image('spark1', 'assets/particles/red.png');
		
	}

	create(data: IGameOverSceneData)
	{

	
		const text = data.winner
			? 'You Won!'
			: 'You Lost!'


		if (data.winner) {
			var p0 = new Phaser.Math.Vector2(200, 500);
			var p1 = new Phaser.Math.Vector2(200, 150);
			var p2 = new Phaser.Math.Vector2(600, 150);
			var p3 = new Phaser.Math.Vector2(600, 500);
		
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
		const { width, height } = this.scale

		const title = this.add.text(width * 0.5, height * 0.5, text, {
			fontSize: '72px',
			fontFamily: 'impact'
		})
		.setOrigin(0.5)

		this.add.text(title.x, title.y + 100, 'Press space to play again')
			.setOrigin(0.5)

		this.input.keyboard.once('keyup-SPACE', () => {
			if (data.onRestart)
			{
				data.onRestart()
			}
		})

		this.add.image(400, 400, 'background2');
	}
}
