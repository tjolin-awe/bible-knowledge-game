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

		let hasWinner = true
		
		
	    this.room.state.board.forEach((cellState, idx) => {
		
			
	 		let cell = this.room.state.board.get(idx)

			console.log(idx)
			console.log(cell?.result)
			if (parseInt(idx) > 6) {
				if (cell?.result === false)
					hasWinner = false
			}
			

			
		})
		return  hasWinner;
	}

	execute()
	{
		const win = this.determineWin()	
		if (win)
		{
			let player1 = this.state.players.get('0')
			let player2 = this.state.players.get('1')
			
			if (player1 && player2)
				this.state.winningPlayer = player1.score > player2.score ? player1.id : player2.id
		}
		else
		{
			return [
				new NextTurnCommand()
			]
		}
	}
}