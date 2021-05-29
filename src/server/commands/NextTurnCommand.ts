import { Command } from '@colyseus/command'
import ITicTacToeState from '../../types/ITicTacToeState'
import { Player } from '../TicTacToeState'

export default class NextTurnCommand extends Command<ITicTacToeState>
{
	execute()
	{
		const activePlayer = this.room.state.activePlayer
		
		if (this.room.state.turnSwitch) 
		{
			
			let correct = this.state.lastAnswer.correct		
			if (this.state.activePlayer !== this.state.answeringPlayer){
				// if not current player, but answered correctly
				if (correct)
					this.state.activePlayer = this.state.answeringPlayer  //switch to answering player
			}
			else {
				if (!correct) {
					// if the current player, answered incorrectly
					this.room.state.players.forEach((player: Player, key: string)=> {					
						if (player.id !== this.state.answeringPlayer)
							this.state.activePlayer = player.id 	// switch to other player

					})
				}	
		
			}
		}
		// Remove the lock on answering questions
		this.room.state.locked = false
	}
}