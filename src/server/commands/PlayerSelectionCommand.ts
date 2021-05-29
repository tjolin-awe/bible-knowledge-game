import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, {  GameState } from '../../types/ITicTacToeState'
import { Player } from '../TicTacToeState'

type Payload = {
	client: Client
	cellId: number
}

export default class PlayerSelectionCommand extends Command<ITicTacToeState, Payload>
{
	execute(data: Payload)
	{
		const { client, cellId } = data

		let cellKey = cellId.toString()
	
		if (this.room.state.gameState !== GameState.Playing)
			return
		
		//const clientIndex = this.room.clients.findIndex(c => c.id === client.id)
	
		// If the player sending this action isn't the active player, ignore it
		if (client.sessionId !== this.room.state.activePlayer)
			return

		// Lock board until this play finishes
		this.state.playersReady = false
	
		// Reset player readiness flags
		this.room.state.players.forEach((value: Player, key: string)=> {
			value.ready = false 
		})

		// update the current cell
		let cell = this.room.state.board.get(cellKey)

		if (cell)
		{			
			const newCell = cell.clone()
			newCell.visible = false
			newCell.result = true 			
			this.room.state.board.set(cellKey, newCell)	 // we reseat the cell to force an onChange event	
		}
	}
}
