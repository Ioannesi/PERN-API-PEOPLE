import React from 'react';

import { FormProvider, useForm } from 'react-hook-form'
import  {Input}  from '../components/FormElements/Input';
import ErrorModal from './ErrorModal';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import {useHttpClient} from '../components/hooks/http-hook';

import {
  firstname_validation,
  lastname_validation,
  dateofbirth_validation,
} from '../components/util/inputValidation.js'
import { useState } from 'react'
import './EditForm.css'



const NewPerson = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const methods = useForm()
  const [success, setSuccess] = useState(false)

  const onSubmit = methods.handleSubmit(async data => {
    console.log(data)
   
    try {
        // Ορίστε τα δεδομένα που θέλετε να στείλετε
        const postData = {
          firstname: data.firstname,
          lastname: data.lastname,
          dateofbirth: data.dateofbirth
        }
  
        // Κάντε το αίτημα POST στον εξυπηρετητή
         await sendRequest("[PUTYOURIPV4HERE]:5000/people",
          'POST',
          JSON.stringify(postData),
          {
            'Content-Type': 'application/json'
          }
          );
          methods.reset()
          setSuccess(true)
        } catch (err) {}
      }
      );

  return (

    <React.Fragment><ErrorModal error={error} onClear={clearError} />
            <ErrorModal error={error} onClear={clearError} />

    {isLoading && (
    <div className="center">
      <LoadingSpinner />
    </div>
    
  )}
    <FormProvider {...methods}>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="edit-form" 
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input {...firstname_validation} />
          <Input {...lastname_validation} />
          <Input {...dateofbirth_validation} />
        </div>
        <div className="mt-5">
        {success && (
            <div className="alert alert-success">
            <strong>RECORD CREATION SUCCESSFUL</strong>
          </div>
          )}
          <button type="button" className="btn btn-primary"
            onClick={onSubmit}
          >
            Create Person
          </button>
        </div>
      </form>
    </FormProvider>
    </React.Fragment>

  )
}

export default NewPerson;