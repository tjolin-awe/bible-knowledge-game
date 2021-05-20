import { Command } from '@colyseus/command'
import { Client } from 'colyseus.js'
import ITicTacToeState from '../../types/ITicTacToeState'
import { Player } from '../TicTacToeState'

type Payload = {
	client: Client
	player: number
	state: boolean
}
export default class PlayerReadyCommand extends Command<ITicTacToeState>
{
	execute(data: Payload)
	{
		let { client, player, state} = data
	  

		console.log('player ready command fired for player ' + player.toString())
		let thisPlayer = this.state.players.get(player.toString())

		if (thisPlayer)
			thisPlayer.ready = state
		
		
		let bothready = true
		this.state.players.forEach((value:Player, key: string)=>{
			if (value.ready == false)
				bothready = false
		})

		this.state.ready = bothready

	}
}