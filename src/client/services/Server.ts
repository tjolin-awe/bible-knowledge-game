import { Client, Room } from 'colyseus.js'
import Phaser from 'phaser'
import ITicTacToeState, { GameState, ICell, IPlayer } from '../../types/ITicTacToeState'
import { Message } from '../../types/messages'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
import { Answer } from '~/server/TicTacToeState'

export default class Server
{
	tabRestore() {
		
		//this.room?.state.currentScreen

	}
	private client: Client
	private events: Phaser.Events.EventEmitter

	private room?: Room<ITicTacToeState>
	private _playerIndex = -1
	private _name = ""

	private _locked = false;

	get playerIndex()
	{
		return this._playerIndex
	}

	get gameState()
	{
		if (!this.room)
		{
			return GameState.WaitingForPlayers
		}

		return this.room?.state.gameState
	}

	get activePlayer()
	{
		return this.room?.state.activePlayer
	}

	get players()
	{
		if (!this.room)
		{
			return null;
		}
		return this.room?.state.players
	}


	constructor()
	{
		this.client = new Client('ws://192.168.1.5:2567')
		this.events = new Phaser.Events.EventEmitter()
	}

	async join(name: string)
	{
		this.room = await this.client.joinOrCreate<ITicTacToeState>('tic-tac-toe', { name: name})
	
	
		
		this.room.onMessage(Message.PlayerIndex, (message: { playerIndex: number, name: string }) => {
			
				console.log('got player index ' + message.playerIndex.toString()  )
				this._playerIndex = message.playerIndex
				this._name = message.name
				
		})

		
		
		this.room.onStateChange.once(state => {
			this.events.emit('once-state-changed', state)
		})

		this.room.state.onChange = (changes) => {
			changes.forEach(change => {
				console.log(change)
				const { field, value } = change

				switch (field)
				{
					case 'board':
						console.log('here')
						console.log(field, value)
					 	this.events.emit('board-changed', value)
					 	break
					
					case 'lastAnswer':
						    
					console.log('lastAnswer')
						console.log(value)
						this.events.emit('player-answered', value)
						break;

					
					case 'unlock':
						this._locked = false
						break;
			
					case 'activePlayer':
						this.events.emit('player-turn-changed', value)
						break

					case 'winningPlayer':
						this.events.emit('player-win', value)
						break

					case 'gameState':
						this.events.emit('game-state-changed', value)
						break
					
				}
			})
		}

		this.room.state.board.onChange = (item, idx) => {
	
			
			if (this.room) {
				this.events.emit('board-changed', item, Number.parseInt(idx), this.room.state.players)
			}
		}
	}

	leave()
	{
		this.room?.leave()
		this.events.removeAllListeners()
	}

	register(name:string)
	{
		if (this.room == null)
		{
			return
		}
		
		
		//console.log('register')
		//console.log(name)
		

		
		//this.events.emit('player-registered', this._playerIndex, name, this.room.state.players)
		
	}

	makeSelection(idx: number, result: boolean, score: number, name: string)
	{
		
		if (!this.room)
		{
			return
		}

		if (this.room.state.gameState !== GameState.Playing)
		{
		
			return
		}

		if (this.playerIndex !== this.room.state.activePlayer)
		{
			console.warn('not this player\'s turn')
			return

			
		}

		if (result)
			score = -score

		this.room.send(Message.PlayerSelection, { index: idx, result: result, score:score })
		
	}

	playerAnswer(idx: number, answer: string, result: boolean, value: number)
	{

		if (!this.room)
			return

		if (this._locked == true) {
			console.log('Your answer came too late')
			return
		}
		
		this._locked = true;
	
		console.log('got to server')
		console.log('answer locked')
		this.room.send(Message.AnswerGiven,{ index: idx, answer: answer, correct: result, value: value })

	}

	onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any)
	{
		this.events.once('once-state-changed', cb, context)
	}

	  
	onPlayerAnswered(cb: (answer: Answer) => void, context?: any)
	{
		console.log('player answered fired')
		this.events.on('player-answered', cb, context)
	}

	onBoardChanged(cb: (cell: ICell, index: string, players: MapSchema<IPlayer>) => void, context?: any)
	{
		
		this.events.on('board-changed', cb, context)
	}

	onPlayerTurnChanged(cb: (playerIndex: number, players: MapSchema<IPlayer>) => void, context?: any)
	{
		this.events.on('player-turn-changed', cb, context)
	}

	onPlayerWon(cb: (playerIndex: number) => void, context?: any)
	{
		this.events.on('player-win', cb, context)
	}

	onGameStateChanged(cb: (state: GameState) => void, context?: any)
	{
		this.events.on('game-state-changed', cb, context)
	}

	onPlayerRegistered(cb: (playerId: number, name: string, players: MapSchema<IPlayer>) => void, context?: any)
	{
		this.events.on('player-registered',cb, context)
	}
}
