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
import { SelectUser } from "@/app/ui/SelectUser";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { fetchProjectDetails } from "@/app/lib/data";
// import { useParams } from "next/navigation";
// import { createProject } from "../lib/data";

export default function CreateTask({}) {
    
    const router = useRouter()
    const { project } = useParams()

    console.log(project)

    const fetch = async () => {
        const res = await fetchProjectDetails(project)
        const data = res[0]
        setDateRange(prev => ([data.start_date, data.due_date]))
    }

    useEffect(() => {
        fetch()
    }, [])



    
    const [ formData, setFormData ] = useState({
        name: "",
        description: "",
        start_date: null,
        due_date: null,
        status: "to-be-started",
        project_id: project
    })

    const [dateRange, setDateRange] = useState([])

    

    
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
        
        setFormData(prev => ({
            ...prev,
            [name]: date
        }))
    }

    const handleSelectChange = (status) => {
        setFormData(prev => ({
            ...prev, 
            status: status
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
            console.log(res)
            if(res.status === 200) {
                toast.success("New Task Created Successfully")
                router.back()
            }
        } catch ( err ) {
            toast.error("There was an error")
        } finally {
        }

    }

    return (
        <div className="create-task-div">
            
            <h1>Create a new Task</h1>
            
            <Form>
                <div className="form-area">
                
                    <input placeholder="Name" className="form-area-item input-user" id="project-name" name = "name" value = { formData.name } onChange = { handleChange } required />
                    
                    <input placeholder="Description" className="form-area-item input-user" id="project-description" name="description" value = { formData.description } onChange = { handleChange } />
                    
                    <DatePicker placeHolder = "Start Date" name = "start_date" value={ formData.start_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Start Date" handleChange = { handleDateChange }/>
                    
                    <DatePicker placeHolder = "Due Date" name = "due_date" value={ formData.due_date } minDate = {dateRange[0]} maxDate={dateRange[1]} label = "Due Date" handleChange = { handleDateChange }/>

                    <SelectUser placeholder = "status" label = "status" options = {["to-be-started", "in-progress", "completed"]} value = { formData.status} onChange = {handleSelectChange}/>

                    <ButtonUser onClick = {handleSubmit} variant = "action">
                        Submit
                    </ButtonUser>
                    {/* <button onClick = {handleSubmit}></button> */}
                    
                </div>    
            </Form>

            {/* <Toaster richColors /> */}
        
            {/* <Toaster richColors /> */}
        </div>
    );
}
