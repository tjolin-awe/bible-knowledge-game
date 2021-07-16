import Phaser from 'phaser'
import TileZToChessArray from 'phaser3-rex-plugins/plugins/board/board/tileposition/TileZToChessArray'
import { BKG } from '../../types/BKG'

import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import type Server from '../services/Server'

export default class Login extends Phaser.Scene
{
	private server?: Server 
 
	private loggedIn: boolean = false
    private multiplayer: boolean = false
    private startbtn?: Phaser.GameObjects.Image

	private onGameOver?: (data: IGameOverSceneData) => void
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
    private particles?: Phaser.GameObjects.Particles.ParticleEmitterManager
    private inputReady: boolean = false
    

    private playerText!: Phaser.GameObjects.Text

	constructor()
	{
		super('login')
	}

	init()
	{
		
	}

    


	preload() {
        
        
	
        
    }


    private letters: { display: Phaser.GameObjects.Text, letter: string }[] = []
    private pulseBtn?: Phaser.Tweens.Tween 

    private createui() {

       
    
        var fontTitle = { font: '42px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 6 }  
      	var fontName = {font: '72px ' + BKG.text['FONT'], fill: '#ffffff'}

        if (this.game.device.os.desktop){
            this.add.text(BKG.world.centerX, 30, BKG.text['login-title'], fontTitle).setOrigin(0.5)
            this.playerText = this.add.text(BKG.world.centerX, 100,'', fontName).setOrigin(0.5)
            this.startbtn = this.add.image(BKG.world.centerX, 300,'button-start').setOrigin(0.5).setFrame(3)
      
        }
        else {
       
            this.add.text(BKG.world.centerX, 100, BKG.text['login-title'], fontTitle).setOrigin(0.5)
            this.playerText = this.add.text(BKG.world.centerX, 250,'', fontName).setOrigin(0.5)
            this.startbtn = this.add.image(BKG.world.centerX, BKG.world.centerY,'button-start').setOrigin(0.5).setFrame(3)
      
        }

       
       
        
	  
       
        this.startbtn.setInteractive().on('pointerup',()=>{
            if (this.canLogin())
                this.startgame()
        })

       
         this.pulseBtn =  this.tweens.add({ targets: this.startbtn, duration: 1000, scale: 1.2, ease: 'Sine.easeInOut', yoyo:true, loop:-1 })
        
       
        this.pulseBtn.pause()
      


     
    }

    private canLogin()
    {
        return this.playerText?.text.length > 0
        
    }

    private createKeyboard() {

        var chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];
        var cursor = { x: 0, y: 0 };
        
        var fontKeys =  { font: '62px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 5 };
	
        let input =  this.add.text(BKG.world.centerX, BKG.world.centerY - BKG.world.centerY / 3 , 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-', fontKeys).setOrigin(0.5).setVisible(false)


        
       let textline = 'ABCDEFGH=IJKLMNOP=QRSTUVW=XYZ.-';
    let letterSpacing = 70;
 
    let startNextLetterX = this.sys.game.device.os.desktop ? 400 : 80
    let nextLetterX = startNextLetterX
    let nextLetterY =  this.sys.game.device.os.desktop ? 450 : BKG.world.centerY + BKG.world.height / 5
    let eol: boolean = true
    for(var i = 0; i < textline.length; i++){
       
        if (textline[i] == '=') {
           
            nextLetterY = nextLetterY + 80
            nextLetterX = startNextLetterX
            eol = true
            continue
        }

        if (eol == true) 
            eol = false
        else 
            nextLetterX = this.letters[this.letters.length - 1].display.getCenter().x + letterSpacing
        
       
     
        let letter = this.add.text(nextLetterX, nextLetterY , textline[i], fontKeys).setOrigin(0.5).setInteractive()
    
        letter.on('pointerover', ()=> {
            this.tweens.add({ targets: letter, duration: 200, scale: 1.7, ease: 'Sine.easeInOut'});

        })
        
        letter.on('pointerout',()=> {
            this.tweens.add({ targets: letter, duration: 200, scale: 1, ease: 'Sine.easeInOut' });

        })

        letter.on('pointerup',()=> {
            
            if (!this.inputReady)
                return
            this.playerText.setText(this.playerText.text + letter.text)
            BKG.Sfx.play('click')
    
            this.pulseButton(this.canLogin())
          
            
        })
                
        this.letters.push({
            display: letter,
            letter: textline[i]
        })
    }

    let del = this.add.image(nextLetterX + 100, nextLetterY, 'rub').setOrigin(0.5).setScale(1.5).setInteractive()
    del.on('pointerover', ()=> {
        this.tweens.add({ targets: del, duration: 200, scale: 2, ease: 'Sine.easeInOut'});

    })
    
    del.on('pointerout',()=> {
        this.tweens.add({ targets: del, duration: 200, scale: 1.5, ease: 'Sine.easeInOut' });

    })

    del.on('pointerup',()=> {
        
        if (this.canLogin()) 
            this.playerText.setText(this.playerText.text.slice(0,-1))
        
        BKG.Sfx.play('click')


        this.pulseButton(this.canLogin())

      
        
    })
    
      //  let input = this.add.bitmapText(BKG.world.centerX, BKG.world.centerY - BKG.world.centerY / 3, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20).setOrigin(0.5)
        input.setInteractive()
    
      
         
        this.input.keyboard.on('keyup', (event: KeyboardEvent)=> {
    
            if (!this.inputReady)
                return
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
      
                if (this.playerText.text.length > 0)
                    this.startgame()
    
            }
            else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
            {
                if (this.playerText.text.length > 0)
                    this.playerText.setText(this.playerText.text.slice(0,-1))
            }
            else if (event.keyCode > 31 && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122))
            {        

            }
            else 
            {
                    if (event.key.length == 1) 
                    {
                        this.playerText.setText(this.playerText.text + event.key.toUpperCase())
                        this.pulseButton(this.canLogin())
                    }
            }
            
            
        });
    
       
    
      
            

    }

