import Phaser from 'phaser'
import { IGameSceneData } from '~/types/scenes'
import { BKG } from '../../types/BKG'
export default class Story extends Phaser.Scene
{
    player1Nametag?: Phaser.GameObjects.Image
    player1img?: Phaser.GameObjects.Image
    player1name?: Phaser.GameObjects.Text

    constructor(){
        super('story')
    }

    create(data: IGameSceneData)
    {

        const { server, onGameOver, currentcells, multiplayer } = data

        this.add.image(0,0,'levelmodebg').setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0)
        var fontTitle = { font: '42px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 6 }  
        var fontMenu =  {font: '32px ' + BKG.text['FONT'], fill: '#fff', stroke: 'black', strokeThickness: 6}

        let name = BKG.Storage.get('BKG-player')
        this.add.text(BKG.world.centerX,50,`Hi ${name}, \n Please select game mode`, fontTitle).setOrigin(0.5,0).setAlign('center')


        this.player1Nametag = this.add.image(100, 125, 'nametag').setOrigin(0.5).setAlpha(0.7)

		this.player1img = this.add.image(100, 50, 'player').setOrigin(0.5, 0.5).setAlpha(0.7).setInteractive().on('pointerup',()=>{
            
            BKG.Storage.set('BKG-player','')
            this.scene.stop()
            this.scene.start('login', {
                server: server,
                onGameOver: onGameOver,
                currentcells: null,
            })
        })
	
		this.player1name = this.add.text(100, 120, BKG.Storage.get('BKG-player'), fontMenu).setOrigin(0.5, 0.5)

        let singleMenuItem = this.add.image(BKG.world.centerX,BKG.world.centerY - 100, 'singleplayer_button')
        .setOrigin(0.5).on('pointerup',()=>{
            this.scene.start('levelselect', {
                server: server,
                onGameOver: onGameOver,
                currentcells: null,
                multiplayer: false
            })
        }).on('pointerover',()=>{
            this.tweens.add({ targets:  singleMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' })

        }).on('pointerout', ()=> {
            this.tweens.add({ targets:  singleMenuItem, duration: 500, scale: 1, ease: 'Sine.easeInOut' })
           
        })
        



        let multiMenuItem = this.add.image(BKG.world.centerX,BKG.world.centerY + 100, 'multiplayer_button')
        .setOrigin(0.5).on('pointerup',()=>{
            this.scene.start('game', {
                server: server,
                onGameOver: onGameOver,
                currentcells: null,
                level: 'level1',
                multiplayer: true
            })
        }).on('pointerover',()=>{
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' })

        }).on('pointerout', ()=> {
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1, ease: 'Sine.easeInOut' })
           
        })

        this.tweens.add({targets: multiMenuItem, angle: multiMenuItem.angle-2, duration: 1100, ease: 'Sine.easeInOut' });
        this.tweens.add({targets: multiMenuItem, angle: multiMenuItem.angle+3, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

        this.tweens.add({targets: singleMenuItem, angle: singleMenuItem.angle+4, duration: 1000, ease: 'Sine.easeInOut' });
        this.tweens.add({targets: singleMenuItem, angle: singleMenuItem.angle-1, duration: 1500, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

            multiMenuItem.setInteractive()
            singleMenuItem.setInteractive()
        })
		
        this.cameras.main.fadeIn(500, 0, 0, 0)
     
      
    }


}
