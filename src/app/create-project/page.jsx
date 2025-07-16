'use client'

import { useState, useEffect } from "react";
import Form from "../ui/Form";
import { DatePicker } from "../ui/DatePicker";
import { toast } from "sonner";
import Button from "../ui/Button";
import { redirect } from 'next/navigation'
import { createProject } from "../lib/data";

export default function CreateProject() {

    const [ formData, setFormData ] = useState({
        name: "",
        description: "",
        start_date: "",
        due_date: "",
        starred: false,
        status: "to-be-started"
    })
    
    
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
    
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.name) {
            toast.warning("Please enter a name for your project")
            return
        }

        try {
            const res = await createProject(formData)
            if(res.status === 200) {
                toast.success("New Project Created Successfully")
            }
        } catch ( err ) {
            console.log(err)
        } finally {
            redirect('/')
        }

    }

    return (
        // <Modal> 
            <div className="create-project-div">
                
                <h1>Create a new Project</h1>

                <Form>
                    <div className="form-area">
                    
                        <label htmlFor="project-id" > Name </label>
                        <input className="form-area-item" id="project-name" name = "name" value = { formData.name } onChange = { handleChange } required />
                        
                        <label htmlFor="project-description"> Description </label>
                        <input className="form-area-item" id="project-description" name="description" value = { formData.description } onChange = { handleChange } />
                        
                        <label> Start Date </label>
                        <DatePicker name = "start_date" value={ formData.start_date } label = "Start Date" handleChange = { handleDateChange }/>
                        
                        <label> Due Date </label>
                        <DatePicker name = "due_date" value={ formData.due_date } label = "Due Date" handleChange = { handleDateChange }/>

                        <label htmlFor="project-status">Status</label>
                        <select id="project-status" name="status" value = { formData.status } onChange = { handleChange }>
                            <option value="to-be-started">To be Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="opel">Complete</option>
                        </select>

                        <label htmlFor="project-favorite"> Favorite? </label>
                        <input id="project-favorite" type="checkbox" name="starred" checked={ formData.starred } onChange={ handleChange } />

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
