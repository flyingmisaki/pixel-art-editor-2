import { BsEyedropper } from "react-icons/bs";
import { useBrushColor } from "../../../../../hooks/useBrushColor";

export default function ColorPicker() {
    const {brushColor, setBrushColor} = useBrushColor()

    const render = function() {
        return (
            <div className="ColorPicker">
                <button className="colorPickerButton"><BsEyedropper/></button>
                <div></div>
            </div>
        )
    }
    return render()
}