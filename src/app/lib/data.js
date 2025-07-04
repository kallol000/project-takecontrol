import axios from "axios"

export const buckets = [
    "to-be-started",
    "in-progress",
    "completed"
]


export async function fetchProjects(){
    try {
        const res = await fetch("http://localhost:3000/projects/")
        const data = await res.json()
        // console.log(data.projectData)
        return data
    } catch(error) {
        console.log(error)
    }
}


export async function fetchProjectDetails(projectId) {
    try {
        const res = await fetch(`http://localhost:3000/projects/${projectId}`)
        const data = await res.json()
        return data        
    } catch(error) {
        console.log(error)
    }
}

export async function updateProjectDetails(projectId, payload) {
    try {
        const res = await axios.put(`http://localhost:3000/project/${projectId}`, payload)
        // console.log(res)
        const data = await res.json()
        console.log(data)
    } catch(err) {
        console.log(err)
    }
}

// module.exports(projectData)


