import { getRoomById } from 'colyseus/lib/MatchMaker'
import { World } from 'matter'
import Phaser from 'phaser'
import WebFont from 'webfontloader'
import { BKG } from '../../types/BKG'

import { IGameOverSceneData } from '../../types/scenes'
import Server from '../services/Server'

export default class Bootstrap extends Phaser.Scene
{
	private server!: Server
	
	constructor()
	{
		super('bootstrap')
	}

	init()
	{
		this.server = new Server()
	}


	preload() {

	

		
		this.load.image('background', 'assets/background.png')
		this.load.image('loading-background', 'assets/loading-background.png')
		this.load.image('overlay', 'assets/overlay.png')
		this.load.image('logo','assets/logo.png')
		this.load.image('bible','assets/bible_img.png')
		this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json')	
	
		WebFont.load({ custom: { families: ['Berlin'], urls: ['assets/fonts/BRLNSDB.css'] } });
		WebFont.load({ custom: { families: ['swiss921'], urls: ['assets/fonts/SWISS921.css'] } });
	

	}
	

	private logo?: Phaser.GameObjects.Image
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
	private gameLaunched: boolean = false
	static openingmusic?: Phaser.Sound.BaseSound
	create()
	{
		
		BKG.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        BKG.Lang.updateLanguage('en');
        BKG.text = BKG.Lang.text[BKG.Lang.current];
		
		
	
		
			
		
		var textures = this.textures;

		let logo = this.add.image(BKG.world.centerX,BKG.world.centerY, 'logo').setOrigin(0.5)

		this.logo = logo
		var origin = this.logo.getTopLeft();

    	var logoSource = {
        getRandomPoint: function (vec)
        {
            do
            {
			
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
		this.server.leave()
		this.scene.stop('game')

		this.scene.launch('game-over', {
			...data,
			onRestart: this.handleRestart
		})
	}

	private handleRestart = () => {
		this.scene.stop('game-over')
		this.createNewGame()
	}

	private createNewGame()
	{

		/*
		this.gameLaunched = true
		this.scene.launch('game', {
			server: this.server,
			onGameOver: this.handleGameOver,
			name: 'tom',

		})
	
		return */

		
		
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
		
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
		
			this.time.delayedCall(3000, () => {				
				this.cameras.main.fadeOut(2000, 0, 0, 0)
			})
		})
	
	}
}