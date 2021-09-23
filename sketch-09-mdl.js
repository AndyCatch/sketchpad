const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 20
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1) // working in uv space, vals 0...1
        const v = count <= 1 ? 0.5 : y / (count - 1)

        points.push({
          radius: Math.abs(random.gaussian() * 0.01),
          position: [u, v],
        })
      }
    }

    return points
  }

  // random.setSeed(2) // This maintains same level of randomness... deterministic
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 600

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { position, radius } = data // destructuring (!!!)
      const [u, v] = position

      const x = math.lerp(margin, width - margin, u)
      const y = math.lerp(margin, height - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.fillStyle = 'red'
      context.fill()
    })
  }
}

canvasSketch(sketch, settings)
