// Converts a rgba color object to the format that the canvas is looking for
export function colorToCanvasColor(color){
    return `
        rgba(
            ${color.r},
            ${color.g},
            ${color.b},
            ${color.a}
        )
    `
}

// Converts rgba color object into hexa color string
export function colorToHexColor(color) {
    if (!color) return null
    
    const {r, g, b, a} = color
    const hexColorComponents = [
        r.toString(16), 
        g.toString(16), 
        b.toString(16), 
        a.toString(16)
    ]
    
    const stringComponents = hexColorComponents.map(component => (component.length === 1 ? "0" + component : component))
    const hexColor = `#${stringComponents.join("")}`
    
    return hexColor
}

// Compares 2 colors, returns true if they are identical(r, g, b, a)
export function colorsEqual(color1, color2) {
    if (!color1 || !color2) return color1 === color2
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a
}