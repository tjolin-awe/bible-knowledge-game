import Phaser from 'phaser'
import { IQuestionData } from '../../types/scenes'
import type Server from '../services/Server'
import { Answer } from '../../server/TicTacToeState'
import Bootstrap from './Bootstrap'
import { BKG } from '../../types/BKG'
import Shuffle from 'phaser3-rex-plugins/plugins/utils/array/Shuffle'


export default class Question extends Phaser.Scene {

    private server?: Server

    private startCounter: number = 10
    private start_text?: Phaser.GameObjects.Text
    private emitter?: Phaser.GameObjects.Particles.ParticleEmitter
    private answers: { name: string, display: Phaser.GameObjects.Text, displaybg: Phaser.GameObjects.Image, correct: boolean, answer: Answer }[] = []


    constructor() {
        super('question')
    }

    init() {

    }



   

    private shuffle(array: [string, Answer][]) {
        var currentIndex = array.length, randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    private countdown() {
        this.startCounter--;
        this.start_text?.setText(this.startCounter.toString())
        this.time.delayedCall(1000, () => {
            if (this.startCounter > 1)
                this.countdown()
            else {



                this.start_text?.setVisible(false)
                this.emitter?.stop()
                this.timeExpired = true


                if (this.hasBeenAnwswered)
                    return

                let correctAnswer
                for (let i = 0; i < this.answers.length; i++) {
                    if (this.answers[i].correct == true) {
                        correctAnswer = this.answers[i].answer
                    }
                }

                this.cameras.main.shake(500, 0.01)

                BKG.Sfx.stopMusic('question-music')
                let fontTimeout = { font: '120px ' + BKG.text['GAMEFONT'], fill: 'red', stroke: 'black', strokeThickness: 24 }

                let timeout = this.add.text(BKG.world.centerX, 0, 'TIME IS UP!', fontTimeout).setOrigin(0.5)
                let self = this
                var tween = this.tweens.add({
                    targets: timeout,
                    y: BKG.world.centerY,
                    ease: 'Bounce',
                    duration: 1000,
                    yoyo: false,
                    repeat: 0,
                    onComplete: function () {
                        self.time.delayedCall(2000, () => {
                            self.scene.stop()
                            self.scene.stop('answer')
                            self.scene.sleep('game')
                            BKG.Sfx.playMusic('opening')

                            self.scene.start('answer', {
                                server: self.server,
                                question: self.question,
                                answer: correctAnswer,
                                correctAnswer: correctAnswer,
                                image: self.image,
                                timeout: true,
                            })
                        })
                    },

                });


            }
        })
    }

    private timeExpired?: boolean
    private question?: string
    private image?: string
    private hasBeenAnwswered: boolean = false
    private handlePlayerAnswered(answer: Answer) {

        BKG.Sfx.stopMusic('question-music')
        BKG.Sfx.play('answer-sound')
        if (this.hasBeenAnwswered == true || this.timeExpired == true)
            return

        this.cameras.main.shake(500, 0.01)



        this.hasBeenAnwswered = true

        this.emitter?.stop()
        this.start_text?.setVisible(false)
        this.timeExpired = true

        const screenBottomY = this.cameras.main.height - this.cameras.main.height / 6;

        let playerobj = this.server?.players?.get(answer.player)

        if (playerobj && answer.player != this.server?.playerId) {
            let fontAnswerPlayer = { font: '46px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }

            let playertext = this.add.text(0, screenBottomY, playerobj.name + '  has ANSWERED!', fontAnswerPlayer).setOrigin(0.5)
            var tween = this.tweens.add({
                targets: playertext,
                x: BKG.world.centerX,
                ease: 'Elastic',
                duration: 3000,
                yoyo: false,
                repeat: 0,

            });


        }

        let correctAnswer
        for (let i = 0; i < this.answers.length; i++) {


            this.answers[i].display.setColor('white')
            if (this.answers[i].correct == true) {
                correctAnswer = this.answers[i].answer
            }
            if (this.answers[i].name == answer.name) {


                this.answers[i].displaybg.setTexture('answerbutton_select')
                var self = this
                var tween2 = this.tweens.add({
                    targets: [this.answers[i].display, this.answers[i].displaybg],
                    x: BKG.world.centerX,
                    y: BKG.world.centerY,
                    ease: 'Linear',
                    duration: 1000,
                    yoyo: false,
                    repeat: 0,
                    onComplete: function () {

                        /*let arrow = _this.add.image(_this.answers[i].display.x - _this.answers[i].display.width, _this.answers[i].display.y, 'flood', 'arrow-white').setOrigin(0.5)

                        _this.tweens.add({

                            targets: arrow,
                            x: '+=24',
                            ease: 'Sine.easeInOut',
                            duration: 900,
                            yoyo: true,
                            repeat: -1
 
                        });*/

                        self.time.delayedCall(2000, () => {
                            self.scene.stop('answer')
                            self.scene.stop()
                         
                            self.scene.start('answer', {
                                server: self.server,
                                question: self.question,
                                image: self.image,
                                answer: answer,
                                correctAnswer: correctAnswer,
                                timeout: false
                            })
                        })

                    },
                });
            }

            else {
                this.physics.world.enable(this.answers[i].displaybg)
                this.physics.world.enable(this.answers[i].display)
            }
        }

    }


    create(data: IQuestionData) {

        let fontTitle = { font: '42px ' + BKG.text['FONT'], fill: '#cd934a', stroke: 'black', strokeThickness: 6 }
        let fontQuestion = { font: '48px ' + BKG.text['FONT'], fill: '#ffffff', stroke: 'black', strokeThickness: 6 }
        let fontAnswer = { font: '46px ' + BKG.text['FONT'], fill: 'white', stroke: 'black', strokeThickness: 6 }
        let fontTimeout = { font: '120px ' + BKG.text['FONT'], fill: '#cd934a', stroke: 'black', strokeThickness: 24 }

      
        BKG.Sfx.stopMusic('opening')
        BKG.Sfx.playMusic("question-music");

        BKG.Sfx.sounds['answer-sound'] = this.sound.add("player_answer")

        document.addEventListener("visibilitychange", event => {
            if (document.visibilityState == "visible") {

                this.scene.stop()
                this.scene.wake('game')


            } else {


            }
        })

        this.hasBeenAnwswered = false
        this.startCounter = 10
        this.answers = []
        const { server, question, image, answers, category, amount } = data
        this.server = server
        this.question = question

        this.image = image
        this.server?.onPlayerAnswered(this.handlePlayerAnswered, this)


        this.timeExpired = false

        this.lights.setAmbientColor(0x555555)
        this.add.image(0, 0, 'question_background').setOrigin(0, 0).setDisplaySize(this.game.scale.width, this.game.scale.height)



        let header = this.add.text(BKG.world.centerX, 30, category.toUpperCase(), fontTitle).setOrigin(0.5).setPipeline('Light2D')
        this.add.text(BKG.world.centerX, 70, "FOR " + amount.toString(), fontTitle).setOrigin(0.5).setPipeline('Light2D')

        this.lights.addLight(BKG.world.centerX - header.width / 2, 50, 280).setIntensity(2);
        this.lights.addLight(BKG.world.centerX, 50, 280).setIntensity(3);
        this.lights.addLight(BKG.world.centerX + header.width / 2, 50, 280).setIntensity(2);
        this.lights.disable().enable()

        this.add.text(BKG.world.centerX, 200, question, fontQuestion)
            .setWordWrapWidth(this.cameras.main.width * 0.8).setAlign('center').setOrigin(0.5)



        let particles = this.add.particles('flares')
        this.emitter = particles.createEmitter({
            frame: 'green',
            x: BKG.world.centerX, y: BKG.world.centerY,
            lifespan: { min: 300, max: 400 },
            angle: { start: 0, end: 360, steps: 64 },
            speed: 300,
            quantity: 64,
            scale: { start: 0.2, end: 0.1 },
            frequency: 32,
            blendMode: 'ADD'
        });
        this.start_text = this.add.text(BKG.world.centerX, BKG.world.centerY, this.startCounter.toString(), fontTimeout).setColor('white')
            .setStroke('black', 12).setOrigin(0.5)

        //this.emitter.startFollow(this.start_text)
        this.countdown()

        let i = 0
        const col1 = BKG.world.width / 4;
        const col2 = BKG.world.width - col1


        let row1 = BKG.world.centerY + 200


        let row2 = row1 + 150

        if (this.game.device.os.desktop) {
            row1 = 350
            row2 = 550
        }

        let answerarray = Array.from(answers)

        answerarray = this.shuffle(answerarray)
        answerarray.forEach((value: [string, Answer], index: number) => {

            let key = value[0]
            let answer = value[1]
            let col, row = 0

            if (i == 0) {
                col = col1
                row = row1
            }
            else if (i == 1) {
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

            let bg = this.add.image(col, row, 'answerbutton').setOrigin(0.5).setInteractive().on('pointerdown', () => {

                if (!this.hasBeenAnwswered)
                    this.server?.playerAnswer(answer.cellId, answer.id)
                else {
                    console.log('question has been answered already!')
                }
            })
            if (!this.game.device.os.desktop) {
                bg.setScale(0.8)
            }
            let display = this.add.text(col, row, answer.name, fontAnswer).setWordWrapWidth(bg.displayWidth - 20).setAlign('center')
                .setOrigin(0.5).setFontStyle('bold').setInteractive().on('pointerover', () => {
                    if (this.timeExpired == false)
                        display.setColor('#cd934a').setFontStyle('bold')
                }).on('pointerout', () => {
                    if (this.timeExpired == false)
                        display.setColor('white')
                }).on('pointerdown', () => {



                    if (!this.hasBeenAnwswered)
                        this.server?.playerAnswer(answer.cellId, answer.id)
                    else {
                        console.log('question has been answered already!')
                    }

                })
            bg.on('pointerover', () => {
                if (this.timeExpired == false || this.hasBeenAnwswered == false)
                    display.setColor('#cd934a').setFontStyle('bold')
            }).on('pointerout', () => {
                
                    display.setColor('white')
            })
            this.answers.push({
                name: answer.name,
                display: display,
                displaybg: bg,
                correct: answer.correct,
                answer: answer
            })
            i++

        })
    }

}