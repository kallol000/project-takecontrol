import express from 'express';
import {createClient} from '@supabase/supabase-js'
import cors from 'cors'
import 'dotenv/config';

const app = express();
const PORT = 3000;

// connecting to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json()); //to parse incoming reuests
app.use(cors()) //to use locally


// fetch all projects
app.get('/projects', async (req, res) => {
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

//fetch specific projects along with its tasks
app.get('/projects/:id', async(req, res) => {
  
  const { id } = req.params
  
  try {
    const {data, error} = await supabase
    .from('projects')
    .select(`
      id, name, description, starred, start_date, due_date,
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
app.post('/projects', async (req, res) => {
  const payload = req.body
  // console.log(data)
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

//delete a project
app.delete('/projects/:id', async (req, res) => {
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

//delete a task
app.delete('/projects/:id', async (req, res) => {
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