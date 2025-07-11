"use client"

import { useParams, useSearchParams } from "next/navigation"
import Form from "@/app/ui/Form"
import { buckets } from "@/app/lib/data"
import { useState, useEffect } from "react"
import { Droppable } from "@/app/ui/Droppable"
import { DndContext } from "@dnd-kit/core"
import TaskCard from "@/app/ui/TaskCard"
import taskstyles from "../../ui/css/taskCard.module.css"
import { IconStarFilled, IconStar, IconEdit, IconPointFilled } from "@tabler/icons-react"
import ButtonUser from "@/app/ui/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fetchProjectDetails, createProject } from "@/app/lib/data"
import { useRouter } from "next/navigation"
import { updateProjectDetails } from "@/app/lib/data"
import { DatePicker } from "@/app/ui/DatePicker"
import styles from "../../ui/css/projectPage.module.css"
import { Button } from "@/app/components/ui/button"


export default function Project({params, children}){
    
    const router = useRouter()
    // console.log(projectData)
    const [containers, setContainers] = useState()
    const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    starred: false,
    start_date: null,
    due_date: null,
    tasks: []
})
    const [bucketReresh, setBucketRefresh] = useState(false)


    const { project } = useParams()
    const pathname = usePathname()


    const fetch = async () => {
        const res = await fetchProjectDetails( project )
        setProjectData(prev => res[0])
    }

    // console.log(projectData)


    useEffect(() => {
        fetch()
        console.log("fetched")
    }, [])


    useEffect(() => {
        // console.log("refreshed")
        setContainers(prev => buckets.map((bucket, index) => {
            return (
                <Droppable key={index} id={bucket}>
                    <div className = {styles.bucketHeader}>
                        {bucket}
                    </div>
                    {/* {projectData?.tasks?.filter(task => task.status} */}
                    {projectData?.tasks?.filter(task => task.status === bucket).map((elem, idx) => 
                        <TaskCard key={ idx } id={ elem.id }>
                            <div className = { taskstyles.title }>
                                <h1>{ elem.name }</h1>    
                            </div>

                            <div className = { taskstyles.cta }>
                                <IconPointFilled color = { elem.status === 'to-be-started' ? '#5E5E5E' : elem.status === 'in-progress' ? '#F68537' : '#117E5B' } size = { 16 } />
                                <Link href = {`${pathname}/${elem.id}`}>
                                    <IconEdit size={ 16 } />
                                </Link>
                            </div>

                            
                        
                        </TaskCard>)}
                    {/* <TaskCard id={Math.random()}>Hello</TaskCard> */}
                </Droppable>
            )
        }))
    }, [buckets, projectData, bucketReresh])

    // console.log(projectData)


    const handleDragEnd = (e) => {
        // console.log(e)
        const {over, active} = e;
        // console.log("over", over)
        if(over){
            setProjectData(prev => {
                let result = prev
                let target = result.tasks.filter(task => task.id === active.id)
                target[0].status = over.id
                result.tasks = [...result.tasks.filter(task => task.id !== active.id), target[0]]
                return result
            })
        }
        setBucketRefresh(prev => !prev)
    }

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target

        setProjectData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleDateChange = (name, date) => {

        
        date = date.toLocaleDateString()
        // console.log(name, date)


        setProjectData(prev => ({
            ...prev,
            [name]: date
        }))
    }

    const handleSave = async (id, payload) => {

        try {
            const res = await updateProjectDetails( id, payload )
            console.log(res)
        } catch( err ) {
            console.log(err)
        } finally {
            router.refresh()
        }
        // console.log(id, projectData)
    }


    console.log(projectData)

    return (
        <div>
            <div className = { styles.projectDetailsDiv }>
                <div className = { `${ styles.inputDiv } ${ styles.nameDiv } `}>
                    <input id="project-name" className="input-borderless title" name = "name" value = { projectData.name } onChange = { handleChange } />
                </div>        
                
                <div className = { `${styles.inputDiv} ${styles.descriptionDiv}` }>
                    {/* <label htmlFor="project-description"> Description </label> */}
                    <input  id="project-description" className="input-borderless subtitle" name="description" value = { projectData.description } onChange = { handleChange } />
                </div>

                <div className = { styles.inputDiv }>
                    {/* <label> Start Date </label> */}
                    <DatePicker name = "start_date" placeHolder = "Start Date" value={ projectData.start_date } label = "Start Date" handleChange = { handleDateChange }/>
                </div>
                
                <div className = { styles.inputDiv }>
                    {/* <label> Due Date </label> */}
                    <DatePicker name = "due_date" placeHolder = "Due Date" value={ projectData.due_date } label = "Due Date" handleChange = { handleDateChange }/>
                </div>
                
                <div className = { styles.inputDiv }>
                    {/* <label htmlFor="project-status">Status</label> */}
                    <select id="project-status" name="status" value = { projectData.status } onChange = { handleChange }>
                        <option value="to-be-started">To be Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="opel">Complete</option>
                    </select>                
                </div>

                <div className = { styles.inputDiv }>
                    <label htmlFor="project-starred"> Favorite? </label>
                    <input type="checkbox" id="project-starred" name="starred" value={ projectData.starred }  />
                </div>

            </div>
            <div className = {styles.taskDiv}>
                
                <DndContext onDragEnd={(e) => handleDragEnd(e)}>
                    {containers}
                </DndContext>
            </div>
            <div className = { styles.saveDiv }>
                <ButtonUser onClick={() => handleSave( project, projectData )} variant = "action">Save</ButtonUser>
            </div>

        </div>
    )
}