

import React, { useState , useEffect} from "react";
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../components/hooks/http-hook';


import 'font-awesome/css/font-awesome.min.css';
import ErrorModal from './ErrorModal';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { FormProvider, useForm } from 'react-hook-form'
import  {Input}  from '../components/FormElements/Input';
import {
  firstname_validation,
  lastname_validation,
  dateofbirth_validation,
} from '../components/util/inputValidation.js'

import moment from 'moment';
import './EditForm.css'





const EditPerson = () => {


  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const peopleId=useParams().peopleId;
  const methods = useForm()
  const [success, setSuccess] = useState(false)


  const [loadedPerson, setLoadedPerson] = useState();
  
    
   



      useEffect(() => {
        const fetchPerson = async () => {
          try {
            console.log(peopleId)
            const responseData = await sendRequest(
              `http://localhost:5000/people/${peopleId}`
            );
            setLoadedPerson(responseData);
           
    
          } catch (err) {}
        };
        fetchPerson();
      }, [sendRequest, peopleId]);
      


      const onSubmit = methods.handleSubmit(async data => {   

        try {
          const updateData = {
           firstname: data.firstname,
            lastname: data.lastname,
            dateofbirth: data.dateofbirth,
          }
          await sendRequest(
            `http://localhost:5000/people/${peopleId}`,
            'PUT',
            JSON.stringify(updateData),
            {
              'Content-Type': 'application/json'
            }
          );
          setLoadedPerson(updateData)
          setSuccess(true)
        } catch (err) {}
      }
      );
      if (isLoading) {
        return (
          <div className="center">
            <LoadingSpinner />
          </div>
        );
      }
    
      if (!loadedPerson && !error) {
        return (
          <div className="center">
            
              <h2>Could not find this Person.Propably Someone deleted it!</h2>
            
          </div>
        );
      }
     

  
     
   return (
    <React.Fragment>

<ErrorModal error={error} onClear={clearError} />
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
        
      )}


    <div className="container">
    
  
          
         
          
        <FormProvider {...methods}>
      <form 
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="edit-form" 
      >
        <h1>{`Edit Person with ID: ${peopleId}`}</h1>
        <Input {...firstname_validation} placeholder={loadedPerson.firstname}/>
          <Input {...lastname_validation} placeholder={loadedPerson.lastname}/>
          <Input {...dateofbirth_validation} label={`dateofbirth=${moment(loadedPerson.dateofbirth).format('DD-MM-YYYY')}`} />

        {isLoading && <div><LoadingSpinner /> </div> } 
       {success && (
            <div className="alert alert-success">
            <strong>Successful Modification</strong>
          </div>
          )}
          <div className="btn-group btn-group-lg">
          <div style={{ padding: '10px' }}>
        <button
          type="button" 
          className="btn btn-warning" 
          onClick={onSubmit}
          > 
          Edit
          </button>
         <Link to="/people" className="btn btn-secondary">Close</Link>
         </div>
         </div>
      
      </form>
    </FormProvider>
        </div>
   </React.Fragment>
   );
}


export default EditPerson;