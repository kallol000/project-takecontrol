'use client'

import ButtonUser from "../ui/Button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useParams, usePathname } from "next/navigation"


export default function Layout ({ children }) {
    
    return (
        <div>
            { children } 
        </div>
    )
}