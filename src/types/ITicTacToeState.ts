import { Schema, MapSchema } from '@colyseus/schema'


export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface IAnswer extends Schema
{
	id: number
	name: string
	correct: boolean
	player: string
	cellId: number
}


export interface ICell extends Schema 
{
	category: string

	visible: boolean 

	value: number

	result: boolean

	question: string

	type: number

	image: string

	answers: MapSchema<IAnswer>

}

export interface ICategory extends Schema
{
	title: string
}

export interface IPlayer extends Schema
{
	id: string 
	
	name: string

	score: number

	lastscore: number

	ready: boolean

	connected: boolean

}

export interface IBKGSinglePlayerState extends Schema 
{

	turnSwitch: boolean

	gameState: GameState
	
	board: MapSchema<ICell>

	activePlayer: string

	winningPlayer: string

	answeringPlayer: string

	lastAnswer: IAnswer

	players: MapSchema<IPlayer>
	
	locked: boolean

	playersReady: boolean

	level: number 

	categories: MapSchema<ICategory>
}

export interface ITicTacToeState extends Schema
{
	turnSwitch: boolean

	gameState: GameState
	
	board: MapSchema<ICell>

	activePlayer: string

	winningPlayer: string

	answeringPlayer: string

	lastAnswer: IAnswer

	players: MapSchema<IPlayer>
	
	locked: boolean

	playersReady: boolean
	
	level: number

	categories: MapSchema<ICategory>

	multiplayer: boolean

}

export default ITicTacToeState
