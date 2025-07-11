'use client'

import Modal from "@/app/ui/Modal"
import { useRouter } from "next/navigation"
import CreateProject from "@/app/create-project/page"

export default function Page() {

    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    return (
        <Modal handleClose={handleClose} >
            <CreateProject />
        </Modal>
    )
}