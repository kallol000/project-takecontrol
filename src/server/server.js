
require('dotenv').config(); // Load environment variables
const express = require('express');
 const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// route to fetch all projects
app.get('/projects', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('projects') // Replace with your table name
        .select('*');
        
        if (error) {
            throw error;
        }
        
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// route to fetch specific project details with tasks associated
app.get('/projects/:id', async (req, res) => {

    const {id} = req.params

    // console.log(id)
    try {
        const { data, error } = await supabase
            .from('projects') 
            .select(`
                id, name, description, start_date, due_date, status, starred, 
                tasks (id, name, description, start_date, due_date, status)
            `)
            .eq('id', id)

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/create/project', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('projects') 
        .insert({name: 'Write a song'})
        .select()
        
        if (error) {
            throw error;
        }
        
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
   // Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});