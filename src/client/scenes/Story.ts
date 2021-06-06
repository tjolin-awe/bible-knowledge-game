import Phaser from 'phaser'
import { IGameSceneData } from '~/types/scenes'
import { BKG } from '../../types/BKG'
export default class Story extends Phaser.Scene
{

    constructor(){
        super('story')
    }

    create(data: IGameSceneData)
    {

        const { server, onGameOver, currentcells, name, multiplayer } = data

        this.add.image(0,0,'overlay').setDisplaySize(this.game.scale.width, this.game.scale.height).setOrigin(0)
        var fontTitle = { font: '42px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 6 }  
        var fontMenu =  {font: '48px ' + BKG.text['FONT'], fill: '#fff', stroke: 'black', strokeThickness: 6}

        this.add.text(BKG.world.centerX,30,'Select game mode', fontTitle).setOrigin(0.5)


        let singleMenuItem = this.add.text(BKG.world.centerX,BKG.world.centerY - 100, 'Single Player',fontMenu)
        .setOrigin(0.5).setInteractive().on('pointerup',()=>{
            this.scene.start('game', {
                server: server,
                onGameOver: onGameOver,
                currentcells: null,
                name:  name,
                multiplayer: false
            })
        }).on('pointerover',()=>{
            this.tweens.add({ targets:  singleMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' })

            singleMenuItem.setColor('#cd934a')
        }).on('pointerout', ()=> {
            this.tweens.add({ targets:  singleMenuItem, duration: 500, scale: 1, ease: 'Sine.easeInOut' })
            singleMenuItem.setColor('white')
        })
        



        let multiMenuItem = this.add.text(BKG.world.centerX,BKG.world.centerY + 100, 'Mulit Player',fontMenu)
        .setOrigin(0.5).setInteractive().on('pointerup',()=>{
            this.scene.start('game', {
                server: server,
                onGameOver: onGameOver,
                currentcells: null,
                name:  name,
                multiplayer: true
            })
        }).on('pointerover',()=>{
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1.2, ease: 'Sine.easeInOut' })
            multiMenuItem.setColor('#cd934a')
        }).on('pointerout', ()=> {
            this.tweens.add({ targets:  multiMenuItem, duration: 500, scale: 1, ease: 'Sine.easeInOut' })
            multiMenuItem.setColor('white')
        })
      
    }


}
