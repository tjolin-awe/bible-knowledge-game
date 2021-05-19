import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { Message } from '../types/messages'
import TicTacToeState from './TicTacToeState'
import  PlayerSelectionCommand  from './commands/PlayerSelectionCommand'
import AnswerGivenCommand from './commands/AnswerGivenCommand'

import { GameState } from '../types/ITicTacToeState'
import { Cell, Player } from './TicTacToeState'



export default class TicTacToe extends Room<TicTacToeState>
{
	private dispatcher = new Dispatcher(this)

	onCreate()
	{
		this.maxClients = 2
		this.setState(new TicTacToeState())
		console.log('created new state')
		this.onMessage(Message.PlayerSelection, (client, message: { index: number, result: boolean, score: number}) => {
			this.dispatcher.dispatch(new PlayerSelectionCommand(), {
				client,
				index: message.index,
				value: message.result,
				score: message.score
			
			})
		})

		this.onMessage(Message.AnswerGiven, (client, message: { index: number, answer: string, correct: boolean, value: number}) => {
			console.log('onMessage')
			this.dispatcher.dispatch(new AnswerGivenCommand(), {
				client,
				index: message.index,
				answer: message.answer,
				correct: message.correct,
				value: message.value
			
			})
		})
		
	}

	onJoin(client: Client, options: { name:string} )
	{
	
		console.log('OnJoin')
		const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
		
	
		client.send(Message.PlayerIndex, { playerIndex: idx, name: options.name  })


		let player = new Player() 
		player.id = idx
		player.score = 0, 
		player.name = options.name
		this.state.players.set(idx.toString(),player)				
		console.log('create player: ' + options.name)
		let player2 = this.state.players.get(idx.toString())
		console.log(player2?.name)

		// This appears to be serverside. Set name here maybe?
		

		if (this.clients.length >= 2)
		{
			 
			
			this.state.gameState = GameState.Playing
			this.lock()
		}
	}
}
