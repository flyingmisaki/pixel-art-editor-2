import {React} from "react"
import './App.css'
import NavBar from "./components/NavBar/NavBar"
import ToolBox from "./components/ToolBox/ToolBox"
import LayersPanel from "./components/LayersPanel/LayersPanel"
import Workspace from "./components/Workspace/Workspace"
import StatusBar from "./components/StatusBar/StatusBar"

// import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"

// import ExportCanvas from "./components/ExportCanvas/ExportCanvas"

import {BrushColorProvider} from "./hooks/useBrushColor"
import {ActiveToolProvider} from "./hooks/useActiveTool"
import {LayersProvider} from "./hooks/useLayers"

function App() {

  	const render = function() {
    	return (
      		<div className="App">
				<NavBar/>
				<div className="editor">
					<ToolBox/>
					<Workspace/>
					<LayersPanel/>
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
					<App/>
				</LayersProvider>
			</BrushColorProvider>
		</ActiveToolProvider>
	)
}