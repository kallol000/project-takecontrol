import styles from '../ui/css/button.module.css'

export default function Button ({ children }) {
    return (
        <button className = { styles.buttonDefault }>{ children }</button>
    )
}