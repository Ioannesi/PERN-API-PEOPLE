


export const firstname_validation = {
    name: 'firstname',
    label: 'firstname',
    type: 'text',
    id: 'firstname',
    placeholder: 'write your FirstName ...',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      maxLength: {
        value: 50,
        message: '50 characters max',
      }
    },
  }
  

  export const lastname_validation = {
    name: 'lastname',
    label: 'lastname',
    type: 'text',
    id: 'lastname',
    placeholder: 'write your Lastname ...',
    validation: {
      required: {
        value: true,
        message: 'required',
      },
      maxLength: {
        value: 50,
        message: '50 characters max',
      },
      capitalLetters:{
        value: /^[A-Z]+$/,
        message: 'Only capital letters allowed',
      },
      LatinLetters:{
        value: /^[A-Za-z]+$/,
        message: 'Only Latin letters allowed',
      }
    },
  }
  
  export const dateofbirth_validation = {
    name: 'dateofbirth',
    label: 'dateofbirth',
    type: 'date',
    id: 'dateofbirth',
    placeholder: 'fill a valid date of birth',
    validation: {
      required: {
        value: true,
        message: 'required',
      }
    }
    }

    