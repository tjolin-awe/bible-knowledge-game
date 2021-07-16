import type Server from '../services/Server'
import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import { BKG } from '../../types/BKG'
export default class LevelSelect extends Phaser.Scene {

    private server?: Server

    private multiplayer: boolean
    private onGameOver?: (data: IGameOverSceneData) => void
    private particles?: Phaser.GameObjects.Particles.ParticleEmitterManager
    private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
    private backbtn?: Phaser.GameObjects.Image
    private nextbtn?: Phaser.GameObjects.Image
    private levelBackground?: Phaser.GameObjects.Image
    private levelFrame?: Phaser.GameObjects.Image
    private levelTitle?: Phaser.GameObjects.Text

    constructor() {
        super('levelselect')
        this.multiplayer = false
    }




    create(data: IGameSceneData) {

        const { server, onGameOver, currentcells, multiplayer } = data

        this.server = server
        this.onGameOver = onGameOver
     
        this.multiplayer = multiplayer
        this.add.image(0, 0, 'levelmodebg').setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0)
        .setPipeline('Light2D')
        var fontTitle = { font: '42px ' + BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 6 }
        var fontMenu = { font: '42px ' + BKG.text['FONT'], fill: '#fff', stroke: 'black', strokeThickness: 6 }
        this.particles = this.add.particles('green');

        this.add.text(BKG.world.centerX, 50, `Select a Level`, fontTitle).setOrigin(0.5, 0).setAlign('center')

        let levels = 6

        let xpos = BKG.world.width / 4
        let ypos = BKG.world.centerY

        if (this.game.device.os.desktop) {
            ypos = BKG.world.centerY - 100
        } else {
            ypos = BKG.world.centerY - 200
        }

        let index = BKG.Storage.get('BKG-active-level');

        var light  = this.lights.addLight(BKG.world.centerX, BKG.world.centerY, 200);
        this.lights.setAmbientColor(0xfdf3c6)
        this.lights.enable()
         this.levelBackground = this.add.image(BKG.world.centerX, BKG.world.centerY, 'level1').setOrigin(0.5).setPipeline('Light2D')
     	
        
        this.levelFrame = this.add.image(BKG.world.centerX, BKG.world.centerY + 30, 'level1').setOrigin(0.5).setVisible(false)
      
        this.levelTitle = this.add.text(BKG.world.centerX, BKG.world.centerY + 60, `Level`, fontMenu).setOrigin(0.5, 0.5).setVisible(false)
       

        this.backbtn = this.add.image(BKG.world.centerX / 3, BKG.world.centerY, 'backbtn').setOrigin(0.5)
        this.nextbtn = this.add.image(BKG.world.width - BKG.world.centerX / 3, BKG.world.centerY, 'nextbtn').setOrigin(0.5)
      
        this.loadLevel(index)


        this.backbtn.on('pointerup', () => {
            let newLevel = Number.parseInt(BKG.Storage.get('BKG-active-level')) - 1

           
            BKG.Storage.set('BKG-active-level', newLevel)
            this.loadLevel(newLevel)
        })

        this.nextbtn.on('pointerup', () => {
            let newLevel = Number.parseInt(BKG.Storage.get('BKG-active-level')) + 1
            BKG.Storage.set('BKG-active-level', newLevel)
            this.loadLevel(newLevel)
        })
        

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

            this.backbtn?.setInteractive({ useHandCursor: true })
            this.nextbtn?.setInteractive({ useHandCursor: true })
            this.levelFrame?.setInteractive({ useHandCursor: true })
    

        })
        this.cameras.main.fadeIn(500)

    }



    private loadLevel(index: number) {

        this.emitter?.stop()

        if (index <= 1) {
            this.backbtn?.setVisible(false)
        } else {
            this.backbtn?.setVisible(true)
        }

        if (index >= 6) {
            this.nextbtn?.setVisible(false)
        } else {
            this.nextbtn?.setVisible(true)
        }




        let unlocked = BKG.Storage.get(`BKG-level-${index}`)

        let img = unlocked ? `level${index}_img` : 'levellocked'

        this.levelFrame?.setTexture(img).setPipeline('Light2D').setVisible(true)
        this.levelTitle?.setText(`Level ${index}`).setDepth(999).setPipeline('Light2D').setVisible(true)
        this.levelFrame?.removeAllListeners();
        if (!unlocked)
        {
          
        } 
        else {
        this.levelFrame?.on('pointerup', () => {
            if (unlocked) {

                console.log(`level${index}`)
                
              
               
                    this.scene.start('game', {
                        server: this.server,
                        onGameOver: this.onGameOver,
                        currentcells: null,
                        level: `level${index}`,
                        multiplayer: false
                    })
                
                
            }
        }).on('pointerover', () => {


           // this.tweens.add({ targets: [this.levelBackground, this.levelFrame, this.levelTitle], duration: 500, scale: 1.1, ease: 'Sine.easeInOut' })

        }).on('pointerout', () => {

            //this.tweens.add({ targets: [this.levelBackground, this.levelFrame, this.levelTitle], duration: 500, scale: 1, ease: 'Sine.easeInOut' })

        })
    }


        if (unlocked) {


            this.emitter = this.particles?.createEmitter({
                speed: 600,
                
                scale: { start: 1, end: 0 },
                blendMode: 'ADD',
                
            });

            if (this.levelFrame)
                this.emitter?.startFollow(this.levelFrame)

        }
        else {

           
                this.emitter?.stop()
                //this.particles?.destroy()
            


        }
       

    }


}







