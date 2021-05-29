import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import type Server from '../services/Server'

export default class Login extends Phaser.Scene
{
	private server?: Server 
    private inputname: string = ""
	private loggedIn: boolean = false
    private multiplayer: boolean = false

	private onGameOver?: (data: IGameOverSceneData) => void
	private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
    private particles?: Phaser.GameObjects.Particles.ParticleEmitterManager

	constructor()
	{
		super('login')
	}

	init()
	{
		
	}

    


	preload() {
        
        
		this.load.image('block', 'assets/input/block.png');
    	this.load.image('rub', 'assets/input/rub.png');
    	this.load.image('end', 'assets/input/end.png');
    	this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');

		this.load.image('bible','assets/bible_img.png')
		this.load.image('loginbackground','assets/loginbackground.png')
       
    }

    
    create(data: IGameSceneData) {           
       

		
		const { server, onGameOver, currentcells, name, multiplayer } = data

        

		
		
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height /2;
   
		this.server = server
		

        this.multiplayer = multiplayer

		this.onGameOver = onGameOver

		if (this.loggedIn) {
			this.startgame()
		}

			
		let background = this.add.image(0,0,'loginbackground').setOrigin(0)
		background.displayWidth = this.game.scale.width
	    background.displayHeight = this.game.scale.height

		let title = this.add.text(screenCenterX,screenCenterY /4, "ENTER YOUR NAME", { fontFamily: "swiss921", color: "white" }).setAlign('center').setOrigin(0.5).setFontSize(52)
		title.setFontStyle('bold').setWordWrapWidth(780)

       
	
       
		//  Apply the shadow to the Stroke only
		title.setShadow(2, 2, 'black', 2, true, false)
	
		const playerText = this.add.text(screenCenterX, screenCenterY + screenCenterY / 2, 'Enter Name',{ fixedWidth: 200, fixedHeight: 38}).setOrigin(0.5)
		playerText.setBackgroundColor('green').setAlign('center').setFontSize(32).setFontFamily('impact')

		
	

		const subtitle = this.add.text(playerText.x, playerText.y + 50,'press [ENTER] to start').setOrigin(0.5).setAlign('center')
	

    
    var chars = [
        [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
        [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
        [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
    ];
    var cursor = { x: 0, y: 0 };
    
	
    let input = this.add.bitmapText(screenCenterX, screenCenterY - screenCenterY / 3, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20).setOrigin(0.5)
    input.setInteractive()

    let rub = this.add.image(input.x - input.width * 0.5 + 430, input.y - input.height * 0.5 + 148, 'rub')
    let end = this.add.image(input.x - input.width *0.5 + 482, input.y - input.height * 0.5 + 148, 'end')

    var block = this.add.image(input.x - 10, input.y - 2, 'block').setOrigin(0)
    let _this = this
    this.input.keyboard.on('keyup', function (event) {

        if (event.keyCode === 37)
        {
            //  left
            if (cursor.x > 0)
            {
                cursor.x--;
                block.x -= 52;
            }
        }
        else if (event.keyCode === 39)
        {
            //  right
            if (cursor.x < 9)
            {
                cursor.x++;
                block.x += 52;
            }
        }
        else if (event.keyCode === 38)
        {
            //  up
            if (cursor.y > 0)
            {
                cursor.y--;
                block.y -= 64;
            }
        }
        else if (event.keyCode === 40)
        {
            //  down
            if (cursor.y < 2)
            {
                cursor.y++;
                block.y += 64;
            }
        }
        else if (event.keyCode === 13 || event.keyCode === 32)
        {
            //  Enter or Space
            if (cursor.x === 9 && cursor.y === 2 && _this.inputname.length > 0)
            {
                _this.startgame()
            }
            else if (cursor.x === 8 && cursor.y === 2 && _this.inputname.length > 0)
            {
                //  Rub
                _this.inputname = _this.inputname.substr(0, _this.inputname.length - 1);

                playerText.text = _this.inputname;
            }
            else if (name.length < 3)
            {
                //  Add
                _this.inputname = _this.inputname.concat(chars[cursor.y][cursor.x]);

                playerText.text = _this.inputname;
            }
        }

    });

    input.on('pointermove', function (pointer, x, y) {

        var cx = Phaser.Math.Snap.Floor(x, 52, 0, true)
        var cy = Phaser.Math.Snap.Floor(y, 64, 0, true)
        var char = chars[cy][cx];

        cursor.x = cx;
        cursor.y = cy;

        block.x = input.x - 10 + (cx * 52 - input.width * 0.5)
        block.y = input.y - 2 + (cy * 64 - input.height * 0.5)
 
    }, this);

    input.on('pointerup', function (pointer, x, y) {

        var cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
        var cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
        var char = chars[cy][cx];

        cursor.x = cx;
        cursor.y = cy;

       block.x = input.x - input.width / 2 - 10 + (cx * 52);
       block.y = input.y - input.height / 2 - 2 + (cy * 64);

        if (char === '<' && _this.inputname.length > 0)
        {
            //  Rub
            _this.inputname = _this.inputname.substr(0, _this.inputname.length - 1);

            playerText.text = _this.inputname;
        }
        else if (char === '>' && _this.inputname.length > 0)
        {
          _this.startgame()
        }
        else if (_this.inputname.length < 10)
        {
            //  Add
            _this.inputname = _this.inputname.concat(char);

			playerText.setText(_this.inputname)
			
        }

    }, this);
		
		
		
	
		this.particles = this.add.particles('flares');
	
	    this.emitter = this.particles.createEmitter({
			frame: { frames: [ 'green', 'purple', 'blue' ], cycle: true },
			x: screenCenterX,
			y: playerText.y,
			scale: { start: 0.5, end: 0 },
			blendMode: 'ADD',
			emitZone: { type: 'edge', source: new Phaser.Geom.Ellipse(0, 0, 600, 200), quantity: 48, yoyo:false, }
		});
		
		
	
		
    }

	private startgame() {
      
        if (this.particles)
            this.particles.destroy()
       
        this.loggedIn = true
        //  Submit
	    this.scene.start('game', {
			server: this.server,
			onGameOver: this.onGameOver,
			currentcells: null,
			name: this.inputname,
            multiplayer: this.multiplayer
        })
    }


	

}







