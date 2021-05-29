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
	    this.room.state.board.forEach((cell : Cell, key: string) => {

		
			if (parseInt(key) > 6) {
				console.log(cell.result)
				if (cell.result === false)   
					isgameover = false  // There is at least one square left
				
			}
		})
		return  isgameover 
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
			this.state.winningPlayer = winningplayer
		}
		else
		{
			return [
				new NextTurnCommand()
			]
		}
	}
}