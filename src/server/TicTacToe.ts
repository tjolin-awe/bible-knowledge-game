import { Client, Room } from 'colyseus'
import { Dispatcher } from '@colyseus/command'
import { Message } from '../types/messages'
import TicTacToeState, { BKGSinglePlayerState, StringFormat } from './TicTacToeState'
import  PlayerSelectionCommand  from './commands/PlayerSelectionCommand'
import AnswerGivenCommand from './commands/AnswerGivenCommand'

import { GameState } from '../types/ITicTacToeState'
import { Player } from './TicTacToeState'
import PlayerReadyCommand from './commands/PlayerReadyCommand'




export default class TicTacToe extends Room<TicTacToeState>
{
	private dispatcher = new Dispatcher(this)

	onCreate(options: { name:string, level: string})
	{
		this.maxClients = 2
		this.setState(new TicTacToeState(options.level))
		
		this.onMessage(Message.PlayerSelection, (client, message: {  cellId: number } ) => {
			this.dispatcher.dispatch(new PlayerSelectionCommand(), {
				client,
				cellId: message.cellId
			})
		})

		this.onMessage(Message.AnswerGiven, (client, message: { cellId: number, answerId: number}) => {
			
			this.dispatcher.dispatch(new AnswerGivenCommand(), {
				client,
				cellId: message.cellId,
				answerId: message.answerId
			})
		})

		this.onMessage(Message.PlayerReady, (client, message: { player: number }) => {
			
			this.dispatcher.dispatch(new PlayerReadyCommand(), {
				client,
				player: message.player
			
			})
		})
		
	}

	async onLeave (client: Client, consented: boolean) {
		// flag client as inactive for other users

	
	
		let player = this.state.players.get(client.sessionId)
		if (player ==null)
			return 

		console.log(`"${player.name}", client ${client.sessionId} returned! re-activating.`)
		player.connected = false;
	  
		try {
		  if (consented) {
			  throw new Error("consented leave");
		  }
	  
		  console.log(`"${player.name}", client ${player.id} has disconnected! Allowing player 20 seconds to reconnect.`)
		  await this.allowReconnection(client, 20);
	  
		  console.log(`"${player.name}", client ${player.id} returned! re-activating.`)
		  player.connected = true
	  
		} catch (e) {
	  
		  console.log(`20 seconds expired. Removing client ${client.sessionId}`)
		  
		  this.state.players.delete(player.id);
		}
	  }

	onJoin(client: Client, options: { name:string} )
	{

		const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
		
		this.state.activePlayer = client.sessionId 
		client.send(Message.PlayerIndex, { playerId: client.sessionId, playerIndex: idx, name: options.name  })

		
		
		let player = new Player() 
		player.id = client.sessionId
		player.score = 0, 
		player.name = options.name
		this.state.players.set(client.sessionId, player)				
	
	
		if (this.clients.length >= 2)
		{		
			this.state.gameState = GameState.Playing
			this.state.activePlayer = client.sessionId 
			this.lock()
		}
	}
}

export class BKGSingle extends Room<BKGSinglePlayerState>
{
	private dispatcher = new Dispatcher(this)

	onCreate(options: { name:string, level: string})
	{
	
		
		this.maxClients = 1
		
		this.setState(new BKGSinglePlayerState(options.level))
	
		this.onMessage(Message.PlayerSelection, (client, message: {  cellId: number } ) => {
			this.dispatcher.dispatch(new PlayerSelectionCommand(), {
				client,
				cellId: message.cellId
			})
		})

		this.onMessage(Message.AnswerGiven, (client, message: { cellId: number, answerId: number}) => {
			
			this.dispatcher.dispatch(new AnswerGivenCommand(), {
				client,
				cellId: message.cellId,
				answerId: message.answerId
			})
		})

		this.onMessage(Message.PlayerReady, (client, message: { player: number }) => {
		
			this.dispatcher.dispatch(new PlayerReadyCommand(), {
				client,
				player: message.player
			
			})
		})
		
	}

	async onLeave (client: Client, consented: boolean) {
		// flag client as inactive for other users

	
		console.log('player disconnected!')
	
		/*
		let player = this.state.players.get(client.sessionId)
		if (player ==null)
			return 

		console.log(`"${player.name}", client ${client.sessionId} returned! re-activating.`)
		player.connected = false;
	  
		try {
		  if (consented) {
			  throw new Error("consented leave");
		  }
	  
		  console.log(`"${player.name}", client ${player.id} has disconnected! Allowing player 20 seconds to reconnect.`)
		  await this.allowReconnection(client, 20);
	  
		  console.log(`"${player.name}", client ${player.id} returned! re-activating.`)
		  player.connected = true
	  
		} catch (e) {
	  
		  console.log(`20 seconds expired. Removing client ${client.sessionId}`)
		  
		  this.state.players.delete(player.id);
		}
		*/
	  }

	private loadLevel(level: string)
	{
		
	}

	onJoin(client: Client, options: { name:string, level: string} )
	{



		const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
		
		


		this.state.activePlayer = client.sessionId 
		client.send(Message.PlayerIndex, { playerId: client.sessionId, level:options.level, playerIndex: idx, name: options.name  })

		
		
		let player = new Player() 
		player.id = client.sessionId
		player.score = 0, 
		player.name = options.name
		this.state.players.set(client.sessionId, player)				
	
	
		if (this.clients.length === 1)
		{		
			this.state.gameState = GameState.Playing
			this.state.activePlayer = client.sessionId 
			this.lock()
		}
	}
}

