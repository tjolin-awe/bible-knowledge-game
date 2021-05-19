import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, {  GameState } from '../../types/ITicTacToeState'
import { Cell, Player, Answer } from '../TicTacToeState'
import CheckWinnerCommand from './CheckWinnerCommand'

type Payload = {
	client: Client
	index: number
	value: boolean
	score: number
}

export default class PlayerSelectionCommand extends Command<ITicTacToeState, Payload>
{
	execute(data: Payload)
	{
		const { client, index, value, score} = data

		if (this.room.state.gameState !== GameState.Playing)
		{
			
		}

		const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
		console.log(clientIndex)
		if (clientIndex !== this.room.state.activePlayer)
		{

			return
		}
		
		let player = this.room.state.players.get(clientIndex.toString())
		
	
		

		let cell = this.room.state.board.get(index.toString())

		if (cell) {

			console.log('checking cell during room check')
			console.log(cell)
			console.log(cell.question)
			console.log(cell.image)
			cell.visible = false
			cell.result = true


			let newCell = new Cell()
			newCell.category = cell.category
			newCell.visible = false
			newCell.question = cell.question
			newCell.result = true
			newCell.value = cell.value
			newCell.type = cell.type
			newCell.image = cell.image
			

			cell.answers.forEach((value: Answer, key: string)=>{

				let nAnswer = new Answer()
				nAnswer.name = value.name
				nAnswer.correct = value.correct

				
				newCell.answers.set(key,nAnswer)

			})
			


			this.room.state.board.set(index.toString(), newCell)
			this.room.state.turnSwitch = value
		}
		else {
			console.log('console is null')
		}
		
		
		if (player) {
	
			this.room.state.players.set(clientIndex.toString(),player)
			
		}
		//return [
		//	new CheckWinnerCommand()
		//]
	}
}
