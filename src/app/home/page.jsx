import { ProjectCard } from "../ui/ProjectCard"
import Link from "next/link"

export default function Home({data}) {

    const projectElems = data.map((project, index) => 
        <Link
            key={index}
            href = {
                {
                    pathname: `/home/${project.id}`
                }
            }
        >
            <ProjectCard key={index} id = {project.id}>{project.name}
            </ProjectCard>
        </Link>
    )
    
    
    return(
        <div style = {{paddingTop: "100px"}}>
            <h5>Create a new project</h5>
            <div style={{display: "flex", gap: "20px", justifyContent: "flex-start"}}>
                {projectElems}
            </div>
        </div>
    )
}