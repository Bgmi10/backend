const express = require('express')
const router = express.Router()

const Todo = require('../Models/Todomodel') 


router.post('/addtodo' ,  async (req, res) =>{
    const {usermsg , todo_update_status} = req.body

    try{
        const newtodo = new Todo({
            usermsg,
            todo_update_status
        })
        await newtodo.save()
        res.status(200).send('todo added successfully')
    }
    catch{

        res.status(500).send('server error')
        
    }
})


router.get('/getalltodo' , async (req , res) =>{
  try{
    const todos = await Todo.find()
    res.status(200).json(todos)
  }
  catch{
    res.status(500).send('internal server err')
  }
})


router.delete(`/:id/deletetodo` , async(req , res ) =>{
     try{
        const deletetodo = await Todo.findByIdAndDelete( req.params.id)
        const updatedtodo = await Todo.find()
        res.status(200).json(updatedtodo)
     }
     catch{
        res.status(500).send('fail to delete the todo')
     }
})


router.put('/updatetodo/:id', async (req, res) => {
  const id = req.params.id;
  const { todo_update_status } = req.body;

  try {
    // Assuming `edit` contains the fields to update and their new values
    const updatedTodo = await Todo.findByIdAndUpdate(id, !todo_update_status);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router