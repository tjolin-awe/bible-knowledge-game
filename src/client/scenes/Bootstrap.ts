import Phaser from 'phaser'
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


	
		let background2  = this.load.image('logo','assets/Tux-c4c-192.png')
		console.log(background2);
		this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
	
		console.log('preload')
	}
	

	private logo?: Phaser.GameObjects.Image
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
	private gameLaunched: boolean = false
	create()
	{
		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
			  console.log("tab is active -bootstrap")

			   if (this.gameLaunched)
			   {
				   
				   
				
			   }

			} else {
			  
			}
		  })

		var textures = this.textures;

		let logo = this.add.image(400,300, 'logo')

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

	

		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

			this.logo?.destroy()
		this.emitter?.stop()
		
		this.gameLaunched = true
		this.scene.launch('login', {
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