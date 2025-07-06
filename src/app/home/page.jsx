import { ProjectCard } from "../ui/ProjectCard"
import Link from "next/link"
import { IconStarFilled, IconStar } from '@tabler/icons-react';
import styles from '../ui/css/projectCard.module.css'
import Button from "../ui/Button";
import { Toaster } from "sonner";

export default function Home({data}) {

    const projectElems = data.map((project, index) => 
    
        <ProjectCard key={project.id} id = {project.id}>   
            <div className = {`${styles.status} ${project.status === 'to-be-started' ? styles.toBeStarted : project.status === 'in-progress' ? styles.inProgress : styles.complete}`}></div>
            <div className = {styles.main}>
                <div className = {styles.title}>
                    <h1>{project.name}</h1>
                    {project.starred ? <IconStarFilled size={16} color="black"/> : <IconStar size={16} /> }
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
    
    
    return(
        <div className = "main">
            <div className = "project-div">
                {projectElems}
            </div>
            
            <Link href = {{ pathname: `/create` }}>
                <Button variant = "action">
                    Create
                </Button>
            </Link>

            <Toaster />
            
        </div>
    )
}