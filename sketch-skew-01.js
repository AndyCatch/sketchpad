const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')

const settings = {
	dimensions: [1080, 1080],
}

const sketch = () => {
	// variables declared outside the return (render)
	// function only need to be declared once
	let x, y, w, h
	let angle, rx, ry

	// this is like draw() for p5.js
	return ({ context, width, height }) => {
		context.fillStyle = 'white'
		context.fillRect(0, 0, width, height)

		x = width * 0.5
		y = height * 0.5
		w = width * 0.6
		h = height * 0.1

		context.save()
		context.translate(x, y)
		context.strokeStyle = 'blue'

		drawSkewedRect({ context })

		context.restore()
	}
}

const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
	const angle = math.degToRad(degrees)
	const rx = Math.cos(angle) * w
	const ry = Math.sin(angle) * w

	context.save()
	context.translate(rx * -0.5, (ry + h) * -0.5)
	context.beginPath()
	context.moveTo(0, 0)
	context.lineTo(rx, ry)
	context.lineTo(rx, ry + h)
	context.lineTo(0, h)
	context.closePath()
	context.stroke()
	context.restore()
}

canvasSketch(sketch, settings)
