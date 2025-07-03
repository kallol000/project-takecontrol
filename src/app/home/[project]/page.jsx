"use client"

import { useParams, useSearchParams } from "next/navigation"
// inport useSearchParams
// import { buckets } from "../../../server/data"
import { buckets } from "@/app/lib/data"
import { useState, useEffect } from "react"
import { Droppable } from "@/app/ui/Droppable"
import { Draggable } from "@/app/ui/Draggable"
import { DndContext } from "@dnd-kit/core"
import { projectData } from "../../../server/data"
import TaskCard from "@/app/ui/TaskCard"
import styles from "../../ui/css/taskCard.module.css"
import { IconStarFilled, IconStar, IconEdit } from "@tabler/icons-react"
import Button from "@/app/ui/Button"

import { fetchProjectDetails, createProject } from "@/app/lib/data"



export default function Project({params, children}){
    
    // console.log(projectData)
    const [containers, setContainers] = useState()
    const [data, setData] = useState([])
    const [bucketReresh, setBucketRefresh] = useState(false)

    const projectInfo = useParams()
    const projectId = projectInfo.project

    const fetch = async () => {
        const res = await fetchProjectDetails(projectId)
        setData(prev => res[0])
    }

    useEffect(() => {
        fetch()
    }, [])

    console.log(data)

    useEffect(() => {
        // console.log("refreshed")
        setContainers(prev => buckets.map((bucket, index) => {
            return (
                <Droppable key={index} id={bucket}>
                    <div>
                        {bucket}
                    </div>
                    {/* {data?.tasks?.filter(task => task.status} */}
                    {data?.tasks?.filter(task => task.status === bucket).map((elem, idx) => 
                        <TaskCard key={idx} id={elem.id}>
                            <div className = { styles.status }></div>
                            <div className = { styles.main }>
                                <div className = { styles.title }>
                                    <h1>{elem.name}</h1>
                                    {elem.starred ? <IconStarFilled size={16} color="black"/> : <IconStar size={16} /> }
                                </div>
                                

                                <div className = { styles.cta }>
                                    <p>Due Date: {elem.due_date}</p>
                                    <Button>
                                        <IconEdit size={16} />
                                    </Button>
                                </div>

                            </div>
                        
                        </TaskCard>)}
                    {/* <TaskCard id={Math.random()}>Hello</TaskCard> */}
                </Droppable>
            )
        }))
    }, [buckets, data, bucketReresh])

    // // console.log(data)

    const handleDragEnd = (e) => {
        console.log(e)
        const {over, active} = e;
        if(over){
            setData(prev => {
                let result = prev
                let target = result.tasks.filter(task => task.id === active.id)
                target[0].status = over.id
                result.tasks = [...result.tasks.filter(task => task.id !== active.id), target[0]]
                return result
            })
        }
        setBucketRefresh(prev => !prev)
    }

    const handleSave = async (id, payload) => {

        // console.log(id, data)
        const res = await updateProjectDetails(id, payload)
        console.log(res)
    }


    // console.log(data)

    return (
        <div className = "task-div">
            <DndContext onDragEnd={(e) => handleDragEnd(e)}>
                {containers}
            </DndContext>
            {/* {projectData} */}
            <button id="button" onClick={() => handleSave(projectId, data)}>Save</button>
            <button onClick={() => createProject({name: "Write a novel"})} >Create a new project</button>
        </div>
    )
}