/**
 * Validate information on submit for Login
 * **/

import Validator from "validator"; //for validate data
import isEmpty from "lodash/isEmpty";

export default function validateinput(data){

  let errors = {}; //errors star with an empty object

  if(!Validator.isEmail(data.email)){ //Email validator
    errors.email = "El correo no es valido";
  }
  if(Validator.isEmpty(data.email)) { //Email empty validator
    errors.email = "El correo esta en blanco";
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = "La contraseña esta en blanco";
  }
  //IsValid is just a boolean who return is erros is empty
  return {
    errors,
    isValid: isEmpty(errors)
  }

}
