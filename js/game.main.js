const Game = (function(){
	class Game{
		API_ROOT = '/'
		PATH_QUESTIONS = 'sample-data.json'

		constructor(){
			// Await 'run' input
		}
		async run(){
			const run = new Run(this)
			await run.load()
			run.start()
		}
	}
	class Run{
		game = undefined
		questionCurrent = {}
		questionsRemaining = []

		constructor(game){
			this.game = game
		}
		async load(){
			const response = await fetch(`${this.game.API_ROOT}${this.game.PATH_QUESTIONS}`)
			const json = await response.json()
			this.questionsRemaining = json.questions
		}
		nextQuestion(){
			this.questionCurrent = this.questionsRemaining.shift()
		}
		start(){
			this.nextQuestion()
		}
	}

	return Game
})()

document.addEventListener('DOMContentLoaded', async ()=>{
	const game = window.game = new Game()
	game.run()
})