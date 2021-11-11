import React from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import Layers from "./components/Layers/Layers"
import PixelCanvas from "./components/PixelCanvas/PixelCanvas"
// import ExportCanvas from "./components/ExportCanvas/ExportCanvas"
import { ChromePicker } from "react-color"
import { saveAs } from "file-saver"

function App() {
	const [brushColor, setBrushColor] = React.useState("#197D7DFF")
	const canvasRef = React.useRef(null)

	const [activeTool, setActiveTool] = React.useState(null)

	const exportImage = function() {
		if(!canvasRef.current) return
		const imageUrl = canvasRef.current.toDataURL("image/png")
		console.log("Exported to url: ", imageUrl)
		saveAs(imageUrl, "export.png")
	}

  	const render = function() {
    	return (
      		<div className="App">
				
				<div className="navBar">
					<NavBar></NavBar>
				</div>
				
				<div className="editor">
					
					<div className="leftPanel">
						<ToolBox 
							activeTool={activeTool}
							onSelectTool={setActiveTool}
						></ToolBox>
					</div>

					<div className="workspace">
						<PixelCanvas
							width={16}
							height={16}
							scale={50}
							brushColor={brushColor}
							activeTool={activeTool}
							onUpdate={(canvas) => canvasRef.current = canvas}
						></PixelCanvas>
					</div>

					<div className="rightPanel">
						<Layers></Layers>
					</div>

					{/* <div className="ColorPicker">
						<ChromePicker
							color={brushColor}
							onChangeComplete={(color) => setBrushColor(color.hex)}
						></ChromePicker>
					</div> */}

					{/* <div className="ExportCanvas">
						<button className="ExportButton" onClick={exportImage}>Export!</button>
					</div> */}
					
				</div>
				
      		</div>
    	)
  	}

  	return render()
}

export default App;