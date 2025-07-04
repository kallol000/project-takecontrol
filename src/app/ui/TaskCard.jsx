import { Draggable } from "./Draggable"
import styles from './css/taskCard.module.css'

export default function TaskCard({children, id}) {
    
    return (
        <Draggable id = {id}>
            <div className = {styles.taskCard}>
                {children}
            </div>
        </Draggable>
    )
}