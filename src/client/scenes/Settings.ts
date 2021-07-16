import { IGameOverSceneData, IGameSceneData } from "../../types/scenes";
import { BKG, Button } from "../../types/BKG";
import type Server from '../services/Server'


export default class Settings extends Phaser.Scene {
    textSound?: Phaser.GameObjects.Text
    textMusic?: Phaser.GameObjects.Text
    textCredits?: Phaser.GameObjects.Text
    textServer?: Phaser.GameObjects.Text
    buttonSound?: Button
    buttonMusic?: Button
    buttonCredits?: Button
    buttonBack?: Button
    buttonServer?: Button
    screenName?: string
    containerCredits?: Phaser.GameObjects.Container
    containerKeyboard?: Phaser.GameObjects.Container

    constructor() {
        super('settings')
    }

    private returnScene: string = ''
    create(data: any) {

        const { screen } = data
        this.returnScene = screen
        console.log(this.returnScene)


        this.add.sprite(0, 0, 'overlay').setOrigin(0, 0).setDisplaySize(BKG.world.width, BKG.world.height)
        let screenName = 'settings';
        //this.input.keyboard.on('keydown', this.handleKey, this);

        this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
        this.buttonBack.setOrigin(0, 0);
        this.buttonBack.y = -this.buttonBack.height - 20;
        this.tweens.add({ targets: this.buttonBack, y: 20, duration: 500, ease: 'Back' });

        var fontTitle = { font: '46px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
        var fontSubtitle = { font: '38px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5, align: 'center' };
        var fontSmall = { font: '28px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 4, align: 'center' };
        var titleSettings = this.add.text(BKG.world.centerX, 60, BKG.text['settings'], fontTitle);
        titleSettings.setOrigin(0.5, 0.5);
        var offsetLeft = 130;


        this.buttonSound = new Button(offsetLeft + 40, 250, 'button-sound-on', this.clickSound, this);
        this.buttonSound.setOrigin(0.5, 0.5);
        this.textSound = this.add.text(offsetLeft + 30 + this.buttonSound.width, 250, BKG.text['sound-on'], fontSubtitle);
        this.textSound.setOrigin(0, 0.5);
        this.buttonMusic = new Button(offsetLeft + 40, 375, 'button-music-on', this.clickMusic, this);
        this.buttonMusic.setOrigin(0.5, 0.5);
        this.textMusic = this.add.text(offsetLeft + 30 + this.buttonMusic.width, 375, BKG.text['music-on'], fontSubtitle);
        this.textMusic.setOrigin(0, 0.5);
      
        this.buttonServer = new Button(offsetLeft + 40, 500, 'button-credits', this.clickServer, this);
        this.buttonServer.setOrigin(0.5, 0.5);

        this.textServer = this.add.text(offsetLeft + 30 + this.buttonServer.width, 500, BKG.text['server'], fontSubtitle);
        this.textServer.setOrigin(0, 0.5);

        this.buttonCredits = new Button(offsetLeft + 40, 625, 'button-home', this.clickCredits, this);
        this.buttonCredits.setOrigin(0.5, 0.5);

        this.textCredits = this.add.text(offsetLeft + 30 + this.buttonCredits.width, 625, BKG.text['credits'], fontSubtitle);
        this.textCredits.setOrigin(0, 0.5);



        BKG.Sfx.update('sound', this.buttonSound, this.textSound);
        BKG.Sfx.update('music', this.buttonMusic, this.textMusic);


        this.buttonSound.setScale(0.5);
        this.tweens.add({ targets: this.buttonSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
        this.textSound.setScale(0.5);
        this.tweens.add({ targets: this.textSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
        this.buttonMusic.setScale(0.5);
        this.tweens.add({ targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
        this.textMusic.setScale(0.5);
        this.tweens.add({ targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
       
        this.buttonServer.setScale(0.5);
        this.tweens.add({ targets: this.buttonServer, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });
        this.textServer.setScale(0.5);
        this.tweens.add({ targets: this.textServer, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });

        this.buttonCredits.setScale(0.5);
        this.tweens.add({ targets: this.buttonCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 725, ease: 'Cubic.easeOut' });
        this.textCredits.setScale(0.5);
        this.tweens.add({ targets: this.textCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 725, ease: 'Cubic.easeOut' });


        var offsetTopCredits = 20;
        var offsetTopCrew = 300;
        this.containerCredits = this.add.container(0, BKG.world.height);
        var creditsBg = this.add.sprite(0, 0, 'overlay');
        creditsBg.setOrigin(0, 0);
        var _this = this
        var creditsBack = new Button(20, 20, 'button-back', function () { _this.clickBack('credits'); }, this);
        creditsBack.setOrigin(0, 0);

        var titleCredits = this.add.text(BKG.world.centerX, offsetTopCredits + 40, BKG.text['credits'], fontTitle);
        titleCredits.setOrigin(0.5);
        var titleCreditsText = this.add.text(BKG.world.centerX, offsetTopCredits + 100, BKG.text['madeby'].toUpperCase(), fontSubtitle);
        titleCreditsText.setOrigin(0.5, 0);
        var titleCreditsUrl = this.add.text(BKG.world.centerX, offsetTopCredits + 140, 'savingus.org', fontSmall);
        titleCreditsUrl.setOrigin(0.5, 0);
        titleCreditsUrl.setInteractive({ useHandCursor: true });
        titleCreditsUrl.on('pointerdown', function () { _this.clickEnclave() }, this);

        var titleTeam = this.add.text(BKG.world.centerX, offsetTopCredits + 250, "TEAM", fontSubtitle).setOrigin(0.5, 0)

        var titleCoder = this.add.text(BKG.world.centerX, offsetTopCredits + 300, 'Eric Bradshaw - ' + BKG.text['design'], fontSmall);
        titleCoder.setOrigin(0.5, 0);
        var titleCrewEwa = this.add.text(BKG.world.centerX, offsetTopCredits + 340, 'Tom Jolin - ' + BKG.text['coding'], fontSmall);
        titleCrewEwa.setOrigin(0.5, 0)



       
        
        var titlePhaser = this.add.image(BKG.world.width - 100, BKG.world.height - 100, 'phaser').setOrigin(0.5,0.5)
       
        var titleAttribute =  new Button(BKG.world.centerX,offsetTopCrew + 350,'button-credits', this.clickAttr, this)
        var titleCreditsMusic = this.add.text(BKG.world.centerX, offsetTopCrew + 400, 'Attribution', fontSubtitle);
        titleCreditsMusic.setOrigin(0.5, 0).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
           this.clickAttr()
        })

        this.containerCredits.add([creditsBg, creditsBack, titleCredits, titleCreditsText, titleCreditsUrl]);
        this.containerCredits.add([titleCoder, titleCrewEwa, titleCreditsMusic, titleTeam, titleAttribute, titlePhaser]);

        this.containerKeyboard = this.add.container();
        this.containerKeyboard.y = BKG.world.height;

        var offsetTopKeyboard = 20;
        var keyboardBg = this.add.sprite(0, 0, 'background');
        keyboardBg.setOrigin(0, 0);
        var titleKeyboard = this.add.text(BKG.world.centerX, offsetTopKeyboard + 40, BKG.text['key-title'], fontTitle);
        titleKeyboard.setOrigin(0.5);
        var titleKeySettingsTitle = this.add.text(BKG.world.centerX, offsetTopKeyboard + 90, BKG.text['key-settings-title'], fontSubtitle);
        titleKeySettingsTitle.setOrigin(0.5, 0);
        var titleKeySettings = this.add.text(BKG.world.centerX, offsetTopKeyboard + 140, BKG.text['key-settings-onoff'], fontSmall);
        titleKeySettings.setOrigin(0.5, 0);
        var titleKeyAudio = this.add.text(BKG.world.centerX, offsetTopKeyboard + 180, BKG.text['key-audio'], fontSmall);
        titleKeyAudio.setOrigin(0.5, 0);
        var titleKeyMusic = this.add.text(BKG.world.centerX, offsetTopKeyboard + 220, BKG.text['key-music'], fontSmall);
        titleKeyMusic.setOrigin(0.5, 0);
        var titleKeyCredits = this.add.text(BKG.world.centerX, offsetTopKeyboard + 260, BKG.text['key-credits'], fontSmall);
        titleKeyCredits.setOrigin(0.5, 0);
        var titleKeyKeyboard = this.add.text(BKG.world.centerX, offsetTopKeyboard + 300, BKG.text['key-shortcuts'], fontSmall);
        titleKeyKeyboard.setOrigin(0.5, 0);

        var titleKeyMenuTitle = this.add.text(BKG.world.centerX, offsetTopKeyboard + 350, BKG.text['key-menu'], fontSubtitle);
        titleKeyMenuTitle.setOrigin(0.5, 0);
        var titleKeySettings2 = this.add.text(BKG.world.centerX, offsetTopKeyboard + 400, BKG.text['key-settings-onoff'], fontSmall);
        titleKeySettings2.setOrigin(0.5, 0);
        var titleKeyStart = this.add.text(BKG.world.centerX, offsetTopKeyboard + 440, BKG.text['key-start'], fontSmall);
        titleKeyStart.setOrigin(0.5, 0);

        var titleKeyGameTitle = this.add.text(BKG.world.centerX, offsetTopKeyboard + 490, BKG.text['key-gameplay'], fontSubtitle);
        titleKeyGameTitle.setOrigin(0.5, 0);
        var titleKeyButton = this.add.text(BKG.world.centerX, offsetTopKeyboard + 540, BKG.text['key-button'], fontSmall);
        titleKeyButton.setOrigin(0.5, 0);
        var titleKeyPause = this.add.text(BKG.world.centerX, offsetTopKeyboard + 580, BKG.text['key-pause'], fontSmall);
        titleKeyPause.setOrigin(0.5, 0);

        var titleKeyPauseTitle = this.add.text(BKG.world.centerX, offsetTopKeyboard + 630, BKG.text['key-pause-title'], fontSubtitle);
        titleKeyPauseTitle.setOrigin(0.5, 0);
        var titleKeyBack = this.add.text(BKG.world.centerX, offsetTopKeyboard + 680, BKG.text['key-back'], fontSmall);
        titleKeyBack.setOrigin(0.5, 0);
        var titleKeyRestart = this.add.text(BKG.world.centerX, offsetTopKeyboard + 720, BKG.text['key-return'], fontSmall);
        titleKeyRestart.setOrigin(0.5, 0);

        var titleKeyOverTitle = this.add.text(BKG.world.centerX, offsetTopKeyboard + 770, BKG.text['key-gameover'], fontSubtitle);
        titleKeyOverTitle.setOrigin(0.5, 0);
        var titleKeyBack2 = this.add.text(BKG.world.centerX, offsetTopKeyboard + 820, BKG.text['key-back'], fontSmall);
        titleKeyBack2.setOrigin(0.5, 0);
        var titleKeyRestart2 = this.add.text(BKG.world.centerX, offsetTopKeyboard + 860, BKG.text['key-try'], fontSmall);
        titleKeyRestart2.setOrigin(0.5, 0);

        this.containerKeyboard.add([keyboardBg, titleKeyboard, titleKeySettingsTitle, titleKeySettings]);
        this.containerKeyboard.add([titleKeyAudio, titleKeyMusic, titleKeyCredits, titleKeyKeyboard]);
        this.containerKeyboard.add([titleKeyMenuTitle, titleKeySettings2, titleKeyStart, titleKeyGameTitle]);
        this.containerKeyboard.add([titleKeyButton, titleKeyPause, titleKeyPauseTitle, titleKeyBack]);
        this.containerKeyboard.add([titleKeyRestart, titleKeyOverTitle, titleKeyBack2, titleKeyRestart2]);

        this.cameras.main.fadeIn(250);

    }


    clickSound() {
        BKG.Sfx.play('click');
        BKG.Sfx.manage('sound', 'switch', this, this.buttonSound, this.textSound);
    }
    clickMusic() {
        BKG.Sfx.play('click');
        BKG.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic);
    }
    clickAttr(){
        BKG.Sfx.play('click');

        BKG.fadeOutScene('attribution',this)
    }
    clickServer() {
        BKG.Sfx.play('click');
        BKG.fadeOutScene('gameconnection',this)
    }
    clickCredits() {
        BKG.Sfx.play('click');
        this.tweens.add({ targets: this.containerCredits, y: 0, duration: 750, ease: 'Cubic.easeOut' });

        if (this.buttonBack)
            this.buttonBack.input.enabled = false;

        if (this.buttonSound)
            this.buttonSound.input.enabled = false;

        if (this.buttonMusic)
            this.buttonMusic.input.enabled = false;

        if (this.buttonCredits)
            this.buttonCredits.input.enabled = false;

        this.screenName = 'credits';



    }

    clickBack(name) {
        BKG.Sfx.play('click');
        if (name) {
            if (this.buttonBack)
                this.buttonBack.input.enabled = true;

            if (this.buttonSound)
                this.buttonSound.input.enabled = true;

            if (this.buttonMusic)
                this.buttonMusic.input.enabled = true;

            if (this.buttonCredits)
                this.buttonCredits.input.enabled = true;

            if (name == 'credits') {
                this.tweens.add({ targets: this.containerCredits, y: BKG.world.height, duration: 750, ease: 'Cubic.easeIn' });
            }
            else if (name == 'keyboard') {
                this.tweens.add({ targets: this.containerKeyboard, y: BKG.world.height, duration: 750, ease: 'Cubic.easeIn' });
            }
            this.screenName = 'settings';
        }
        else{
            if (this.returnScene == 'title')
                BKG.fadeOutScene(this.returnScene, this);
            else {
            

                this.scene.wake(this.returnScene)
                this.scene.stop()
            }
        }
    }

    clickEnclave() {
        BKG.Sfx.play('click');
        window.top.location.href = 'http://savingus.org';
    }
}