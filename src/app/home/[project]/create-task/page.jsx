'use client'

import { useState, useEffect } from "react";
import Form from "@/app/ui/Form";
import { DatePicker } from "@/app/ui/DatePicker";
import { toast, Toaster } from "sonner";
import ButtonUser from "@/app/ui/Button";
import { redirect } from 'next/navigation'
import { useParams } from "next/navigation";
import { createTask } from "@/app/lib/data";
import { useRouter } from "next/navigation";
// import { createProject } from "../lib/data";

export default function CreateTask({}) {
    
    const router = useRouter()

    const { project } = useParams()
    
    const [ formData, setFormData ] = useState({
        name: "",
        description: "",
        start_date: null,
        due_date: null,
        status: "to-be-started",
        project_id: project
    })

    const [dateRange, setDateRange] = useState(['7/16/2025', '7/25/2025'])

    

    
    // console.log(formData)
    
    const handleChange = (e) => {
        const { value, name, type } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleDateChange = (name, date) => {

        
        date = date.toLocaleDateString()
        // console.log(name, date)


        setFormData(prev => ({
            ...prev,
            [name]: date
        }))
    }
    
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.name) {
            toast.warning("Please enter a name for your Task")
            return
        }



        try {
            const res = await createTask(formData)
            if(res.status === 200) {
                toast.success("New Task Created Successfully")
            }
        } catch ( err ) {
            console.log(err)
        } finally {
            router.back()
            // router.refresh()
        }

    }

    return (
        <div className="create-task-div">
            
            <h1>Create a new Task</h1>
            
            <Form>
                <div className="form-area">
                
                    <label htmlFor="project-id" > Name </label>
                    <input className="form-area-item" id="project-name" name = "name" value = { formData.name } onChange = { handleChange } required />
                    
                    <label htmlFor="project-description"> Description </label>
                    <input className="form-area-item" id="project-description" name="description" value = { formData.description } onChange = { handleChange } />
                    
                    <label> Start Date </label>
                    <DatePicker name = "start_date" value={ formData.start_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Start Date" handleChange = { handleDateChange }/>
                    
                    <label> Due Date </label>
                    <DatePicker name = "due_date" value={ formData.due_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Due Date" handleChange = { handleDateChange }/>

                    <label htmlFor="project-status">Status</label>
                    <select id="project-status" name="status" value = { formData.status } onChange = { handleChange }>
                        <option value="to-be-started">To be Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="opel">Complete</option>
                    </select>

                    <ButtonUser onClick = {handleSubmit} variant = "action">
                        Submit
                    </ButtonUser>
                    {/* <button onClick = {handleSubmit}></button> */}
                    
                </div>    
            </Form>
        
            {/* <Toaster richColors /> */}
        </div>
    );
}
