import styles from "./css/projectCard.module.css"

export const ProjectCard = ({children}) => {
    return (
        <div className={styles.projectCard}>
            {children}
        </div>
    )
}