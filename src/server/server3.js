// import { projectData } from './data'

const express = require('express')
const pool = require('./db') 
// var mysql      = require('mysql');
const app = express()
const cors = require("cors")
const port = 3000
require('dotenv').config();

app.use(cors())
app.use(express.json())


// console.log(host, user)

// app.get('/projects', async (req, res) => {
//     res.json(data)
// })

// app.get('/projects/:projectId', async (req, res) => {
//     let params = req.params
//     const result = data.projectData.filter(elem => elem.id === params.projectId)
//     res.json(result)
// })

// // console.log(data)

// app.put('/project/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const payload = req.body
//         data.projectData = data.projectData.filter(project => project.id !== id)
//         data.projectData.push(payload)
//         console.log(data.projectData)
//         res.json(data.projectData)
//     } catch (err) {
//         res.send(err)
//     }
// })


app.get('/projects', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching projects');
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})