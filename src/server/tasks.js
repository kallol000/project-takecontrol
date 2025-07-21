import express from "express"
import supabase from "./connection.js"

const tasksRouter = express.Router()

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