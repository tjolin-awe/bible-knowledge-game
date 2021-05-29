import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, {  GameState } from '../../types/ITicTacToeState'
import { Player } from '../TicTacToeState'
import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
	client: Client
	cellId: number
	answerId: number
}

export default class AnswerGivenCommand extends Command<ITicTacToeState, Payload>
{
	execute(data: Payload)
	{
		const { client, cellId, answerId } = data

		if (this.room.state.gameState !== GameState.Playing)
			return


		const cellKey = cellId.toString()
		const answerKey = answerId.toString()
		
		let cell = this.room.state.board.get(cellKey)
		let player = this.room.state.players.get(client.sessionId)

		if (!cell || !player)
			return 

		let answer = cell.answers.get(answerKey)
	

		if (!answer) 
			return 
		
		answer.player = client.sessionId

		this.state.answeringPlayer = client.sessionId

		// Notify the system that a player has answered
		this.room.state.lastAnswer = answer 
								
	    // Synchronize players current score
		this.room.state.players.forEach((p: Player, key: string)=> {
			p.lastscore = p.score
			this.room.state.players.set(key, p)
		})

		// Add or subtract the cell value based on whether it was correct
		player.score += answer.correct ? cell.value : -cell.value				
			
		console.log('player score: ' + player.score.toString())
		// Determine player control based on whether who answered and whether it was correct 
		if (player.id == this.room.state.activePlayer)
		{
			this.room.state.turnSwitch = !answer.correct
		} 
		else {

			this.room.state.turnSwitch = answer.correct
		}
				
		this.room.state.players.set(client.sessionId, player)
						
		return [
			new CheckWinnerCommand()
		]
	}
}
