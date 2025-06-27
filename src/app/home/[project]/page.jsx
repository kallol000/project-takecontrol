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

import { fetchProjectDetails, updateProjectDetails } from "@/app/lib/data"



export default function Project({params, children}){
    
    // console.log(projectData)

    const [isDropped, setIsDropped] = useState(false)
    const [containers, setContainers] = useState()
    const [data, setData] = useState([])
    const [taskElems, setTaskElems] = useState([])
    const [parent, setParent] = useState(0)
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
    
    // useEffect(() => {
    //     if(data){
    //         if(data.tasks){
    //             setTaskElems(prev => data.tasks.map((task, index) => <TaskCard key={index} id={index}>{task.name}</TaskCard>))
    //         }
    //     }
    // }, [data])

    useEffect(() => {
        // console.log("refreshed")
        setContainers(prev => buckets.map((bucket, index) => {
            return (
                <Droppable key={index} id={bucket}>
                    {bucket}
                    {/* {data?.tasks?.filter(task => task.status} */}
                    {data?.tasks?.filter(task => task.status === bucket).map((elem, idx) => <TaskCard key={idx} id={elem.id}>{elem.name}</TaskCard>)}
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
        <div style={{padding: " 4rem", display: "flex", gap: "10px"}}>
            <DndContext onDragEnd={(e) => handleDragEnd(e)}>
                {/* {taskElems} */}
                {containers}
            </DndContext>
            {/* {projectData} */}
            <button id="button" onClick={() => handleSave(projectId, data)}>Save</button>
        </div>
    )
}