const draw = (timestamp) => {
	const count = Math.floor(0.1 * timestamp)
	console.log(count)
	const canvas = document.querySelector('canvas')
	const context = canvas.getContext('2d')
	context.clearRect(0, 0, 500, 500)

	const width = context.canvas.width
	const height = context.canvas.height
	let x = 0
	let y = 0
	const waveHeight = 40
	const waveWidth = 30
	let xOffset = 0

	context.beginPath()
	context.strokeStyle = '#42f5f2'
	context.lineWidth = 3
	context.moveTo(x, 77)

	while (x < width) {
		y = height / 2 + waveHeight * Math.sin((x + xOffset) / waveWidth)
		context.lineTo(x, y)
		x = x += 1
	}
	xOffset += 1
	context.stroke()
	context.save()
	context.restore()
	window.requestAnimationFrame(draw)
}

// window.requestAnimationFrame(draw)
