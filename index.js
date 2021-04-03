const express = require('express')
const app = express()
const PORT = process.env.Port || 3000
const path = require('path')
const todoRoutes = require('./routes/todo')
const sequelize = require('./utils/database')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use('/api/todo', todoRoutes)

app.use((req, res, next) => {
    res.sendFile('/index.html')
})

async function start(){
    try{
        await sequelize.sync()
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }
}

start()
