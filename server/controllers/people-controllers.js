
const { Op } = require('sequelize');
const People  = require("./../models/people-model.js")

//const pool = require("./../db");
const { v4: uuidv4 } = require('uuid');
const {validationResult}=require('express-validator');
const HttpError = require('../models/http-error');

//get person by Id
const getPersonById = async (req, res, next)=> {

    const id=req.params.id
    let person;
        try {
          person = await People.findByPk(id)
          console.log("People retrieved successfully:", person);
        }catch (err){
          const error = new HttpError(
            'Something went wrong, could not find a person by Id.',
            500
          );
          return next(error);
        }
        if (!person) {
          const error = new HttpError(
            'Could not find a person for the provided id.',
            404
          );
          return next(error);
          }
    res.json(person);
        }
          
          
     
      
//get all people
const getAllPeople = async (req, res, next) => {

  let people;
        try {
          people = await People.findAll({attributes: ['id', 'firstname','lastname','dateofbirth']})
          console.log("People retrieved successfully:", people); // Προσθέστε αυτή τη γραμμή
        }catch (err){
          console.error("Error retrieving people:", err); // Προσθέστε αυτή τη γραμμή
          const error = new HttpError('Failed to retrieve data', 500);
          return next(error); 
        }
  if (!people || people.length ===0){
    return next(
      new HttpError('There are no People in Database',404)
    );
  }
  res.status(201).json(people);
}


const updatePersonById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data', 422);
  }
  
  const { id } = req.params;
  const { firstname, lastname, dateofbirth } = req.body;

  try {
    await People.update(
      { firstname, lastname, dateofbirth },
      { where: { id } }
    );
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update person.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Person updated successfully' });
}

   

  //delete a Person by Id
  const deletePersonById = async (req, res, next) => {
    
    const { id } = req.params;
    try {
      await People.destroy({
        where: { id }
      });
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete person.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: 'Person is deleted successfully' });
  }


  //create a person
  const createPerson = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      message:"Invalid Inputs "
      throw new HttpError('Invalid inputs passed', 422);
    }
  
    const newPerson = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dateofbirth: req.body.dateofbirth
    };
  
    try { 
      await People.create(newPerson);
      res.status(201).json({ message: 'New Person created', person: newPerson });
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not create a Person.',
        500
      );
      return next(error);
    }
  }
  
  
  const searchPeople = async (req, res, next) => {
    const search = req.body;
    console.log(req.body);
    try {
      const filteredPeople = await People.findAll({
        where: {
          [Op.and]: {
            id: search.id !== '' ? search.id : { [Op.ne]: null },
            firstname: search.firstname !== '' ? search.firstname : { [Op.ne]: null },
            lastname: search.lastname !== '' ? search.lastname : { [Op.ne]: null },
            dateofbirth: search.dateofbirth !== '' ? search.dateofbirth : { [Op.ne]: null },
          },
        },
      });
      
      res.json(filteredPeople);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not search for People.',
        500
      );
      return next(error);
    }
  };
  
  
      
   

exports.getPersonById = getPersonById;
exports.getAllPeople = getAllPeople;
exports.updatePersonById= updatePersonById;
exports.deletePersonById= deletePersonById;
exports.createPerson = createPerson; 
exports.searchPeople = searchPeople;