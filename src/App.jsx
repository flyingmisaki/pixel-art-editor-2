import React from "react"
import './App.css'
import PixelCanvas from './components/PixelCanvas/PixelCanvas'
import { ChromePicker } from 'react-color'
import { saveAs } from 'file-saver'

function App() {
	const [brushColor, setBrushColor] = React.useState("#00ffff")
	const canvasRef = React.useRef(null)

	const exportImage = function() {
		if(!canvasRef.current) return
		const imageUrl = canvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "export.png")
	}

  	const render = function() {
    	return (
      		<div className="App">
				<div className="ColorPicker">
          			<ChromePicker
            			color={brushColor}
            			onChangeComplete={(color) => setBrushColor(color.hex)}
          			></ChromePicker>
        		</div>
        		<div className="PixelCanvas">
          			<PixelCanvas
            			width={16}
            			height={16}
            			scale={50}
            			brushColor={brushColor}
						onUpdate={(canvas) => canvasRef.current = canvas}
          			></PixelCanvas>
        		</div>
				<div>
					<button onClick={exportImage}>Export!</button>
				</div>
      		</div>
    	)
  	}

  	return render()
}

export default App;