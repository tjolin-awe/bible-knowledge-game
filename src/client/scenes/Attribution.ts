import { BKG, Button } from "../../types/BKG"

export default class Attribution extends Phaser.Scene
{

    constructor(){
        super('attribution')
    }

    private buttonBack?: Button
    create()
    {
        var fontSubtitle = { font: '22px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
        var fontSmall = { font: '16px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 4, align: 'center' };
      
        this.add.image(0,0,'overlay').setDisplaySize(BKG.world.width, BKG.world.height).setOrigin(0)

        this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this)
        this.buttonBack.setOrigin(0, 0);
        this.buttonBack.y = -this.buttonBack.height - 20;
        this.tweens.add({ targets: this.buttonBack, y: 20, duration: 500, ease: 'Back' })


        let startx = 150
        let starty = 10

        this.add.text(startx,starty,'MUSIC',fontSubtitle)
        this.add.text(startx,starty+30, 'Music Composed/Authored by Matthew Pablo - CC-BY-SA 3.0',fontSmall)
        this.add.text(startx,starty+50, 'http://www.matthewpablo.com',fontSmall).setInteractive({useHandCursor: true}).setColor('lightblue').on('pointerup',()=>{
            window.top.location.href = 'http://www.matthewpablo.com'
        })
        this.add.text(startx,starty+80,'GAME TEMPLATE', fontSubtitle)
        this.add.text(startx,starty+110, 'Mobile Template by Enclave Games - CC BY-SA 3.0', fontSmall)
        this.add.text(startx,starty+130, 'https://github.com/EnclaveGames/Enclave-Phaser-Template/', fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
            window.top.location.href = 'https://github.com/EnclaveGames/Enclave-Phaser-Template/'
        })

        this.add.text(startx,starty+160,'ARTWORK',fontSubtitle)
        this.add.text(startx,starty+190, 'Bible Image, https://www.freechristianillustrations.com/ - used with permission',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
            window.top.location.href = 'https://www.freechristianillustrations.com/'
        })


        this.add.text(startx,starty+210, 'Wooden Answer Background & Buttons, https://craftpix.net/ - OGA-BY 3.0', fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
            window.top.location.href = 'https://craftpix.net/'
        })
        this.add.text(startx,starty+230, 'Single+Multi player Button Image, Dan Sevenstar - CC-BY-SA 3.0', fontSmall)
        this.add.text(startx,starty+250, 'Bible Knowledge Games Logo, Ray Hayward', fontSmall)
        this.add.text(startx,starty+270, 'UI Buttons, https://github.com/EnclaveGames/Enclave-Phaser-Template/ - CC BY-SA 3.0', fontSmall)
        this.add.text(startx,starty+290, 'Loading/Settings Background, https://github.com/EnclaveGames/Enclave-Phaser-Template/ - CC BY-SA 3.0', fontSmall).setColor('lightblue').on('pointerup',()=> {
            window.top.location.href = 'https://github.com/EnclaveGames/Enclave-Phaser-Template/'

        this.add.text(startx,starty+310, 'Answer Images, https://www.freebibleimages.org/ - used with permission',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'https://www.freebibleimages.org/'
            })
            this.add.text(startx,starty+330, 'Bible Title Image,Background vector created by macrovector - www.freepik.com',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'https://www.freepik.com/vectors/background'
            })

            this.add.text(startx,starty+350, 'Level Complete Background, Designed by pikisuperstar / Freepik',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'https://www.freepik.com/vectors/background'
            })
            this.add.text(startx,starty+370, 'Level Lock Image, Designed by Freepik',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'http://www.freepik.com'
            })
            this.add.text(startx,starty+390, 'Level Lock Image, Designed by Freepik',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'http://www.freepik.com'
            })
            this.add.text(startx,starty+410, 'Abstract Blue Background, Background photo created by fanjianhua - www.freepik.com',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'https://www.freepik.com/photos/background'
            })

            this.add.text(startx,starty+430, 'Login/Server Background, Pattern vector created by studiogstock - www.freepik.com',fontSmall).setInteractive({useHandCursor:true}).setColor('lightblue').on('pointerup',()=> {
                window.top.location.href = 'https://www.freepik.com/vectors/pattern'
            })

            
            
            
    })
    }

    clickBack(){
      

        BKG.Sfx.play('click');

        BKG.fadeOutScene('settings', this);
    }
}
