import { Schema, ArraySchema, MapSchema, type } from '@colyseus/schema'

import ITicTacToeState, { GameState, IAnswer, ICell, IPlayer, } from '../types/ITicTacToeState'

export class Answer extends Schema implements IAnswer
{
	@type('string')
	name = ""

	@type('boolean')
	correct = false

	@type('number')
	player = -1
}
export class Cell extends Schema implements ICell
{

	@type('string')
	category = ""

	@type('boolean')
	visible = true

	@type('number')
	value = 0

	@type('boolean')
	result = false

	@type('string')
	question = ""

	@type('number')
	type = 0

	@type('string')
	image = ''
	

	@type({ map: Answer })
	answers: MapSchema<Answer>

	constructor()
	{
		super()
		this.answers = new MapSchema<Answer>()
	}
}

export class Player extends Schema implements IPlayer 
{
	@type('number')
	id = 0

	@type('string')
	name = ""

	@type('number')
	score = 0

}


export default class TicTacToeState extends Schema implements ITicTacToeState
{

	@type('boolean')
	turnSwitch = false

	@type('number')
	gameState = GameState.WaitingForPlayers

	@type({ map: Cell })
	board: MapSchema<Cell>

	@type('number')
	activePlayer = 0

	@type('number')
	winningPlayer = -1

	@type('number')
	answeringPlayer = -1

	@type(Answer)
	lastAnswer = new Answer()

	@type({ map: Player})
	players: MapSchema<Player>

	@type('boolean')
	unlock = false

	@type('string')
	currentScreen = ''

	constructor()
	{
		super()

		//this.lastAnswer = new Answer()
		this.board = new MapSchema<Cell>()
		this.players = new MapSchema<Player>()
		
		let fs = require('fs');
		let parser = require('xml2json');



		let self = this
	
		fs.readFile('test.xml', (err: any, data: any)=> {
			

			var json = JSON.parse(parser.toJson(data));

			json['root']['board']['cell'].forEach((cell: any)=> {
			
				

				let square = new Cell()

			


			
					square.image = cell.image
					square.value = 0
					square.result = false
					square.question = cell.question 
					square.type = parseInt(cell.type)
					square.category = cell.category
					square.value = parseInt(cell.score)

					let answers = cell['answer']


					
					if (answers != null) {
						cell['answer'].forEach((answer: any) => {

								
								let nAnswer = new Answer()

								nAnswer.name = answer.value,
								nAnswer.correct = answer.correct == "1" ? true : false


								
 
							
								square.answers.set(nAnswer.name, nAnswer)
							
						});
					}
				
					self.board.set(cell.id.toString(), square)
					
			})

		})
		
		//this.saveState()
		//this.loadState()
		
		
	}

	private loadState()
	{
		let fs = require('fs');
		let parser = require('xml2json');



		let self = this
		fs.readFile('test.xml', (err: any, data: any)=> {

		     
			var json = JSON.parse(parser.toJson(data));

			json['root']['board']['cell'].forEach((cell: any)=> {
			
				

				let square = self.board.get(cell.id.toString())
				if (square) {
					square.question = cell.question 
					square.type = parseInt(cell.type)
					square.category = cell.category
					
					//self.board.set(cell.id.toString(), square)
				}

			})
		});

	}
	

	private saveState()
	{
		let fs = require('fs');
		let serializer = new (require('xmldom')).XMLSerializer;
		
		var XMLWriter = require('xml-writer');

		
		let xw = new XMLWriter;
		xw.startDocument();
		xw.startElement('root')
		xw.startElement('board');
		xw.writeAttribute('id','level 1')
		for (let i =0; i < 25; i++)
		{
			
			let cell = this.board.get(i.toString())
			xw.startElement('cell')
			xw.writeAttribute('id', i);
			if (i < 5) {
				xw.writeAttribute('type',0)
			}
			else {
				xw.writeAttribute('type',1)
			}
				xw.startElement('category')
				xw.text('Something')
				xw.endElement()
				
			if (i >= 5) {
				xw.startElement('question')
				xw.text("I Love Jesus!")
					xw.endElement()
					xw.startElement('answer')
						xw.text("Yes")
					xw.endElement()	
					xw.startElement('answer')
						xw.text("Always")
					xw.endElement()	
					xw.startElement('answer')
						xw.text("Forever")
					xw.endElement()		
					xw.startElement('answer')
						xw.text("All Eternity")
					xw.endElement()		
			}
			xw.endElement()

		}	
		
		xw.endElement()
		xw.endDocument()
			
		
		
		fs.writeFile("test.xml", xw.toString(), ()=> {
			console.log('wrote XML file')
		})
	}
}
