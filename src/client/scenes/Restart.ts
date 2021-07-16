import Phaser from 'phaser'
import { BKG, Button } from '../../types/BKG'
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import Server from '../services/Server'
import Bootstrap from './Bootstrap'

export default class Restart extends Phaser.Scene {

	constructor() {
		super('restart')

	}


	private onRestart?:() => void
	private buttonBack?: Button
	private server?: Server
	create(data: IGameOverSceneData) {


		const { winner, onRestart, server } = data

		this.server = server
		this.onRestart = onRestart
		let screenCenterX = this.game.scale.width / 2
		let screenCenterY = this.game.scale.height / 2

		let background = this.add.image(0, 0, 'overlay').setOrigin(0).setDisplaySize(BKG.world.width, BKG.world.height)




		this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height - 20;
		this.tweens.add({ targets: this.buttonBack, y: 20, duration: 500, ease: 'Back' });


		var fontTitle = { font: '46px ' + BKG.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };

		const title = this.add.text(BKG.world.centerX, BKG.world.centerY, 'Are you sure you want to quit?', fontTitle).setOrigin(0.5)



		let restart = new Button(BKG.world.centerX, BKG.world.centerY + 150, 'button-restart', this.restart, this)





		//this.add.image(400, 400, 'background2');
	}
	restart() {

		
		if (this.server) {

		
			let bootstrap = this.scene.get('bootstrap') as Bootstrap
			bootstrap.handleRestart()
			this.scene.stop()
		}
	}

	clickBack() {
		BKG.Sfx.play('click');


		console.log('clickback')

		this.scene.wake('game')
		this.scene.stop()


	}
}
