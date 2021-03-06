import { getRoomById } from 'colyseus/lib/MatchMaker'
import { World } from 'matter'
import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { BKG } from '../../types/BKG'

import { IGameOverSceneData } from '../../types/scenes'
import Server from '../services/Server'

export default class Bootstrap extends Phaser.Scene {
	private server!: Server

	constructor() {
		super('bootstrap')
	}

	init() {
		BKG.Storage.initUnset('gameserver', '34.72.31.244')

		this.server = new Server()

	}


	preload() {




		this.load.image('background', 'assets/background.png')
		this.load.image('loading-background', 'assets/loading-background.png')
		this.load.image('overlay', 'assets/overlay.png')
		this.load.image('logo', 'assets/logo.png')
		this.load.image('bible', 'assets/bible_img.png')
		this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json')

		WebFont.load({ custom: { families: ['Berlin'], urls: ['assets/fonts/BRLNSDB.css'] } });
		WebFont.load({ custom: { families: ['swiss921'], urls: ['assets/fonts/SWISS921.css'] } });


	}


	private logo?: Phaser.GameObjects.Image
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
	private gameLaunched: boolean = false

	create() {

		BKG.world = {
			width: this.cameras.main.width,
			height: this.cameras.main.height,
			centerX: this.cameras.main.centerX,
			centerY: this.cameras.main.centerY
		};
		BKG.Lang.updateLanguage('en');
		BKG.text = BKG.Lang.text[BKG.Lang.current];


		var textures = this.textures;

		let logo = this.add.image(BKG.world.centerX, BKG.world.centerY, 'logo').setOrigin(0.5)

		this.logo = logo
		var origin = this.logo.getTopLeft();

		var logoSource = {
			getRandomPoint: function (vec) {
				do {

					var x = Phaser.Math.Between(0, logo.width - 1);
					var y = Phaser.Math.Between(0, logo.height - 1);
					var pixel = textures.getPixel(x, y, 'logo');

				} while (pixel.alpha < 255);

				return vec.setTo(x + origin.x, y + origin.y);
			}
		};

		var particles = this.add.particles('flares');

		this.emitter = particles.createEmitter({
			x: 0,
			y: 0,
			lifespan: 1000,
			gravityY: 10,
			scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
			alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
			blendMode: 'ADD',
			emitZone: { type: 'random', source: logoSource }
		});

		this.createNewGame()
	}




	private handleGameOver = (data: IGameOverSceneData) => {



		this.scene.stop('game')


		let screen = data.multiplayer ? 'game-over' : 'levelcomplete'
		this.scene.launch(screen, {
			...data,
			onRestart: this.handleRestart,
			onGameOver: this.handleGameOver,
			server: this.server
		})


	}

	public handleRestart = () => {


		this.scene.stop('login')
		this.scene.stop('game')
		this.scene.stop('question')
		this.scene.stop('answer')
		this.scene.stop('game-over')
		this.scene.stop('levelselect')
		this.scene.stop('level-complete')


		this.restartGame()
	}

	private restartGame() {


		this.server.leave()
		this.server = new Server()

		this.scene.stop('login')
		this.scene.stop('game')
		this.scene.stop('question')
		this.scene.stop('answer')
		this.scene.stop('game-over')
		this.scene.stop('levelselect')
		this.scene.stop('level-complete')


		this.scene.start('title', {
			server: this.server,
			onGameOver: this.handleGameOver,


		})
	}

	private createNewGame() {

		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

			this.logo?.destroy()
			this.emitter?.stop()


			this.gameLaunched = true
			this.scene.launch('preloader', {
				server: this.server,
				onGameOver: this.handleGameOver,


			})


		})

		this.cameras.main.fadeIn(2000, 0, 0, 0)

		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, 
			(cam:Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

			this.time.delayedCall(3000, () => {
				this.cameras.main.fadeOut(2000, 0, 0, 0)
			})
		})

	}
}