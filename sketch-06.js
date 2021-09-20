const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    // const cols = 10 // ⇅
    // const rows = 10 // ⟷
    const cols = params.cols // ⇅
    const rows = params.rows // ⟷
    const numCells = cols * rows // Area of the grid

    const gridW = width * 0.8 // as a % of canvas
    const gridH = height * 0.8
    const cellW = gridW / cols
    const cellH = gridH / rows
    const margX = (width - gridW) * 0.5
    const margY = (height - gridH) * 0.5

    const frameMult = 20

    for (i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellW
      const y = row * cellH
      const lineW = cellW * 0.8
      const lineH = cellH * 0.8

      const f = params.animate ? frame : params.frame
      // const f = conditional ? value when cond. is true : value when cond. is false

      // const n = random.noise2D(x + frame * frameMult, y, params.freq)
      const n = random.noise3D(x, y, f * frameMult, params.freq)

      const angle = n * Math.PI * params.amp
      // const scale = ((n + 1) / 2) * 30 // this maps
      // const scale = (n * 0.5 + 0.5) * 30 // this maps
      const scale = math.mapRange(n, -1, 1, 1, 120)

      context.save()
      context.translate(x, y)
      context.translate(margX, margY)
      context.translate(cellW * 0.5, cellH * 0.5)
      context.rotate(angle)

      context.lineWidth = scale
      context.lineCap = params.lineCap

      context.beginPath()
      context.moveTo(lineW * -0.5, 0)
      context.lineTo(lineW * 0.5, 0)
      context.stroke()

      context.restore()
    }
  }
}

const createPane = () => {
  const pane = new Tweakpane.Pane()

  let folder
  folder = pane.addFolder({ title: 'Grid' })
  folder.addInput(params, 'lineCap', {
    options: { butt: 'butt', round: 'round', square: 'square' },
  })
  folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 })
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 })
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 })
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 })

  folder = pane.addFolder({ title: 'Noise' })
  folder.addInput(params, 'freq', { min: -0.01, max: 0.01 })
  folder.addInput(params, 'amp', { min: 0, max: 1 })
  folder.addInput(params, 'animate')
  folder.addInput(params, 'frame', { min: 0, max: 999 })
}

createPane()
canvasSketch(sketch, settings)
