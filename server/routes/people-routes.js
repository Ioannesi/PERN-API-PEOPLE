const express = require('express');
const {check} = require ('express-validator')

const peopleControllers= require('../controllers/people-controllers');


const router = express.Router();


//search people
router.post('/search', peopleControllers.searchPeople);


//Create a Person
router.post('/', [check('lastname').not().isEmpty(), check('firstname').not().isEmpty()], peopleControllers.createPerson);


  // get all People with only the date part of dateofbirth
router.get('/', peopleControllers.getAllPeople);
  
  
  //get a person by id
router.get('/:id', peopleControllers.getPersonById);



  //update a person
router.put('/:id', [check('lastname').not().isEmpty(), check('firstname').not().isEmpty()], peopleControllers.updatePersonById);
  
  
  //delete a person by id
router.delete('/:id', peopleControllers.deletePersonById);
  

module.exports = router;