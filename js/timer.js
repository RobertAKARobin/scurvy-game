class Interval{
	callback = undefined
	elapsedTime = 0
	expectedTimeAtNextStep = 0
	intervalMS = 100
	resumeTime = 0
	resumeElapsedSteps = 0
	resumeElapsedTime = 0
	startTime = 0
	startElapsedSteps = 0
	startElapsedTime = 0
	timer = undefined

	constructor(callback, intervalMS){
		this.callback = callback.bind(this)
		this.intervalMS = intervalMS
		this.step = this.step.bind(this)
	}
	resume(){
		this.resumeTime = Date.now()
		this.resumeElapsedTime = 0
		this.resumeElapsedSteps = 0
		this.expectedTimeAtNextStep = this.resumeTime + this.intervalMS
		this.timer = setTimeout(this.step, this.intervalMS)
		return this
	}
	start(){
		this.startTime = Date.now()
		this.startElapsedTime = 0
		this.startElapsedSteps = 0
		this.resume()
		return this
	}
	step(){
		const expectedTimeAtThisStep = this.expectedTimeAtNextStep
		const actualTimeAtThisStep = Date.now()
		const driftThisStep = (actualTimeAtThisStep - expectedTimeAtThisStep)

		this.startElapsedTime = (actualTimeAtThisStep - this.startTime)
		this.startElapsedSteps += 1
		this.resumeElapsedTime = (actualTimeAtThisStep - this.resumeTime)
		this.resumeElapsedSteps += 1

		this.expectedTimeAtNextStep = (expectedTimeAtThisStep + this.intervalMS)
		this.callback(this, driftThisStep, actualTimeAtThisStep)
		this.timer = setTimeout(this.step, Math.max(0, this.intervalMS - driftThisStep))
		return this
	}
	stop(){
		clearTimeout(this.timer)
		return this
	}
}