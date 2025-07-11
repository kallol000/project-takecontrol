'use client'
import styles from './css/modal.module.css'
import { X } from 'lucide-react'
 
// import { IoMdClose } from "react-icons/io";
export default function Modal({children, handleClose}){

    return(
        <>  
            <div className={ styles.darkBG } onClick={ handleClose } />
            <div className={ styles.centered }>

                <div className={styles.modal}>
                    <X onClick={ handleClose } className = { styles.close }/>
                    <div className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
            
        </>
    )
}