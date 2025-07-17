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



export default projectsRouter

