const {Router} = require('express')
const Todo = require('../models/todo')
const router = Router()

//получение списка задач
router.get('/',(req, res) => {
    res.json({a:1})
})

router.post('/', async (req, res) => {
    try{
        const todo = await Todo.create({
            title: req.body.title,
            done: false
        })
        res.status(201).json({todo})
    }catch (e){
        console.log(e)
        res.status(500).json({
            message:'Server error'
        })
    }
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = router