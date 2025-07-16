'use client'

import { ProjectCard } from "../ui/ProjectCard"
import Link from "next/link"
import { IconStarFilled, IconStar } from '@tabler/icons-react';
import styles from '../ui/css/projectCard.module.css'
import Button from "../ui/Button";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { TooltipTrigger, Tooltip, TooltipContent } from "@/components/ui/tooltip";


export default function Home({data}) {

    const [ projects, setProjects ] = useState([])
    const [ projectElems, setProjectElems ] = useState([])

    // console.log(projects)

    const handleChange = ( selectedProject ) => {
        console.log(selectedProject.id)
        setProjects(prev => prev.map(project => {
            if(project.id === selectedProject.id) {
                return {
                    ...project,
                    starred: !project.starred
                }
            }
            return project
        }))
    }


    useEffect(() => {
        setProjects(data)
    },[])
    // console.log(data)

    useEffect (() => {

        setProjectElems(prev => 
            projects.map((project, index) => 
                
                <ProjectCard key={project.id} id = {project.id}>   
                    <div className = {`${styles.status} ${project.status === 'to-be-started' ? styles.toBeStarted : project.status === 'in-progress' ? styles.inProgress : styles.complete}`}></div>
                    <div className = {styles.main}>
                        <div className = {styles.title}>
                            <h1>{project.name}</h1>
                            {project.starred ? 
                                <Tooltip>
                                    <TooltipContent><p>Remove from favourites</p></TooltipContent>
                                    <TooltipTrigger asChild>
                                        <IconStarFilled size={16} onClick={() => handleChange(project)} color="black"/>  
                                    </TooltipTrigger>
                                </Tooltip> :
                                <Tooltip>
                                    <TooltipContent><p>Mark as favourite</p></TooltipContent>
                                    <TooltipTrigger asChild>
                                        <IconStar onClick={() => handleChange(project)} size={16} />
                                    </TooltipTrigger>                                
                                </Tooltip>
                                 }
                        </div>
                        
                        <div className = {styles.description}><p>{project.description}</p></div>
                        
                        <p>Due Date: {project.due_date}</p>
                        <div className = {styles.cta}>
                            <p style = {{color: project.status === 'to-be-started' ? '#5E5E5E' : project.status === 'in-progress' ? '#F68537' : '#117E5B'}}>{project.status}</p>
                                <Link 
                                    key = {index}
                                    href = {
                                        {
                                            pathname: `/home/${project.id}`
                                        }
                                    }
                                    >
                                    <Button variant = "default">
                                        Visit
                                    </Button>
                                </Link>
                        </div>
                    </div>
                </ProjectCard>
            )
        ) 
    }, [projects])


    const compare = (item1, item2) => {
        if(item1.starred && !item2.starred) {
            return -1
        }

        return 0
    }

    useEffect(() => {
        projects.sort(compare)
    },[projects])


    
    
    return(
        <div className = "main">
            <div className = "project-div">
                {projectElems}
            </div>
            
            <Toaster richColors />

            {/* <DialogDemo /> */}
            
        </div>
    )
}