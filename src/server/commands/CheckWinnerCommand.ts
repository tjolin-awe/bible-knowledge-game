import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, { ICell  } from '../../types/ITicTacToeState'
import NextTurnCommand from './NextTurnCommand'
import { Schema, MapSchema } from '@colyseus/schema'
import { Cell, Player } from '../TicTacToeState'
import { LEFT } from 'phaser'

type Payload = {

}




export default class CheckWinnerCommand extends Command<ITicTacToeState, Payload>
{
	private determineWin()
	{
		// Check the board to see if there are any squares left
		let isgameover = true

		console.log('determine winner')
		console.log(this.room.state.board.keys.length)		
	    this.room.state.board.forEach((cell : Cell, key: string) => {

			console.log(cell.question, cell.result)
		
			if (parseInt(key) > 5) {
				console.log(cell.result)
				if (cell.result === false)   
					isgameover = false  // There is at least one square left
				
			}
		})

		return true // isgameover
		

	
	}

	execute()
	{
		if (this.determineWin())
		{
			

			let winningplayer = ''
			let highscore = 0
			this.state.players.forEach((player: Player, key: string)=> {
				if (player.score > highscore) {
					highscore = player.score 
					winningplayer = player.id
				}
				
			})		
			if (this.state.multiplayer)	
				this.state.winningPlayer = winningplayer
			else 
			{
				if (highscore >= 5000) {
					this.state.winningPlayer = winningplayer
				} else {
					this.state.winningPlayer = ''
				}
			}
		}
		else
		{
			return [
				new NextTurnCommand()
			]
		}
	}
}