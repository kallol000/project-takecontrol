'use client'

import { useState, useEffect } from "react";
import Form from "../ui/Form";
import { DatePicker } from "../ui/DatePicker";
import { toast } from "sonner";
import Button from "../ui/Button";
import { redirect } from 'next/navigation'
import { createProject } from "../lib/data";
import { SelectUser } from "../ui/SelectUser";
import { useRouter } from "next/navigation";

export default function CreateProject() {

    const [ formData, setFormData ] = useState({
        name: "",
        description: "",
        start_date: "",
        due_date: "",
        starred: false,
        status: "to-be-started"
    })
    
    const router = useRouter()
    // console.log(formData)
    
    const handleChange = (e) => {
        const { value, name, checked, type } = e.target

        setFormData(prev => ({
            ...prev,
            [name] : type === "checkbox" ? checked : value
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

    const handleSelectChange = (status) => {
        setFormData(prev => ({
            ...prev, 
            status: status
        }))
    }
    
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.name) {
            toast.warning("Please enter a name for your project")
            return
        }

        let payload = {...formData}
        payload.start_date = payload.start_date === "" ? null : payload.start_date
        payload.due_date = payload.due_date === "" ? null : payload.due_date

        console.log(payload)

        try {
            const res = await createProject(payload)
            if(res.status === 200) {
                toast.success("New Project Created Successfully")
            }
        } catch ( err ) {
            console.log(err)
            toast.error("There was an error")
        } finally {
            router.push('/')
            // redirect('/')
        }

    }

    return (
        // <Modal> 
            <div className="create-project-div">
                
                <h1>Create a new Project</h1>

                <Form>
                    <div className="form-area">
                    
                        <input placeholder="Name" className="form-area-item input-user" id="project-name" name = "name" value = { formData.name } onChange = { handleChange } required />
                        
                        <input placeholder="Description" className="form-area-item input-user" id="project-description" name="description" value = { formData.description } onChange = { handleChange } />
                        

                        <div style={{display: "flex", gap: "1rem"}}>
                            <DatePicker placeHolder = "Start Date" name = "start_date" value={ formData.start_date } label = "Start Date" handleChange = { handleDateChange }/>
                            <DatePicker placeHolder = "Due Date" name = "due_date" value={ formData.due_date } label = "Due Date" handleChange = { handleDateChange }/>
                        </div>

                        <SelectUser placeholder = "status" label = "status" options = {["to-be-started", "in-Progress", "completed"]} value = { formData.status} onChange = {handleSelectChange}/>
                        

                        <div style={{display: "flex", gap: "1rem"}}>
                            <label htmlFor="project-favorite"> Favorite? </label>
                            <input id="project-favorite" type="checkbox" name="starred" checked={ formData.starred } onChange={ handleChange } />
                        </div>

                        <Button onClick = {handleSubmit} variant = "action">
                            Submit
                        </Button>
                        {/* <button onClick = {handleSubmit}></button> */}
                        
                    </div>    
                </Form>
            
                {/* <Toaster richColors /> */}
            </div>
        // </Modal>
    );
}
