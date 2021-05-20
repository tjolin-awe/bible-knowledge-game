import Phaser from 'phaser'
import { IGameOverSceneData, IGameSceneData, IQuestionData } from '../../types/scenes'
import ITicTacToeState, { ICell, GameState } from '../../types/ITicTacToeState'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import type Server from '../services/Server'
import { text } from 'express'
import { Answer, Cell } from '../../server/TicTacToeState'
import AnswerScreen from './AnswerScreen'

export default class Question extends Phaser.Scene
{
    
    private server?: Server
	constructor()
	{
		super('question')
	}

	init()
	{
		
	}


	preload() {

		this.load.image('question_background', 'assets/question_background.png')
	
		this.load.atlas('flood', 'assets/blobs.png', 'assets/blobs.json');
	}

    
    
    startCounter:number = 7
    start_text?: Phaser.GameObjects.Text
    emitter?:Phaser.GameObjects.Particles.ParticleEmitter

    answers: { name: string, display: Phaser.GameObjects.Text, correct: boolean, answer: Answer}[] = []
 
    private countdown()
    {
        this.startCounter--;
        this.start_text?.setText(this.startCounter.toString())
        this.time.delayedCall(1000, ()=> {
            if (this.startCounter > 1)
                this.countdown()
            else {


               
                this.start_text?.setVisible(false)
                this.emitter?.stop()
                this.timeExpired = true


                if (this.hasBeenAnwswered)
                    return

                let correctAnswer
                for (let i =0; i < this.answers.length; i++){
                    if (this.answers[i].correct == true)
                    {                       
                        correctAnswer = this.answers[i].answer
                    } 
                }
                
                this.cameras.main.shake(500,0.01)
                const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
                const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

                let timeout = this.add.text(screenCenterX, 0,'TIME IS UP!').setFontFamily('impact').setFontSize(72).setShadow(4,4,'black',2,true).setOrigin(0.5).setColor('red')
                var tween = this.tweens.add({
                    targets: timeout,
                    y: 300,
                    ease: 'Bounce',
                    duration: 1000,
                    yoyo: false,
                    repeat: 0,
                    onStart: function () { console.log('onStart'); console.log(arguments); },
                    onComplete: function () { console.log('onComplete'); console.log(arguments); },
                    onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                    onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
                });
         
                this.time.delayedCall(2000, ()=> {


                    this.scene.stop()
                    this.scene.stop('answer')
                    this.scene.sleep('game')
                    this.scene.start('answer', {
                        server: this.server,
                        question: this.question,
                        answer: correctAnswer, 
                        correctAnswer: correctAnswer,
                        image : this.image,
                        timeout: true,
                        
                    })   
                })
            }
        })
    }

    timeExpired?: boolean 
    private question?: string
    private image?: string
    private hasBeenAnwswered: boolean = false
    private handlePlayerAnswered(answer: Answer)
	{


        if (this.hasBeenAnwswered == true || this.timeExpired == true)
            return 

        this.cameras.main.shake(500,0.01)

    

        this.hasBeenAnwswered = true
        console.log('handlePlayerAnswered')
        this.emitter?.stop()
        this.start_text?.setVisible(false)
        this.timeExpired = true
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.height - this.cameras.main.height /2;
        const screenBottomY = this.cameras.main.height - this.cameras.main.height /6;
 
        let playerobj = this.server?.players?.get(answer.player.toString())

            if (playerobj && answer.player != this.server?.playerIndex) {
                
                let playertext = this.add.text(0, screenBottomY,playerobj.name + '  has ANSWERED!').setFontFamily('impact').setFontSize(48).setShadow(4,4,'black',2,true).setOrigin(0,0).setColor('white')
                var tween = this.tweens.add({
                    targets: playertext,
                    x: 200,
                    ease: 'Elastic',
                    duration: 3000,
                    yoyo: false,
                    repeat: 0,
                    onStart: function () { console.log('onStart'); console.log(arguments); },
                    onComplete: function () { console.log('onComplete'); console.log(arguments); },
                    onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                    onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
                });

             
            }

        let correctAnswer
        for (let i = 0; i < this.answers.length; i++) {
        

            if (this.answers[i].correct == true){
                correctAnswer = this.answers[i].answer
            }
            if (this.answers[i].name == answer.name) {
               
                      
                        var _this = this
                        var tween2 = this.tweens.add({
                            targets: this.answers[i].display ,
                            x: screenCenterX,
                            y: screenCenterY,
                            ease: 'Linear',
                            duration: 1000,
                            yoyo: false,
                            repeat: 0,
                            onStart: function () { console.log('onStart'); console.log(arguments); },
                            onComplete: function () { 
                                console.log('onComplete'); 
                                console.log(arguments); 
                                let arrow = _this.add.image(_this.answers[i].display.x - _this.answers[i].display.width, _this.answers[i].display.y, 'flood', 'arrow-white').setOrigin(0.5)

                                _this.tweens.add({

                                    targets: arrow,
                                    x: '+=24',
                                    ease: 'Sine.easeInOut',
                                    duration: 900,
                                    yoyo: true,
                                    repeat: -1
        
                                });
        
                            },
                            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
                            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
                           
                        });

                       
                    }
                
                else {
                    this.physics.world.enable(this.answers[i].display)
                }
            }
        
       
        
       
      
      
            this.time.delayedCall(4000, ()=> {
            this.scene.stop('answer')
            this.scene.stop()
            this.scene.start('answer', {
                server: this.server,
                question: this.question,
                image: this.image,
                answer: answer,
                correctAnswer: correctAnswer,
                timeout: false
            })
        })

       
    }
       

