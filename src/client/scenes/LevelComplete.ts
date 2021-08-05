import Phaser from 'phaser'
import NextTurnCommand from '~/server/commands/NextTurnCommand'
import { BKG, Button } from '../../types/BKG'
import { IGameOverSceneData, IGameSceneData, ILevelOverSceneData } from '../../types/scenes'
import Server from '../services/Server'
import Bootstrap from './Bootstrap'

export default class GameOver extends Phaser.Scene {
	private container?: Phaser.GameObjects.Image
	private picture?: Phaser.GameObjects.Image
	private onGameOver?: (data: IGameOverSceneData) => void
	private server?: Server
	private onRestart?: () => void

	constructor() {
		super('levelcomplete')

	}


	/** Creates the scene */
	create(data: ILevelOverSceneData) {
		const { onRestart, onGameOver, server } = data


		this.onGameOver = onGameOver
		this.onRestart = onRestart
		this.server = server

		let fontTitle = { font: '48px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }
		this.add.image(0, 0, 'winscreen').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)

		// Create container for correct answer's picture
		this.container = this.add.image(BKG.world.centerX, BKG.world.height, 'level1').setOrigin(0.5)
		this.container.setPosition(BKG.world.centerX, BKG.world.height + this.container.height / 2)

		let activeLevel = BKG.Storage.get('BKG-active-level')

		
		let nextLevel = Number.parseInt(activeLevel) + 1
		
		if (nextLevel > 8)
			nextLevel = 8

		BKG.Storage.set('BKG-active-level', nextLevel)
		BKG.Storage.set(`BKG-level-${nextLevel}`, true);


		this.createFireworks()


		let nextbtn = new Button(BKG.world.centerX, BKG.world.centerY + 150, 'nextbtn', this.next, this).setVisible(false)

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
						nextbtn.setVisible(true)
					}
				})

			},
		})

		this.add.text(BKG.world.centerX, BKG.world.centerY, "Level Complete", fontTitle).setOrigin(0.5)
		this.input.keyboard.once('keyup-SPACE', () => {
			this.next()
		})


	}
	private createFireworks() {
		var p0 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 500);
		var p1 = new Phaser.Math.Vector2(BKG.world.centerX - 400, 150);
		var p2 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 150);
		var p3 = new Phaser.Math.Vector2(BKG.world.centerX + 400, 500);

		var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

		var max = 28;
		var points = [];
		var tangents = [];

		for (var c = 0; c <= max; c++) {
			var t = curve.getUtoTmapping(c / max, 0);

			points.push(curve.getPoint(t));
			tangents.push(curve.getTangent(t));
		}

		let tempVec = new Phaser.Math.Vector2()

		let spark0 = this.add.particles('spark0')
		let spark1 = this.add.particles('spark1')

		for (let i = 0; i < points.length; i++) {

			let p = points[i]

			tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p)

			let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec))

			let particles = (i % 2 === 0) ? spark0 : spark1

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

	next() {
		BKG.Sfx.play('click');

		this.scene.stop('levelselect')
		this.scene.stop()
		this.scene.start('levelselect', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
			multiplayer: false
		})

	}
}
