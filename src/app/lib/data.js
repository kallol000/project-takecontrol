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

// Create

export async function createProject(payload) {
    try {
        const res = await axios.post(`http://localhost:3000/projects`, payload)
        return res
    } catch(err) {
        console.log(err)
    }
}

export async function createTask(payload) {
    try {
        const res = await axios.post(`http://localhost:3000/tasks`, payload)
        console.log(res)
        // console.log(res)
        const data = await res.json()
        return data
        // console.log(data)
    } catch(err) {
        console.log(err)
    }
}


// Update
export async function updateProjectDetails( id, payload ) {
    try {
        const res = await axios.put(`http://localhost:3000/projects/${id}`, payload)
        // const data = await  res.json()
        // return res
        console.log(res)
    } catch ( err ) {
        console.log(err)
    }
}



// Delete

export async function deleteProject( id ) {
    try {
        const res = await axios.delete(`http://localhost:3000/projects/${id}`)
        // const data = await res.json()
        return res
    } catch ( err ) {
        console.log(err)
    }
}
// module.exports(projectData)


