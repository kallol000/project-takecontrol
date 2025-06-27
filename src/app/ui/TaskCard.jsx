import { Draggable } from "./Draggable"

export default function TaskCard({children, id}) {
    
    const style = {
        border: "2 px solid black",
        minWidth: "70px",
        minHeight: "30px"
    }
    
    return (
        <Draggable id = {id}>
            <div style = {style}>
                {children}
            </div>
        </Draggable>
    )
}