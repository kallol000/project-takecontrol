import styles from '../ui/css/button.module.css'

export default function ButtonUser ({ children, variant, onClick }) {
    return (
        <button onClick = {onClick} className = { `${styles.buttonuser} ${styles[variant]}` }>{ children }</button>
    )
}