import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer } from '../../types/ITicTacToeState'
import type Server from '../services/Server'
import { text } from 'express'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import Bootstrap from './Bootstrap'
import { BKG, Button } from '../../types/BKG'




export default class Title extends Phaser.Scene {
    private server?: Server
    private sprites: {s: Phaser.GameObjects.Image, r: number}[] =[];
    
    constructor() {
        super('title')
    }

    init() {
       
    }

    private loggedIn: boolean = false
    preload() {

        this.load.image('background', 'assets/background.png')
        this.load.image('titlebackground', 'assets/loginbackground.png')
        this.load.image('bible_img', 'assets/bible_img.png')
        this.load.image('sparkle1', 'assets/sparkle1.png')
        this.load.image('buttonbase','assets/buttonbase.png')
        this.load.spritesheet('button-start', 'assets/button-start.png', {frameWidth:180,frameHeight:180})
        this.load.spritesheet('button-settings', 'assets/button-settings.png', {frameWidth:80,frameHeight:80})
     

    }
    private onGameOver?: (data: IGameOverSceneData) => void
    private inputtext: string = ""
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter | undefined
    create(data: IGameSceneData) {


        Bootstrap.openingmusic = this.sound.add("opening", { loop: true, volume: 0.3});
		Bootstrap.openingmusic?.resume();
        let fontTitle = {font: '62px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6}
      
        
        let click = this.sound.add('click')
	
        


        const { server, onGameOver, currentcells } = data




   

        this.server = server




        this.onGameOver = onGameOver


        let background = this.add.image(0, 0, 'background').setOrigin(0.5,0)
        if (this.game.device.os.desktop) {
           background = this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(this.game.scale.width, this.game.scale.height)
        }
      
  
        let bible = this.add.image(BKG.world.centerX,BKG.world.centerY,'bible').setOrigin(0.5)

        let title = this.add.text(BKG.world.centerX, 30, "Bible\nKnowledge Games", fontTitle).setWordWrapWidth(this.game.scale.width - 100)
        title.setOrigin(0.5,0).setAlign('center')

      
        let startbtn = new Button(BKG.world.width-20, BKG.world.height-20,'button-start', this.login,this,false).setOrigin(1,1)
      //  startbtn.setInteractive().on('pointerup',()=>{
      //      click.play()
       ///     this.login(false)
       // })

        this.tweens.add({ targets: bible, duration: 2000, scale: 1.1, ease: 'Sine.easeInOut', yoyo:true, loop:-1 });
        
        if (!this.game.device.os.desktop)
        this.tweens.add({ targets: background, x:200, y:-100,  duration: 10000, ease: 'Sine.easeInOut', yoyo:true, loop:-1 });
        
        startbtn.x = BKG.world.width+startbtn.width+20;
        this.tweens.add({targets: startbtn, x: BKG.world.width-20, duration: 500, ease: 'Back'});
        
        let buttonSettings = new Button(20, 20, 'button-settings', this.settings, this, false);
        buttonSettings.setOrigin(0, 0);

        buttonSettings.y = buttonSettings.height-20
        this.tweens.add({targets: buttonSettings, y: 20, duration: 500, ease: 'Back'})

        //let bible = this.add.image(screenCenterX - screenCenterX / 2, screenCenterY, 'bible_img').setOrigin(0,0.5).setScale(0.9)

        
        //this.tweens.add({ targets: bible, angle: title.angle + 10, duration: 1000, scale: 1.1, ease: 'Sine.easeInOut' });


        //  Apply the shadow to the Stroke only
        //title.setShadow(2, 2, 'black', 2, true, false)


      
        let multiMenuItem = this.add.text(BKG.world.centerX, startbtn.y + 300, 'Multiplayer',fontTitle).setFontSize(48).setOrigin(0.5)

        let grow = this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' }).pause()
        let shrink = this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' }).pause()
      
        multiMenuItem.setInteractive().on('pointerover', () => {
            // this.tweens.add({targets: playMenuItem, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
            // this.tweens.add({targets: playMenuItem, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });  
            multiMenuItem.setColor('blue')
            grow.restart()
            shrink.stop()


        })

        multiMenuItem.on('pointerout', () => {
            // this.tweens.add({targets: playMenuItem, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
            // this.tweens.add({targets: playMenuItem, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });  
            multiMenuItem.setColor('white')
            grow.stop()
            shrink.restart()

        })

      

      

       

        multiMenuItem.on('pointerup', () => {       
            click.play()
            this.login(true)
        })



        this.input.keyboard.on('keydown', this.handleKey, this);

    
        
        //this.add.image(400, 300, 'logo').setBlendMode(Phaser.BlendModes.SCREEN);
    }

    update ()
    {
        
    }

    handleKey(e: { code: any }) {
        switch(e.code) {
           
            case 'Enter': {
                this.login(false);
                break;
            }
            default: {}
        }
    }

    private login: (multiplayer: boolean) => void
    = (multiplayer) => 

        this.scene.start('login', {
                server: this.server,
                onGameOver: this.onGameOver,
                currentcells: null,
                name: this.inputtext,
                multiplayer: multiplayer

    })

    private settings: ()=> void 
    = () => this.scene.start('settings', { 
    })

    

}





