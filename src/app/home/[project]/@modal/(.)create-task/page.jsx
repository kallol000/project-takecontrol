'use client'

import Modal from "@/app/ui/Modal";
import CreateTask from "../../create-task/page";
import { useRouter } from "next/navigation";


export default function Page() {

    const router = useRouter()

    const handleClose = () => {
        // router.push(router.back())
        router.back()
        // router.refresh()
    }

    return(
        <Modal handleClose = { handleClose } >
            
            <CreateTask />
        </Modal>
    )
}