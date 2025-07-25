import styles from "./css/projectCard.module.css"
import { motion, AnimatePresence } from "motion/react"


export const ProjectCard = ({children}) => {
    return (
        <div>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="card">
                <div className={styles.projectCard} >
                    {children}
                </div>    
            </motion.div>
        </div>
    )
}