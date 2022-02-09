import {createContext} from "react"


const HistoryContext = createContext()

export function useHistory() {
    return useContext(HistoryContext)
}

export function HistoryProvider(props) {

    return (
        <HistoryContext.Provider value={historyData}>
            {props.children}
        </HistoryContext.Provider>
    )
}