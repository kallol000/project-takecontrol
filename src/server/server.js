import express from 'express';

import cors from 'cors'
import supabase from './connection.js';
import projectsRouter from './projects.js';

const app = express();
const PORT = 3000;

const projects = projectsRouter

app.use(express.json()); //to parse incoming reuests
app.use(cors()) //to use locally

app.use('/projects', projects)



//create a new task
app.post('/tasks', async (req, res) => {
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


//update details of a task
app.put('/tasks/:id', async (req, res) => {
  
  const { id } = req.params
  const payload = req.body
  
  try {
    const {data, error} = await supabase
    .from('tasks')
    .update(payload)
    .eq('id', id)
    .select()
    
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  
  } catch(error) {
    console.log(error)
  }
})



//delete a task
app.delete('/tasks/:id', async (req, res) => {
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
// Start the server
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });