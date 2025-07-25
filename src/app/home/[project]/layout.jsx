'use client'

import ButtonUser from "@/app/ui/Button"
import { Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Layout({ modal, children }) {

    const pathname = usePathname()

    // console.log(pathname)

    return (
        <div>
            <div style = {{ position: "absolute", top: "6.5rem", right: "2rem" }}>
                <Link href = {{
                    pathname: `${pathname}/create-task`,
                    query: {prevPath: pathname}
                    // query: {}
                }}>
                    <ButtonUser variant = "default">
                        <Plus />
                        Task
                    </ButtonUser>
                </Link>
            </div>
            {modal}
            {children}
        </div>
            
    )
}