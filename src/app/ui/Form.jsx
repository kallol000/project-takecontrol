'use client'

export default function Form({ children }) {
    return (
        <form style = {{display: 'flex', flexDirection: "column"}}>
            {children}
        </form>
    )
}