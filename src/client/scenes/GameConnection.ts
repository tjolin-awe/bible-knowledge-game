import Phaser from 'phaser'
import { BKG, Button } from '../../types/BKG'
import {  IGameSceneData } from '../../types/scenes'

export default class GameConnection extends Phaser.Scene
{
	
    
	private textGameServer!: Phaser.GameObjects.Text 
    private letters: { display: Phaser.GameObjects.Text, letter: string }[] = []
    private buttonBack?: Button
 
	constructor()
	{
		super('gameconnection')
	}

    
    private createui() {

       
    
        var fontTitle = { font: '42px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 6 }  
      	var fontName = {font: '72px ' + BKG.text['FONT'], fill: '#ffffff'}

        if (this.game.device.os.desktop){
            this.add.text(BKG.world.centerX, 30, BKG.text['server-address'], fontTitle).setOrigin(0.5)
            this.textGameServer = this.add.text(BKG.world.centerX, 100,'', fontName).setOrigin(0.5)
           
      
        }
        else {
       
            this.add.text(BKG.world.centerX, 100, BKG.text['server-address'], fontTitle).setOrigin(0.5)
            this.textGameServer = this.add.text(BKG.world.centerX, 250,'', fontName).setOrigin(0.5)
          
        }

        this.textGameServer.setText(BKG.Storage.get('gameserver'))
        
        this.add.text(BKG.world.centerX, BKG.world.height - 50, 'Default',fontName).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerup',()=>{

            this.textGameServer.setText('34.72.31.244')
        })

         this.createKeyboard()
     
    }

    private canLogin()
    {
        return this.textGameServer?.text.length > 0
        
    }

    private createKeyboard() {

        var chars = [
            [ '0','1', '2', '3', '4', '5', '6', '7', '8', '9']
        ];
        var cursor = { x: 0, y: 0 };
        
        var fontKeys =  { font: '62px '+ BKG.text['FONT'], fill: '#000', stroke: '#ffffff', strokeThickness: 5 };
	
        let input =  this.add.text(BKG.world.centerX, BKG.world.centerY - BKG.world.centerY / 3 , 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-', fontKeys).setOrigin(0.5).setVisible(false)


        
       let textline = '012345=6789.';
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
        
        console.log(`${nextLetterX}, ${nextLetterY}`)
    
     
        let letter = this.add.text(nextLetterX, nextLetterY , textline[i], fontKeys).setOrigin(0.5).setInteractive()
    
        letter.on('pointerover', ()=> {
            this.tweens.add({ targets: letter, duration: 200, scale: 1.7, ease: 'Sine.easeInOut'});

        })
        
        letter.on('pointerout',()=> {
            this.tweens.add({ targets: letter, duration: 200, scale: 1, ease: 'Sine.easeInOut' });

        })

        letter.on('pointerup',()=> {
            
           
            this.textGameServer.setText(this.textGameServer.text + letter.text)
            BKG.Sfx.play('click')
    
           
          
            
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
            this.textGameServer.setText(this.textGameServer.text.slice(0,-1))
        
        BKG.Sfx.play('click')


      
        
    })
    
      //  let input = this.add.bitmapText(BKG.world.centerX, BKG.world.centerY - BKG.world.centerY / 3, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20).setOrigin(0.5)
        input.setInteractive()
    
      
         
        this.input.keyboard.on('keyup', (event: KeyboardEvent)=> {
    
          
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                
                
    
            }
            else if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
            {
                if (this.textGameServer.text.length > 0)
                    this.textGameServer.setText(this.textGameServer.text.slice(0,-1))
            }
            else if (event.keyCode > 31 && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122))
            {        

            
                    if (event.key.length == 1) 
                        this.textGameServer.setText(this.textGameServer.text + event.key)
                        
                    
            }
            else if (event.keyCode == 46){
                this.textGameServer.setText(this.textGameServer.text + event.key)                   
            }
            
        });
    
       
    
      
            

    }

    create(data: IGameSceneData) {           
      
        
		const { server, onGameOver, currentcells, multiplayer } = data

       
        let background = this.add.image(0,0,'loginbackground').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)


        this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
        this.buttonBack.setOrigin(0, 0);
        this.buttonBack.y = -this.buttonBack.height - 20;
        this.tweens.add({ targets: this.buttonBack, y: 20, duration: 500, ease: 'Back' });

        let restart = new Button(BKG.world.centerX, BKG.world.centerY - 100,'button-restart', this.changeServer,this)


        this.createui()



        this.cameras.main.fadeIn(1000)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => {

            

        })
		
    }

    changeServer() {
        BKG.Sfx.play('click')
    
        let server = BKG.Storage.get('gameserver')
      
            BKG.Storage.set('gameserver', this.textGameServer.text)
            location.reload()
        
    }
 
	clickBack() {
        BKG.Sfx.play('click')
    
        BKG.fadeOutScene('settings', this);

    }


	

}







