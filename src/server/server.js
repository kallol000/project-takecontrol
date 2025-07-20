import express from 'express';

import cors from 'cors'
import supabase from './connection.js';
import router from './projects.js';
import projectsRouter from './projects.js';
import tasksRouter from './tasks.js';

const app = express();
const PORT = 3000;

const projects = projectsRouter
const tasks = tasksRouter


app.use(express.json()); //to parse incoming reuests
app.use(cors()) //to use locally

app.use('/projects', projects)
app.use('/tasks', tasks)







//update details of a project
app.put('/projects/:id', async (req, res) => {
  
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



// Start the server
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });