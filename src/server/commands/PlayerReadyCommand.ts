import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import ITicTacToeState, { GameState } from '../../types/ITicTacToeState'
import { Player } from '../TicTacToeState'

type Payload = {
	client: Client
	state: boolean
}
export default class PlayerReadyCommand extends Command<ITicTacToeState>
{
	execute(data: Payload)
	{
		let { client, state } = data

		if (this.room.state.gameState !== GameState.Playing)
			return

	

		let player = this.state.players.get(client.sessionId)

		// Change player ready state
		if (player)
			player.ready = state	
		
		// Check the status of all players
		let playersready = true	
		this.state.players.forEach((value:Player, key: string) => {
			if (value.ready == false)
				playersready = false
		})

		// Update room status
		this.state.playersReady = playersready

	}
}