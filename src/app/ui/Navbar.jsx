import styles from "./css/navbar.module.css"

export const Navbar = ({children}) => {
    return (
        <div className={styles.navbar}>
            { children }
        </div>
    )
}