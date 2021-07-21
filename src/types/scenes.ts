import type Server from '../client/services/Server'
import ITicTacToeState, { Cell } from '../server/TicTacToeState'
import { Answer } from '~/server/TicTacToeState'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
export interface IGameOverSceneData
{
	winningName: string
	winningPlayerId: string
	winner: boolean
	playerReset: boolean
	onRestart?: () => void
	server: Server
	multiplayer: boolean
	
}

export interface IGameWakeSceneData
{
	correct: boolean
	answering_player: string
	score: number
	answered: boolean
}

export interface ILevelOverSceneData
{
	onRestart?: () => void
	onGameOver: (data: IGameOverSceneData) => void
	server: Server
}

export interface IGameSceneData
{
	server: Server
	onGameOver: (data: IGameOverSceneData) => void
	currentcells: { display: Phaser.GameObjects.Graphics, value: Cell }[] 
	level: number,
	multiplayer: boolean
}

export interface IQuestionData
{
	server: Server,
	question: string,
	answers: MapSchema<Answer>,
	category: string,
	amount: number,
	image: string
}

export interface IAnswerData
{
	server: Server,
	question: string,
	answer: Answer,
	correctAnswer: Answer,
	image: string,
	timeout: boolean
}
