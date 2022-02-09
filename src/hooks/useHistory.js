import {createContext} from "react"

const HistoryContext = createContext()

export function useHistory() {
    return useContext(HistoryContext)
}

export function HistoryProvider(props) {
    const [undoStack, setUndoStack] = useState([])
    const [redoStack, setRedoStack] = useState([])

    const handleUndo = function() {
        setUndoStack(undoStack.push())
    }

    const historyData = {
        undoStack, setUndoStack,
        redoStack, setRedoStack
    }

    return (
        <HistoryContext.Provider value={historyData}>
            {props.children}
        </HistoryContext.Provider>
    )
}