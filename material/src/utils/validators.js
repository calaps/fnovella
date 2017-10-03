/* Put all the validations here */

import Validator from "validator"; //for validate data
import isEmpty from "lodash/isEmpty";

function isDate(date){
  try{
    new Date(date).toISOString();
    return true;
  }
  catch(error){
   return false;
  }
}

// EXAMPLES

/* Login */
export function validateLoginForm(data){
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

/* Create User */
export function validateCreateUserForm(data){
  let errors = {}; //errors star with an empty object

  if(data.firstName && !Validator.isAlpha(data.firstName)){
    errors.firstName = "El correo no es valido";
  }
  if(data.address && !Validator.isAlphanumeric(data.address.toString())){
    errors.address = "Invalid data";
  }
  if(data.appCode && !Validator.isAlphanumeric(data.appCode.toString())){
    errors.appCode = "Invalid data";
  }
  if(data.cellphone && !Validator.isNumeric(data.cellphone)){
    errors.cellphone = "Invalid data";
  }
  if(data.bornDate && !isDate(data.bornDate)){
    errors.bornDate = "Invalid data";
  }
  if(data.cemproCode && !Validator.isAlphanumeric(data.cemproCode)){
    errors.cemproCode = "Invalid data";
  }
  if(data.comunity && !Validator.isAlphanumeric(data.comunity)){
    errors.comunity = "Invalid data";
  }
  if(data.department && !Validator.isAlphanumeric(data.department)){
    errors.department = "Invalid data";
  }
  if(data.documentType && !Validator.isAlphanumeric(data.documentType)){
    errors.documentType = "Invalid data";
  }
  if(data.documentValue && !Validator.isAlphanumeric(data.documentValue)){
    errors.documentValue = "Invalid data";
  }
  if(data.email && !Validator.isEmail(data.email)){
    errors.email = "Invalid data";
  }
  if(data.firstLastName && !Validator.isAlphanumeric(data.firstLastName)){
    errors.firstLastName = "Invalid data";
  }
  if(data.firstName && !Validator.isAlphanumeric(data.firstName)){
    errors.firstName = "Invalid data";
  }
  if(data.gender && !Validator.isAlphanumeric(data.gender)){
    errors.gender = "Invalid data";
  }
  if(data.municipality && !Validator.isAlphanumeric(data.municipality)){
    errors.municipality = "Invalid data";
  }
  if(data.nationality && !Validator.isAlpha(data.nationality)){
    errors.nationality = "Invalid data";
  }
  if(data.password && !Validator.isAlphanumeric(data.password)){
    errors.password = "Invalid data";
  }
  if(data.phon && !Validator.isNumeric(data.phon)){
    errors.phon = "Invalid data";
  }
  if(data.privilege && !Validator.isNumeric(data.privilege)){
    errors.privilege = "Invalid data";
  }
  if(data.profession && !Validator.isAlphanumeric(data.profession)){
    errors.profession = "Invalid data";
  }
  if(data.secondLastName && !Validator.isAlphanumeric(data.secondLastName)){
    errors.secondLastName = "Invalid data";
  }
  if(data.secondName && !Validator.isAlphanumeric(data.secondName)){
    errors.secondName = "Invalid data";
  }
  if(data.updateFields && !Validator.isJSON(data.updateFields)){
    errors.updateFields = "Invalid data";
  }

  //IsValid is just a boolean who return is erros is empty
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
