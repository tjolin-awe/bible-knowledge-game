import { Client, Room } from 'colyseus.js'
import Phaser from 'phaser'
import ITicTacToeState, { GameState, IBKGSinglePlayerState, ICell, IPlayer } from '../../types/ITicTacToeState'
import { Message } from '../../types/messages'
import { MapSchema, type } from '@colyseus/schema'
import { Answer, Player } from '../../server/TicTacToeState'

export class TurnResult 
{
	result : boolean = false
	message : string = ''
}
export default class Server
{
	
	private client: Client
	private events: Phaser.Events.EventEmitter

	private room?: Room<ITicTacToeState>
	private _playerIndex: number = -1
	private _playerId: string = ''
	private _name: string = ''
	private _multiplayer: boolean = false

	get playerId()
	{
		return this._playerId
	}

	

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

	get lastPlayer()
	{
		return this.room?.state.answeringPlayer
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
		this.client = new Client('ws://34.72.31.244:9091')
		//this.client = new Client('ws://192.168.1.5:9091')
	
		this.events = new Phaser.Events.EventEmitter()
	}

	async join(name: string, multiplayer: boolean)
	{
		this._multiplayer = multiplayer
		this._name = name

		console.log(multiplayer)
		
		if (multiplayer)
			this.room = await this.client.joinOrCreate<ITicTacToeState>('tic-tac-toe', { name: name, multiplayer: multiplayer})
		else {
			console.log('joining single player')
			this.room = await this.client.joinOrCreate<IBKGSinglePlayerState>('bkg-single-player-game', {name: name, multiplayer: multiplayer})
		}
		this.room.onMessage(Message.PlayerIndex, (message: { playerId: string, playerIndex: number, name: string }) => {
			
				this._playerIndex = message.playerIndex
				this._playerId = message.playerId
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
						
					 	this.events.emit('board-changed', value)
					 	break
					
					case 'lastAnswer':
						    
					console.log('lastAnswer')				
						this.events.emit('player-answered', value)
						break;

					case 'playersReady':					
						this.events.emit('players-ready', value)
						break;
				
					
					case 'locked':
						
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


	makeSelection(cellId: number) : TurnResult
	{
		let turnresult = new TurnResult()
		
		if (!this.room){
			turnresult.message = 'room doesn\'t exist!'
		    turnresult.result = false
			return turnresult
		}

		if (this.room.state.gameState !== GameState.Playing) {
			turnresult.message = 'The game hasn\'t started!'
			turnresult.result = false
		    return turnresult
		}
		

		if (this._multiplayer) {
			if (this.playerId !== this.room.state.activePlayer) {
				turnresult.message = 'It is not your turn!'
				turnresult.result = false
				return turnresult
			}
			
		

			if (!this.room.state.playersReady)
			{
				turnresult.message = "Your opponent's not ready"
				turnresult.result = false
				return turnresult
			}
		}

		this.room.send(Message.PlayerSelection, { cellId: cellId })
		turnresult.message ='success'
		turnresult.result = true 
		return turnresult
		
	}

	playerReady(player: string)
	{
		if (!this.room)
			return

		console.log('player ready fired on server')

	
		this.room.send(Message.PlayerReady,{ player: player, state: true })
	}

	playerAnswer(cellId: number, answerId: number)
	{
		if (!this.room) {
			console.warn('Room is empty!')
			return
		}

		if (this.room.state.locked) {
			console.warn('Sorry, your answer came in too late!')
			return
		}

		this.room.send(Message.AnswerGiven,{ cellId: cellId, answerId: answerId })

	}

	onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any)
	{
		this.events.once('once-state-changed', cb, context)
	}

	onPlayersReady(cb: (ready: boolean) => void, context?: any)
	{
		console.log('player ready fired')
		this.events.on('players-ready', cb, context)
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

	onPlayerWon(cb: (playerId: string) => void, context?: any)
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