	async create(data: IQuestionData)
	{
        document.addEventListener("visibilitychange", event => {
			if (document.visibilityState == "visible") {
			  console.log("tab is active -question")
              this.scene.stop()
              this.scene.wake('game')


			} else {
			  console.log("tab is inactive -question")
			  
				  
			}
		  })

        this.hasBeenAnwswered =false
            this.startCounter = 7
            this.answers = []
            const { server, question, image, answers, category, amount} = data
             this.server = server
             this.question = question
             console.log(image)
             this.image = image
            this.server?.onPlayerAnswered(this.handlePlayerAnswered, this)

           
            this.timeExpired = false
           
            this.lights.setAmbientColor(0x555555)
        	this.add.image(0,0,'question_background').setOrigin(0,0)

             

            const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
            const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height /2;
            let header = this.add.text(screenCenterX, 30, category).setOrigin(0.5).setFontFamily('impact')
            .setFontSize(42).setColor('#cd934a').setFontStyle('bold').setShadow(2,2,'black',2,true).setPipeline('Light2D')
            this.add.text(screenCenterX, 70, "FOR " + amount.toString()).setOrigin(0.5).setColor('#cd940a')
            .setFontFamily('swiss921').setFontSize(32).setFontStyle('bold').setShadow(2,2,'black',2,true)
            .setPipeline('Light2D')
            this.lights.addLight(screenCenterX - header.width / 2, 50, 280).setIntensity(2);
            this.lights.addLight(screenCenterX, 50, 280).setIntensity(3);
            this.lights.addLight(screenCenterX + header.width / 2, 50, 280).setIntensity(2);
            this.lights.disable().enable()
         
            this.add.text(screenCenterX, 150,question).setFontFamily('swiss921')
            .setFontSize(48).setShadow(2,2,'black',2,true).setOrigin(0.5).setFontStyle('bold')
            .setWordWrapWidth(this.cameras.main.width * 0.8).setAlign('center')
     

            
            let particles = this.add.particles('flares')
            this.emitter = particles.createEmitter({
                frame: 'green',
                x: 300, y: 250,
                lifespan: { min: 300, max: 400 },
                angle: { start: 0, end: 360, steps: 64 },
                speed: 300,
                quantity: 64,
                scale: { start: 0.2, end: 0.1 },
                frequency: 32,
                blendMode: 'ADD'
            });
            this.start_text = this.add.text(screenCenterX, screenCenterY, this.startCounter.toString()).setFontSize(120).setColor('white')
            .setStroke('black',12).setOrigin(0.5)

            this.emitter.startFollow(this.start_text)
            this.countdown()
           
            let i = 0
            const col1 = this.cameras.main.worldView.x + this.cameras.main.width / 4;
            const col2 = this.cameras.main.worldView.x + this.cameras.main.width - col1 
            const row1 = 350
            const row2 = 450
            answers.forEach((value: Answer, key: string)=> {

                let col,row = 0

                if (i == 0)
                {
                    col = col1
                    row = row1
                }
                else if (i == 1){
                    col = col2
                    row = row1
                }
                else if (i == 2) {
                    col = col1
                    row = row2
                }
                else if (i == 3) {
                    col = col2
                    row = row2
                }
            
                let display = this.add.text(col, row, value.name, { fontFamily: "swiss921" })
                .setFontSize(52).setStroke('black', 16).setShadow(2, 2, "black", 2, false, true)
                .setOrigin(0.5).setFontStyle('bold').setInteractive().on('pointerover', ()=>{
                    if (this.timeExpired == false)
                        display.setColor('#cd934a').setFontStyle('bold')
                }).on('pointerout', () => {
                    if (this.timeExpired == false)
                        display.setColor('white')
                }).on('pointerdown', ()=> {

                    console.log('clicked')
                
                    if (!this.hasBeenAnwswered)
                        this.server?.playerAnswer(this.server?.playerIndex, value.name, value.correct, amount)
                    else {
                        console.log('question has been answered already!')
                    }
                   
                })
                
                this.answers.push({
                    name: value.name,
                    display: display,
                    correct: value.correct,
                    answer: value
                })
                i++
            
            })

              
               
               
            
         

       
    }

}