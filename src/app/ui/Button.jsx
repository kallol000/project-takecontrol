import styles from '../ui/css/button.module.css'

export default function Button ({ children, variant, onClick }) {
    return (
        <button onClick = {onClick} className = { `${styles.button} ${styles[variant]}` }>{ children }</button>
    )
}