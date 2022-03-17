import { useState } from "react"
import {BsCaretLeft, BsCaretDownFill} from "react-icons/bs"

import "./OptionWindow.css"

export default function OptionWindow(props) {
    const title = props.title
    const onExpand = props.onExpand ?? (() => {})
    const onCollapse = props.onCollapse ?? (() => {})

    const [expanded, setExpanded] = useState(true)

    const collapse = function() {
        setExpanded(false)
        onCollapse()
    }

    const expand = function() {
        setExpanded(true)
        onExpand()
    }

    const renderExpandButton = function() {
        if (expanded) return <button onClick={collapse}><BsCaretDownFill/></button>
        return <button onClick={expand}><BsCaretLeft/></button>
    }

    const render = function() {
        return (
            <div className="optionWindow">
                <div className="titleBar">
                    <h2 className="title">{title}</h2>
                    {renderExpandButton()}
                </div>
                <div style={{display: expanded ? "block" : "none"}}>
                    {props.children}
                </div>
            </div>
        )
    }

    return render()
}