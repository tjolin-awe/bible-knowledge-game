import { Schema, MapSchema, ArraySchema } from '@colyseus/schema'


export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface IAnswer extends Schema
{
	name: string
	correct: boolean
	player: number
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

export interface IPlayer extends Schema
{
	id: number 
	
	name: string

	score: number

	ready: boolean

}

export interface ITicTacToeState extends Schema
{
	turnSwitch: boolean

	gameState: GameState
	
	board: MapSchema<ICell>

	activePlayer: number

	winningPlayer: number

	answeringPlayer: number

	lastAnswer: IAnswer

	players: MapSchema<IPlayer>
	
	unlock: boolean

	currentScreen: string

	ready: boolean
	

}

export default ITicTacToeState
