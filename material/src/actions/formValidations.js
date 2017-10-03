// Rest of the forms validations
import Validator from "validator"; //for validate data
import isEmpty from "lodash/isEmpty";

//Messages
const required = "Este campo es requerido";
const isEmail = "El email no es válido";
const passwordMatch = "Las contraseñas no coinciden";

export function emptyValidator(data){

  let errors = {}; //errors star with an empty object

  //confirm password
  if(typeof data.confirm_password !== 'undefined'){
    if(!Validator.equals(data.password, data.confirm_password)){
      errors.confirm_password = passwordMatch;
    }
  }

  for (var key in data) {
    if (data.hasOwnProperty(key)) {

        if(typeof data[key] === 'string'){
          //Verify if is empty
          if(Validator.isEmpty(data[key])){
            errors[key] = required;
          }
          //verify if is email
          if(key == "email"){
            if(!Validator.isEmail(data[key])){
              errors[key] = isEmail;
            }
          }

        }
    }
  }
  //IsValid is just a boolean who return is erros is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}
