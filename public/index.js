let xOffset = 0
let drawStartPoint = 75
let stopAnimation = false
let direction = 'forward'
let speed = 1

const init = () => {
	const btnStart = document.getElementById('btn_start')
	const btnReverse = document.getElementById('btn_reverse')
	const btnMinus = document.getElementById('btn_minus')
	const btnPlus = document.getElementById('btn_plus')

	btnReverse.disabled = true
	btnMinus.disabled = true
	btnPlus.disabled = true

	btnStart.addEventListener('click', (event) => {
		if (event.target.innerHTML === 'Start') {
			event.target.innerHTML = 'Stop'
			stopAnimation = false
			btnReverse.disabled = false
			btnMinus.disabled = false
			btnPlus.disabled = false
			window.requestAnimationFrame(draw)
		} else {
			event.target.innerHTML = 'Start'
			stopAnimation = true
			btnReverse.disabled = true
			btnMinus.disabled = true
			btnPlus.disabled = true
		}
	})

	btnReverse.addEventListener('click', () => {
		direction = direction === 'forward' ? 'backward' : 'forward'
	})

	btnMinus.addEventListener('click', () => {
		if (speed > 1) {
			speed--
		}
	})

	btnPlus.addEventListener('click', () => {
		if (speed < 10) {
			speed++
		}
	})
}

const draw = () => {
	if (stopAnimation) {
		return
	}
	const canvas = document.querySelector('canvas')
	const context = canvas.getContext('2d')
	const width = context.canvas.width
	const height = context.canvas.height

	context.clearRect(0, 0, width, height)

	// Draw x axis
	context.beginPath()
	context.strokeStyle = '#42f5f2'
	context.lineWidth = 1
	context.moveTo(0, height / 2)
	context.lineTo(width, height / 2)
	context.stroke()
	context.save()

	let x = 0
	let y = 0
	// Amplitude
	const waveHeight = 40
	// Frequency
	const waveWidth = 30

	// Draw wave
	context.beginPath()
	context.strokeStyle = '#42f5f2'
	context.lineWidth = 3
	context.moveTo(x, drawStartPoint)

	while (x < width) {
		if (direction === 'forward') {
			y = height / 2 + waveHeight * Math.sin((x + xOffset) / waveWidth)
		} else if (direction === 'backward') {
			y = height / 2 - waveHeight * Math.sin((x - xOffset) / waveWidth)
		}

		context.lineTo(x, y)
		x = x += 1
	}

	xOffset = xOffset += speed
	context.stroke()
	context.save()
	context.restore()
	window.requestAnimationFrame(draw)
}

init()
