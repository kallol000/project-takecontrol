"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { fetchTaskDetails, updateTaskDetails } from "@/app/lib/data"
import { DatePicker } from "@/app/ui/DatePicker"
import { SelectUser } from "@/app/ui/SelectUser"
import ButtonUser from "@/app/ui/Button"
import Modal from "@/app/ui/Modal"
import {toast} from "sonner"
// import {Router} from "express"
import { useRouter } from "next/navigation"

export default function EditTask({ children }) {
    
    const { project, task } = useParams()
    const router = useRouter()

    // console.log(task)

    const [taskData, setTaskData] = useState({
        name: "",
        description: "",
        status: "",
        // starred: false,
        start_date: null,
        due_date: null, 
        project_id: project
    })

    // console.log(taskData)    

    const dateRange = useState([])

    const fetch = async () => {
        const res = await fetchTaskDetails(task)
        setTaskData(res[0])
    }

    useEffect(() => {
        fetch()
    }, [])


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target

        setTaskData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleDateChange = (name, date) => {
        
        date = date.toLocaleDateString()
        
        setTaskData(prev => ({
            ...prev,
            [name]: date
        }))
    }

    const handleSelectChange = (status) => {
        setTaskData(prev => ({
            ...prev, 
            status: status
        }))
    }
    
    const handleSubmit = async() => {
        try {
            const res = await updateTaskDetails( task, taskData )
            if(res.status === 200) {
                toast.success( "updated successfully" )
                router.back()
            }
            console.log(res)

        } catch ( error ) {
            console.log ( error )
        }
    }


    return (
        <Modal>
            {/* <div> */}
                <div className="form-area">
                    
                    <h1>Update Task Details</h1>
                                
                    <input placeholder="Name" className="form-area-item input-user" id="project-name" name = "name" value = { taskData.name } onChange = { handleChange } required />
                    
                    <input placeholder="Description" className="form-area-item input-user" id="project-description" name="description" value = { taskData.description } onChange = { handleChange } />
                    
                    <DatePicker placeHolder = "Start Date" name = "start_date" value={ taskData.start_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Start Date" handleChange = { handleDateChange }/>
                    
                    <DatePicker placeHolder = "Due Date" name = "due_date" value={ taskData.due_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Due Date" handleChange = { handleDateChange }/>

                    <SelectUser placeholder = "status" label = "status" options = {["to-be-started", "in-progress", "completed"]} value = { taskData.status} onChange = {handleSelectChange}/>

                    <ButtonUser onClick = {handleSubmit} variant = "action">
                        Submit
                    </ButtonUser>
                    {/* <button onClick = {handleSubmit}></button> */}
                    
                </div>    
            {/* </div> */}
        </Modal>
    )
}