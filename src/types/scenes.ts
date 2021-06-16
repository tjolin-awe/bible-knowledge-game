import type Server from '../client/services/Server'
import ITicTacToeState, { Cell } from '../server/TicTacToeState'
import { Answer } from '~/server/TicTacToeState'
import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'
export interface IGameOverSceneData
{
	winner: boolean
	onRestart?: () => void
	server: Server
}

export interface IGameSceneData
{
	server: Server
	onGameOver: (data: IGameOverSceneData) => void
	currentcells: { display: Phaser.GameObjects.Graphics, value: Cell }[] 
	name: string,
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
