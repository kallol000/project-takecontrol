import express from "express"
import supabase from "./connection.js"

const tasksRouter = express.Router()


// fetch task details
tasksRouter.get('/:id', async ( req, res ) => {

  const { id } = req.params

  try {
    const {data, error} = await supabase
    .from("tasks")
    .select(`id, name, description, status, start_date, due_date, project_id`)
    .eq('id', id)
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    return err
  }
})

//create a new task
tasksRouter.post('/', async (req, res) => {
  const payload = req.body
  // console.log(data)
  try {
    const {data, error} = await supabase
    .from('tasks')
    .insert(payload)
    .select()
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
    
  } catch (error) {
    console.log(error)
  }
})


//update a task
tasksRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)

    if(error) return res.status(400).json({ error: error.message })
    res.json(data)
})

//delete a task
tasksRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select()

    if(error) return res.status(400).json({ error: error.message })
    res.json(data)
  
  } catch (error) {
    console.log(error)
  } 
})

export default tasksRouter