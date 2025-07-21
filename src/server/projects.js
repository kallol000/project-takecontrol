import express from 'express'
import supabase from './connection.js'
// import cors from 'cors'

const projectsRouter = express.Router()

projectsRouter.get('/', async (req, res) => {
try {
  const {data, error} = await supabase
    .from("projects")
    .select('*')

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch(error) {
    console.log(error)
  }
})

projectsRouter.get('/:id', async(req, res) => {
  
  const { id } = req.params
  
  try {
    const {data, error} = await supabase
    .from('projects')
    .select(`
      id, name, description, status, starred, start_date, due_date,
      tasks ( id, name, description, start_date, due_date, status)
      `)
    .eq('id', id)
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
    
  } catch (error) {
    console.log(error)
  }
})


//create a new project
projectsRouter.post('/', async (req, res) => {
  const payload = req.body
  
  try {
    const {data, error} = await supabase
    .from('projects')
    .insert(payload)
    .select()
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  
  } catch (error) {
    console.log(error)
  }
})


//update details of a project
projectsRouter.put('/:id', async (req, res) => {
  
  const { id } = req.params
  const payload = req.body
  const projectPayload = {...payload}
  delete projectPayload.tasks
  projectPayload.starred = !projectPayload.starred

  // console.log(projectPayload)
  
  try {
    const {data, error} = await supabase
    .from('projects')
    .update(projectPayload)
    .eq('id', id)
    .select()
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  
  } catch(error) {
    console.log(error)
  }
})

//delete a project
projectsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const { data, error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .select()

    if(error) return res.status(400).json({ error: error.message })
    res.json(data)
  
  } catch (error) {
    console.log(error)
  } 
})



export default projectsRouter

