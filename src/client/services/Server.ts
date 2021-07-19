import { Client, Room } from 'colyseus.js'
import Phaser from 'phaser'
import ITicTacToeState, { GameState, IBKGSinglePlayerState, ICell, IPlayer } from '../../types/ITicTacToeState'
import { Message } from '../../types/messages'
import { MapSchema, type } from '@colyseus/schema'
import { Answer, Player } from '../../server/TicTacToeState'
import { BKG } from '../../types/BKG'

export class TurnResult 
{
	result : boolean = false
	message : string = ''
}
export default class Server
{
	
	private client!: Client
	private events: Phaser.Events.EventEmitter

	private room?: Room<ITicTacToeState>
	private _playerIndex: number = -1
	private _playerId: string = ''
	private _name: string = ''
	private _multiplayer: boolean = false
	private _level: string = ''

	get playerId()
	{
		return this._playerId
	}

	get otherPlayerName()
	{
		this.players?.forEach((value: IPlayer, key: string)=> {
			if (this._playerId != key)
				return value.name
		});
		return ''
	}


	get level()
	{
		return this._level
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

	get multiplayer()
	{
		return this._multiplayer
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

		let server_address = BKG.Storage.get('gameserver')
	
		
		//this.client = new Client('ws://34.72.31.244:9091')
		this.client = new Client('ws://' + server_address + ':9091')
		this.events = new Phaser.Events.EventEmitter()
	}


	async join(name: string, level: string, multiplayer: boolean)
	{
		this._multiplayer = multiplayer
		this._name = name

		
		if (multiplayer) {
			console.log('Joining multi-player room')
			this.room = await this.client.joinOrCreate<ITicTacToeState>('tic-tac-toe', { name: name, level:level, multiplayer: multiplayer})
		}
		else {
			console.log('Joining single-player room')
			this.room = await this.client.joinOrCreate<IBKGSinglePlayerState>('bkg-single-player-game', {name: name, level: level, multiplayer: multiplayer})
		}
		this.room.onMessage(Message.PlayerIndex, (message: { playerId: string, level:string, playerIndex: number, name: string }) => {
			
				this._playerIndex = message.playerIndex
				this._playerId = message.playerId
				this._name = message.name
				this._level = level
			
				
		})

		
		
		this.room.onStateChange.once(state => {
			this.events.emit('once-state-changed', state)
		})

		this.room.state.onChange = (changes) => {
			changes.forEach(change => {
			
				const { field, value } = change

				switch (field)
				{
					case 'board':
						
					 	this.events.emit('board-changed', value)
					 	break
					
					case 'lastAnswer':
						    
							
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
			
		

			/*if (!this.room.state.playersReady)
			{
				turnresult.message = "Your opponent's not ready"
				turnresult.result = false
				return turnresult
			}*/
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
	
		this.events.on('players-ready', cb, context)
	}

	
	onPlayerAnswered(cb: (answer: Answer) => void, context?: any)
	{
		
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
