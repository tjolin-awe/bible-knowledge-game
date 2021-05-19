import { Command } from '@colyseus/command'
import ITicTacToeState from '../../types/ITicTacToeState'

export default class NextTurnCommand extends Command<ITicTacToeState>
{
	execute()
	{
		const activePlayer = this.room.state.activePlayer
		const turnSwitch  = this.room.state.turnSwitch
		
		if (turnSwitch === true) {
			console.log('switching player')
			if (activePlayer == 0)
			{
				this.room.state.activePlayer = 1
			}
			else
			{
				this.room.state.activePlayer = 0
			}
		}

		this.room.state.unlock = !this.room.state.unlock
	}
}