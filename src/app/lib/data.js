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


export async function fetchProjectDetails( projectId ) {
    try {
        const res = await fetch(`http://localhost:3000/projects/${projectId}`)
        const data = await res.json()
        return data      
    } catch(error) {
        console.log(error)
    }
}

export async function fetchTaskDetails( taskId ) {
    try {
        const res = await fetch(`http://localhost:3000/tasks/${taskId}`)
        const data = await res.json()
        return data      
    } catch( err ) {
        return err
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
        return res
    } catch(err) {
        return err
    }
}

// Update APIs

export async function updateProjectDetails( id, payload ) {
    try {
        const res = await axios.put(`http://localhost:3000/projects/${id}`, payload)
        return res
    } catch ( err ) {
        return err
    }
}

export async function updateFavourite( id, payload ) {
    try {
        const res = await axios.put( `http://localhost:3000/projects/favourite/${id}`, payload )
        return res
    } catch ( error ) {
        return error
    }
}

export async function updateTaskDetails( id, payload ) {
    try {
        const res = await axios.put( `http://localhost:3000/tasks/${id}`, payload )
        return res
    } catch ( error ) {
        return error
    }
}

// Delete APIs
export async function deleteProject( id ) {
    try {
        const res = await axios.delete(`http://localhost:3000/projects/${id}`)
        return res
    } catch ( err ) {
        console.log(err)
    }
}

export async function deleteTask( id ) {
    try {
        const res = await axios.delete(`http://localhost:3000/tasks/${id}`)
        return res
    } catch ( err ) {
        return err
    }
}



// Delete

// export async function deleteProject( id ) {
//     try {
//         const res = await axios.delete(`http://localhost:3000/projects/${id}`)
//         // const data = await res.json()
//         return res
//     } catch ( err ) {
//         console.log(err)
//     }
// }
// // module.exports(projectData)


