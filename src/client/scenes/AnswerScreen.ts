import Phaser from 'phaser'
import Base from 'phaser3-rex-plugins/plugins/gameobjects/containerlite/Base'
import { IAnswerData } from '../../types/scenes'
import type Server from '../services/Server'
import Bootstrap from './Bootstrap'


export default class AnswerScreen extends Phaser.Scene
{
   
	private card? : Phaser.GameObjects.Image
    private server?: Server
	constructor()
	{
		super('answer')
	}

	init()
	{
		
	}


	
	preload() {

		
		
		this.load.image('question_background', 'assets/question_background.png')
	
		this.load.atlas('flood', 'assets/blobs.png', 'assets/blobs.json')
		this.load.image('block', 'assets/50x50-black.png')
		this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
	
	}

	
	
	private blocks?:Phaser.GameObjects.Group
    async create(data: IAnswerData)
	{
		
			
		this.scene.sleep('game')

		let { server, question, image, answer, correctAnswer, timeout } = data
		this.server =server
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height /2;
   
		
			// ask the LoaderPlugin to load the texture
		this.load.image(image, `assets/images/${image}`)
		this.load.once(Phaser.Loader.Events.COMPLETE, () => {
			// texture loaded so use instead of the placeholder
			this.add.image(0,0,'loginbackground').setOrigin(0).setDisplaySize(this.game.scale.width, this.game.scale.height)
			this.card = this.add.image(screenCenterX, 0, 'image').setOrigin(0.5).setVisible(false)

	
			this.card.setTexture(image)

			let status = this.add.text(screenCenterX, 30, '').setFontSize(72).setFontFamily('impact').setOrigin(0.5)
		
			if (timeout) {
				this.add.text(screenCenterX, 100,'The correct answer is ' + correctAnswer.name).setFontFamily('swiss921')
				.setFontSize(48).setShadow(2,2,'black',2,true).setOrigin(0.5).setFontStyle('bold')
				.setWordWrapWidth(this.cameras.main.width * 0.8).setAlign('center')
			} else {
				if (answer.correct == false){
					status.setColor('red').setText('INCORRECT!')
					this.add.text(screenCenterX, 100, 'The correct answer is ' + correctAnswer.name).setFontFamily('swiss921')
					.setFontSize(48).setShadow(2,2,'black',2,true).setOrigin(0.5).setFontStyle('bold')
					.setWordWrapWidth(this.cameras.main.width * 0.8).setAlign('center')

				} else {
					status.setColor('green').setText('CORRECT')
					this.add.text(screenCenterX, 100, correctAnswer.name).setFontFamily('swiss921')
					.setFontSize(48).setShadow(2,2,'black',2,true).setOrigin(0.5).setFontStyle('bold')
					.setWordWrapWidth(this.cameras.main.width * 0.8).setAlign('center')

				}
			}

			this.card.setVisible(true)
			var tween = this.tweens.add({
				targets: this.card,
				y: screenCenterY,
				ease: 'Power4',
				duration: 1000,
				yoyo: false,
				repeat: 0,
				onStart: function () { console.log('onStart'); console.log(arguments); },
				onComplete: function () { console.log('onComplete'); console.log(arguments); },
				onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
				onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
			});
		
			/*let textures = this.textures;
			var origin = card.getTopLeft();
	
			var logoSource = {
				getRandomPoint: function (vec)
				{
					do
					{
						var x = Phaser.Math.Between(0, card.width - 1);
						var y = Phaser.Math.Between(0, card.height - 1);
						var pixel = textures.getPixel(x, y, image);
					} while (pixel.alpha < 255);
		
					return vec.setTo(x + origin.x, y + origin.y);
				}
			};
		
			let particles = this.add.particles('flares');
		
			particles.createEmitter({
				x: 0,
				y: 0,
				lifespan: 1000,
				gravityY: 10,
				scale: { start: 0, end: 0.25, ease: 'Quad.easeOut' },
				alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
				blendMode: 'ADD',
				emitZone: { type: 'random', source: logoSource }
			});*/

		//	this.blocks = this.add.group({key: 'block', repeat: 191 });
		//Phaser.Actions.GridAlign(this.blocks.getChildren(), {
	//		width: 25,
	//		cellWidth: 150,
	//		cellHeight: 150,
	//		x: 25,
	//		y: 25
	//	})
		
		
	
	
	
	//	let i = 0;
	//	let _this = this

	

	//	this.blocks.children.iterate(function (child) {
	
		
		
	//	 	let tween = _this.tweens.add({
	//			targets: child,
	///			scaleX: 0,
		///		scaleY: 0,
			//	alpha: 0,
			//	y: '+=64',
			//	angle: 180,
			//	ease: 'Power1',
			//	duration: 2000,
			//	delay: 1000 + (i * 100)
		//	});
			
		
	//		i++;
	
			//  Change the value 32 for different results
	//		if (i % 16 === 0)
	//		{
	//			i = 0;
	//		}
	
	//	})

      

		})
		this.load.start()
		
		
		//this.add.image(0,0,'question_background').setOrigin(0,0)

		document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
			  console.log("tab is active -answer")
              this.scene.stop()
			 

			} else {
			  console.log("tab is inactive -answer")
			  
				  
			}
		  })

		
		


		

		

	
       
		this.time.delayedCall(8000,()=>{


			if (this.card) {
				var tween = this.tweens.add({
				targets: this.card,
				y: this.game.scale.height  + this.card.height / 2,
				ease: 'Power4',
				duration: 1000,
				yoyo: false,
				repeat: 0,
				onStart: function () { console.log('onStart'); console.log(arguments); },
				onComplete: function () { console.log('onComplete'); console.log(arguments); },
				onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
				onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
			});
		}
		
			this.cameras.main.fadeOut(1000)
			
			
		})

		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

		
		
			
			this.blocks?.destroy();
		

			console.log('firing player ready!')
			this.server?.playerReady(this.server?.playerId)
			this.scene.stop()			
			this.scene.wake('game')
		})
	
		
		}

	
}