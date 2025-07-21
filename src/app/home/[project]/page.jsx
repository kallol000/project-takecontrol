"use client"

import { useParams, useSearchParams } from "next/navigation"
import { buckets } from "@/app/lib/data"
import { useState, useEffect } from "react"
import { Droppable } from "@/app/ui/Droppable"
import { DndContext } from "@dnd-kit/core"
import TaskCard from "@/app/ui/TaskCard"
import taskstyles from "../../ui/css/taskCard.module.css"
import { IconTrashX, IconStarFilled, IconStar, IconEdit, IconPointFilled } from "@tabler/icons-react"
import ButtonUser from "@/app/ui/Button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fetchProjectDetails, createProject } from "@/app/lib/data"
import { useRouter } from "next/navigation"
import { updateProjectDetails, deleteProject, deleteTask } from "@/app/lib/data"
import { DatePicker } from "@/app/ui/DatePicker"
import styles from "../../ui/css/projectPage.module.css"
import { Toaster, toast } from "sonner";
import { SelectUser } from "@/app/ui/SelectUser"
import Modal from "@/app/ui/Modal"



export default function Project({params, children}){
    
    const router = useRouter()
    const [containers, setContainers] = useState()
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        status: "",
        starred: false,
        start_date: null,
        due_date: null,
        tasks: []
    })
    const [bucketReresh, setBucketRefresh] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteProjectModal, setDeleteProjectModal] = useState(false)
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)
    const [taskToBeDeleted, setTaskToBeDeleted] = useState(null)
    
    
    const { project } = useParams()
    const pathname = usePathname()
    
    
    const fetch = async () => {
        const res = await fetchProjectDetails( project )
        setProjectData(prev => res[0])
    }
    
    // console.log(projectData)


    useEffect(() => {
        fetch()
    }, [])

    // const handleDeleteTask = () => {
    //     console.log("hello")
    // }


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
                                <IconTrashX style={{cursor: "pointer"}}  size = { 16 } />
                            </div>

                            
                        
                        </TaskCard>)}
                    {/* <TaskCard id={Math.random()}>Hello</TaskCard> */}
                </Droppable>
            )
        }))
    }, [buckets, projectData, bucketReresh])

    // console.log(projectData)

    const handleDeleteProjectModalOpen = () => {
        setModalOpen(true)
        setDeleteProjectModal(true)
    }
    
    const handleDeleteTaskModalOpen = () => {
        setModalOpen(true)
        setDeleteTaskModal(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setDeleteProjectModal(false)
        setDeleteTaskModal(false)
    } 


    const handleDragEnd = async (e) => {
        
        const {over, active} = e;

        // console.log(over)
        if(over && over.id === "delete") {
            setTaskToBeDeleted(prev => active.id)
            handleDeleteTaskModalOpen()
            return
        }
        
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
        
        setProjectData(prev => ({
            ...prev,
            [name]: date
        }))
    }
    const handleSelectChange = (status) => {
        setProjectData(prev => ({
            ...prev, 
            status: status
        }))
    }

    const handleSave = async (id, payload) => {

        try {
            const res = await updateProjectDetails( id, payload )
            if(res.status === 200) {
                toast.success("Succesfully saved")
                console.log("hello")
            }
        } catch( err ) {
            // toast.error("there was an error")
        } finally {
            router.refresh()
        }
    }

    const handleDelete = async ( id ) => {
        try{
            const res = await deleteProject( id )
            console.log(res)
            if( res.status === 200 && res.data.length > 0 ) {
                toast.success("Deleted Successfully")
                router.back()
            } else {
                toast.error("There was an error")
            }
        } catch ( err ) {
            toast.error("There was an error")
        } finally {
        }
    }

    const handleDeleteTask = async (id) => {
        try {
                const res = await deleteTask( id ) 
                console.log(res)

                if(res.status === 200 && res.data.length > 0) {
                    toast.success("Deleted Successfully")
                } else {
                    toast.error("There was an error")
                }

            } catch ( err ) {
                toast.error("There was an error")
            }

            return
    }





    return (
        <div>
            <div className = { styles.projectDetailsDiv }>
                <div className = { `${ styles.inputDiv } ${ styles.nameDiv } `}>
                    <input id="project-name" className="input-borderless title" name = "name" value = { projectData.name } onChange = { handleChange } />
                </div>        
                
                <div className = { `${styles.inputDiv} ${styles.descriptionDiv}` }>
                    {/* <label htmlFor="project-description"> Description </label> */}
                    <input  id="project-description" className="input-borderless subtitle" name="description" placeholder="Add a description" value = { projectData.description } onChange = { handleChange } />
                </div>

                <div className = { styles.inputDiv }>
                    {/* <label> Start Date </label> */}
                    <DatePicker name = "start_date" placeHolder = "Start Date" value={ projectData.start_date } label = "Start Date" handleChange = { handleDateChange }/>
                </div>
                
                <div className = { styles.inputDiv }>
                    {/* <label> Due Date </label> */}
                    <DatePicker name = "due_date" placeHolder = "Due Date" value={ projectData.due_date } label = "Due Date" handleChange = { handleDateChange }/>
                </div>

                <SelectUser placeholder = "status" label = "status" options = {["to-be-started", "in-Progress", "completed"]} value = { projectData.status} onChange = {handleSelectChange}/>

                <div className = { styles.inputDiv }>
                    <label htmlFor="project-starred"> Favorite? </label>
                    <input type="checkbox" id="project-starred" name="starred" checked={ projectData.starred }  onChange={ handleChange } />
                </div>

            </div>
            <div className = {styles.taskDiv}>
                
                <DndContext onDragEnd={(e) => handleDragEnd(e)}>
                    {/* <div className = {styles.taskContainers}> */}
                        {containers}
                    {/* </div> */}
                    
                    <div className = {styles.deleteContainer} >
                        <Droppable id = "delete" key="delete">
                            <IconTrashX />
                            <p>Drop a task here to delete </p>
                        </Droppable>
                    </div>
                </DndContext>
            </div>
            <div className = { styles.saveDiv }>
                <ButtonUser onClick={ handleDeleteProjectModalOpen } variant = "destructive">Delete</ButtonUser>
                <ButtonUser onClick={() => handleSave( project, projectData )} variant = "action">Save</ButtonUser>
            </div>

            {
                modalOpen &&
                <Modal handleClose={ handleModalClose }>
                    {/* deleteProjectModal */}
                    <div className = { styles.confirmationDiv }>
                        <h1 className = { styles.confirmationHeader }>Are you sure?</h1>
                        <p className = { styles.confirmationInfo }>{`You are about to delete ${deleteProjectModal ? `the project ${projectData.name}` : `this task`} ` }</p>
                        <div className = { styles.confirmationAction }>
                            <ButtonUser onClick = { handleModalClose } variant = "default" >Cancel</ButtonUser>
                            <ButtonUser onClick = {deleteProjectModal ? () => handleDelete( project ) : () => handleDeleteTask(taskToBeDeleted) } variant = "destructive">Yes, delete</ButtonUser>
                        </div>
                    </div>
                </Modal>
            }


            <Toaster richColors />
        </div>
    )
}