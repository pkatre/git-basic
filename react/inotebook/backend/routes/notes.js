const express = require('express');

const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the notes using: GET"/api/notes/getuser".
router.get('/fetchallnotes',fetchuser, async(req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
    res.json(notes);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
    
})

//ROUTE 2: Add a new note using POST "/api/notes/addnote".Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 character').isLength({min: 5}),
], async(req, res)=>{
    try{
        const {title, description, tag} = req.body;

        //If there are error, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Note({
          title, description, tag, user:req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    }
   catch(error){
     console.error(error.message);
     res.status(500).send("Internal server error")
   }
})

//ROUTE 3: update a new note using PUT:"/api/notes/addnote".Login required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body;

    //create a newnote object
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    //find the note to be updated and update it
    let note= await Note.findById(req.params.id);
    if(!note){ return res.status(404).send("Note found")}

    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not allowed");
    }
        
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
    res.json({note});
     
})

module.exports = router