    create(data: IGameSceneData) {           
      
        this.inputReady = false
       
		const { server, onGameOver, currentcells, multiplayer } = data

        let background = this.add.image(0,0,'loginbackground').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)

        this.createui()



        this.cameras.main.fadeIn(1000)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

            this.createKeyboard()
            this.inputReady =true
        })
		
		
		this.server = server
		

        this.multiplayer = multiplayer

		this.onGameOver = onGameOver

		

        let player = BKG.Storage.get('BKG-player')
        this.playerText.setText(player)
        if (player !== '' && player !== undefined) {
            this.startgame()		   
        }

        

			
		
	/*
		this.particles = this.add.particles('flares');
	
	    this.emitter = this.particles.createEmitter({
			frame: { frames: [ 'green', 'purple', 'blue' ], cycle: true },
			x: BKG.world.centerX,
			y: this.playerText?.y,
			scale: { start: 0.5, end: 0 },
			blendMode: 'ADD',
			emitZone: { type: 'edge', source: new Phaser.Geom.Ellipse(0, 0, 600, 200), quantity: 48, yoyo:false, }
		});
		*/
		
	
		
    }

    private pulseButton(enabled: boolean)
    {

        if (enabled){

            this.startbtn?.setFrame(0)
            this.pulseBtn?.play()
        } else {
            this.pulseBtn?.pause()
            this.startbtn?.setFrame(3)

            this.tweens.add({ targets: this.startbtn, duration: 1000, scale: 1, ease: 'Sine.easeInOut' })
            
            
        }
    }

	private startgame() {
      
        if (this.particles)
            this.particles.destroy()
       
        this.loggedIn = true
        
        BKG.Storage.set('BKG-player',this.playerText.text)
        //  Submit
	    this.scene.start('story', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
            multiplayer: this.multiplayer
        })
    }


	

}







