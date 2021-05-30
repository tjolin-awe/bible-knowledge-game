import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import ITicTacToeState, { GameState, ICell, IPlayer } from '../../types/ITicTacToeState'
import type Server from '../services/Server'
import { text } from 'express'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import Bootstrap from './Bootstrap'




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


        this.load.image('titlebackground', 'assets/loginbackground.png')
        this.load.image('bible_img', 'assets/bible_img.png')
        this.load.image('sparkle1', 'assets/sparkle1.png')

    }
    private onGameOver?: (data: IGameOverSceneData) => void
    private inputtext: string = ""
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter | undefined
    create(data: IGameSceneData) {

       
       
        let click = this.sound.add('click')
	


        const { server, onGameOver, currentcells } = data




        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.server = server




        this.onGameOver = onGameOver



        let background = this.add.image(0, 0, 'titlebackground').setOrigin(0)
        background.displayWidth = this.game.scale.width
        background.displayHeight = this.game.scale.height


        let title = this.add.text(screenCenterX, screenCenterY / 4, "BIBLE KNOWLEDGE GAMES", { fontFamily: "impact", color: "white" }).setAlign('center').setOrigin(0.5).setFontSize(72)
        title.setFontStyle('bold').setWordWrapWidth(780).setStroke('black',16)

       
        let bible = this.add.image(screenCenterX - screenCenterX / 2, screenCenterY, 'bible_img').setOrigin(0,0.5).setScale(0.9)

        
        this.tweens.add({ targets: bible, angle: title.angle + 10, duration: 1000, scale: 1.1, ease: 'Sine.easeInOut' });


        //  Apply the shadow to the Stroke only
        title.setShadow(2, 2, 'black', 2, true, false)


        let playMenuItem = this.add.text(screenCenterX + screenCenterX / 4, screenCenterY, 'Play').setFontFamily('impact').setFontSize(48).setOrigin(0,0.5).setShadow(2,2,'black')

        let multiMenuItem = this.add.text(screenCenterX + screenCenterX / 4, screenCenterY + 100, 'Multiplayer').setFontFamily('impact').setFontSize(48).setOrigin(0,0.5).setShadow(2,2,'black')

        multiMenuItem.setInteractive().on('pointerover', () => {
            // this.tweens.add({targets: playMenuItem, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
            // this.tweens.add({targets: playMenuItem, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });  
            multiMenuItem.setColor('blue')
            this.tweens.killAll()
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' });
            this.tweens.add({ targets:  playMenuItem, duration: 500, scale: 1.0, ease: 'Sine.easeInOut' });



        })

        multiMenuItem.on('pointerout', () => {
            // this.tweens.add({targets: playMenuItem, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
            // this.tweens.add({targets: playMenuItem, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });  
            multiMenuItem.setColor('white')
            this.tweens.killAll()
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.0, ease: 'Sine.easeInOut' });


        })

        playMenuItem.setInteractive().on('pointerover', () => {
            playMenuItem.setColor('blue')
            this.tweens.killAll()
            this.tweens.add({ targets:  playMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' });
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.0, ease: 'Sine.easeInOut' });


        })


        playMenuItem.on('pointerout', () => {
            playMenuItem.setColor('white')
            this.tweens.killAll()
            this.tweens.add({ targets:  playMenuItem, duration: 500, scale: 1, ease: 'Sine.easeInOut' });
            
        })

        playMenuItem.on('pointerup', () => {

            click.play()
            this.login(false)
        })

        multiMenuItem.on('pointerup', () => {       
            click.play()
            this.login(true)
        })

        
        
        //this.add.image(400, 300, 'logo').setBlendMode(Phaser.BlendModes.SCREEN);
    }

    update ()
    {
        
    }

    private login(multiplayer: boolean) {
        this.scene.start('login', {
            server: this.server,
            onGameOver: this.onGameOver,
            currentcells: null,
            name: this.inputtext,
            multiplayer: multiplayer

        })

    }
}





