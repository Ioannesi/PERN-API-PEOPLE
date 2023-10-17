import moment from 'moment';


const VALIDATOR_TYPE_LATIN="LATIN";

const VALIDATOR_TYPE_ALL_CAPITAL = 'ALL_CAPITAL';
const VALIDATOR_TYPE_DATE_BEFORE_TODAY = 'DATE_BEFORE_TODAY';



export const VALIDATOR_LATIN = () => ({ 
  type: VALIDATOR_TYPE_LATIN ,
  message: 'Please use only latin letters',
});
export const VALIDATOR_ALL_CAPITAL = () => ({ type: VALIDATOR_TYPE_ALL_CAPITAL });
export const VALIDATOR_DATE_BEFORE_TODAY = () => ({ type: VALIDATOR_TYPE_DATE_BEFORE_TODAY });




export const validateAllCapital = value => {
  // Αφαιρέστε όλα τα κενά και κάντε όλα τα γράμματα κεφαλαία
  //value = value.replace(/\s/g, '').toUpperCase();
  return /^[A-Z]+$/.test(value); // Έλεγχος για όλα τα κεφαλαία γράμματα
}



export const validateDateBeforeToday = value => {
  const today = moment();
  return moment(value).isBefore(today);
};


  export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {

     
      if (validator.type === VALIDATOR_TYPE_LATIN) {
        isValid = isValid && /^[A-Za-z]+$/.test(value); // Έλεγχος για λατινικούς χαρακτήρες
      }
    
      if (validator.type === VALIDATOR_TYPE_ALL_CAPITAL) {
        isValid = isValid && validateAllCapital(value);
      }
      
    if (validator.type === VALIDATOR_TYPE_DATE_BEFORE_TODAY) {
      isValid = isValid && validateDateBeforeToday(value);
    }
      
    }
    return isValid;
  };
