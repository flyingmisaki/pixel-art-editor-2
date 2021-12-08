import {React} from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import ProjectOptions from "./components/ProjectOptions/ProjectOptions"
import Workspace from "./components/Workspace/Workspace"
import StatusBar from "./components/StatusBar/StatusBar"

// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"

// import ExportCanvas from "./components/ExportCanvas/ExportCanvas"

import {BrushColorProvider} from "./hooks/useBrushColor"
import {ActiveToolProvider} from "./hooks/useActiveTool"
import {LayersProvider} from "./hooks/useLayers"
import {CanvasPositionProvider} from "./hooks/useCanvasPosition"

// Project settings
const WIDTH = 16
const HEIGHT = 16
const SCALE = 55

function App() {
  	const render = function() {
    	return (
      		<div className="App">
				<NavBar/>
				<div className="editor">
					<ToolBox/>
					<Workspace
						width={WIDTH}
						height={HEIGHT}
						scale={SCALE}
					/>
					<ProjectOptions/>
				</div>
				<StatusBar/>
      		</div>
    	)
  	}

  	return render()
}

export default function AppWithContext() {
	return (
		<ActiveToolProvider>
			<BrushColorProvider>
				<LayersProvider>
					<CanvasPositionProvider>
						<App/>
					</CanvasPositionProvider>
				</LayersProvider>
			</BrushColorProvider>
		</ActiveToolProvider>
	)
}