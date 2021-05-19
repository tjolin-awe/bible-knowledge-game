import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, {  GameState } from '../../types/ITicTacToeState'
import { Cell, Player, Answer } from '../TicTacToeState'
import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
	client: Client
	index: number
	answer: string,
	correct: boolean
	value: number
}

export default class AnswerGivenCommand extends Command<ITicTacToeState, Payload>
{
	execute(data: Payload)
	{
		const { client, index, answer, correct, value} = data

		if (this.room.state.gameState !== GameState.Playing)
		{
			
		}

		const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
		console.log('Answer given')
		
		console.log("Answring Player: " + index.toString())
		//this.room.state.answeringPlayer = index
		let nAnser = new Answer()
		nAnser.correct = correct 
		nAnser.name = answer 
		nAnser.player = index 
		

		this.room.state.lastAnswer = nAnser
		
		let player = this.room.state.players.get(index.toString())

		if (this.room.state.activePlayer == index)
			this.room.state.turnSwitch = !correct
		else 
			this.room.state.turnSwitch = correct

		
	
		if (player) {
			
			console.log(value)
			console.log('score ' + player.score.toString())
			if (correct == true) {
				player.score = player.score + value 
			}
			else  {
				player.score = player.score - value
			}
			
			console.log('score ' + player.score.toString())
		
			//this.room.state.players.set(clientIndex.toString(),player)
			console.log('player score change')
		}
			
		
		return [
			new CheckWinnerCommand()
		]
	}
}
