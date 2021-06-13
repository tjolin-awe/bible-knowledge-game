import { IGameSceneData } from "~/types/scenes";
import { BKG } from "../../types/BKG";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
    preload() {
		this.add.sprite(0, 0, 'overlay').setOrigin(0).setDisplaySize(this.game.scale.width, this.game.scale.height)
        var bible = this.add.sprite(BKG.world.centerX, BKG.world.centerY-100, 'bible').setScale(0.5)
        bible.setOrigin(0.5, 0.5);
		this.tweens.add({ targets: bible, duration: 2000, scale: 0.6, ease: 'Sine.easeInOut', yoyo:true, loop:-1 });
       
		var loadingBg = this.add.sprite(BKG.world.centerX, BKG.world.centerY+100, 'loading-background');
		loadingBg.setOrigin(0.5, 0.5);

		var progress = this.add.graphics();
		this.load.on('progress', function (value) {
			progress.clear();
			progress.fillStyle(0xffde00, 1);
			progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		});

		var resources = {
			'atlas': [
				['flood', 'assets/blobs.png', 'assets/blobs.json']

			],
			'image': [
				
				['title', 'assets/title.png'],
				['gamelogo','assets/gamelogo.png'],
				['question_background', 'assets/question_background.png'],
				['rub','assets/input/rub.png'],
				['background2', 'assets/character-select.png'],
				['green', 'assets/green.png'],
				['red', 'assets/particles/red.png'],
				['square', 'assets/square.png'],
				['square_highlighted','assets/square_highlighted.png'],
				['header','assets/header.png'],
				['player', 'assets/player.png'],
				['nametag', 'assets/nametag.png'],
				['notification', 'assets/notification.png'],
				['star', 'assets/star.png'],
				['loginbackground','assets/loginbackground.png'],
				['spark0', 'assets/green.png'],
				['spark1', 'assets/particles/red.png'],
				['winscreen','assets/winscreen.png'],
			    ['singleplayer_button','assets/singleplayer_button.png'],
				['multiplayer_button','assets/multiplayer_button.png'],
			],
			'spritesheet': [
				['button-start', 'assets/button-start.png', {frameWidth:180,frameHeight:180}],
				['button-settings', 'assets/button-settings.png', {frameWidth:80,frameHeight:80}],
				['loader', 'assets/loader.png', {frameWidth:45,frameHeight:45}],
				['button-continue', 'assets/button-continue.png', {frameWidth:180,frameHeight:180}],
				['button-mainmenu', 'assets/button-mainmenu.png', {frameWidth:180,frameHeight:180}],
				['button-restart', 'assets/button-tryagain.png', {frameWidth:180,frameHeight:180}],
				['button-achievements', 'assets/button-achievements.png', {frameWidth:110,frameHeight:110}],
				['button-pause', 'assets/button-pause.png', {frameWidth:80,frameHeight:80}],
				['button-credits', 'assets/button-credits.png', {frameWidth:80,frameHeight:80}],
				['button-sound-on', 'assets/button-sound-on.png', {frameWidth:80,frameHeight:80}],
				['button-sound-off', 'assets/button-sound-off.png', {frameWidth:80,frameHeight:80}],
				['button-music-on', 'assets/button-music-on.png', {frameWidth:80,frameHeight:80}],
				['button-music-off', 'assets/button-music-off.png', {frameWidth:80,frameHeight:80}],
				['button-back', 'assets/button-back.png', {frameWidth:70,frameHeight:70}]

			],
		
			'audio': [
				['question_music', ['assets/music/question.ogg', 'assets/music/question.mp3']],
				['player_answer', ['assets/sound/playeranswer.ogg','assets/sound/playeranswer.mp3']],
				['correct_answer', ['assets/sound/correct.ogg','assets/sound/correct.mp3']],
				['opening',['assets/music/opening.ogg','assets/music/opening.mp3']],
				['click',['assets/sound/click.ogg','assets/sound/click.mp3']],
				['choose',['assets/sound/choose.ogg','assets/sound/choose.mp3']],
				['startbtn', 'assets/startbtn.png']
			],
		}
		for(var method in resources) {
			let _this = this
			resources[method].forEach(function(args) {
				var loader = _this.load[method];
				loader && loader.apply(_this.load, args);
			}, this);
		};
    }
    create(data: IGameSceneData) {

		
		BKG.fadeOutScene('title', this, data);
	}
}