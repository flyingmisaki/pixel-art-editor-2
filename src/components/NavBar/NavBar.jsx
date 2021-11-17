import React from "react"
import "./NavBar.css"

export default function NavBar() {
    
    const render = function() {
        return (
            <div className="nav">
                <div>LOGO</div>
                <div>File</div>
                <div>Edit</div>
                <div>Selection</div>
            </div>
            
        )
    }

    return render()
}