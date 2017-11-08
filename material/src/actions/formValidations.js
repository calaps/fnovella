// Rest of the forms validations
import Validator from "validator"; //for validate data
import isEmpty from "lodash/isEmpty";

//Messages
const required = "Este campo es requerido";
const isEmail = "El email no es válido";
const passwordMatch = "Las contraseñas no coinciden";
const invalidData = "Invalid data";

function isDate(date){
  try{
    new Date(date).toISOString();
    return true;
  }
  catch(error){
    return false;
  }
}

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
  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function programActivationValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.calPeriodsGrade)) {
    errors.calPeriodsGrade = required;
    if(!Validator.isEmpty(data.calPeriodsGrade) && !Validator.isAlphanumeric(data.calPeriodsGrade.toString())){
      errors.calPeriodsGrade = invalidData;
    }
  }
  if(Validator.isEmpty(data.calPeriodsWorkshop)) {
    errors.calPeriodsWorkshop = required;
    if(!Validator.isEmpty(data.calPeriodsWorkshop) && !Validator.isAlphanumeric(data.calPeriodsWorkshop.toString())){
      errors.calPeriodsWorkshop = invalidData;
    }
  }
  if(Validator.isEmpty(data.calPeriodsCourse)) {
    errors.calPeriodsCourse = required;
    if(!Validator.isEmpty(data.calPeriodsCourse) && !Validator.isAlphanumeric(data.calPeriodsCourse.toString())){
      errors.calPeriodsCourse = invalidData;
    }
  }
  if(Validator.isEmpty(data.evaluationStructure)) {
    errors.evaluationStructure = required;
    if(!Validator.isEmpty(data.evaluationStructure) && !Validator.isAlphanumeric(data.evaluationStructure.toString())){
      errors.evaluationStructure = invalidData;
    }
  }
  if(Validator.isEmpty(data.satisfactionStructure)) {
    errors.satisfactionStructure = required;
    if(!Validator.isEmpty(data.satisfactionStructure) && !Validator.isAlphanumeric(data.satisfactionStructure.toString())){
      errors.satisfactionStructure = invalidData;
    }
  }
  if(Validator.isEmpty(data.monitoringStructure)) {
    errors.monitoringStructure = required;
    if(!Validator.isEmpty(data.monitoringStructure) && !Validator.isAlphanumeric(data.monitoringStructure.toString())){
      errors.monitoringStructure = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function programValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.audience)) {
    errors.audience = required;
    if(!Validator.isEmpty(data.audience) && !Validator.isAlphanumeric(data.audience)){
      errors.audience = invalidData;
    }
  }
  if(Validator.isEmpty(data.clasification)) {
    errors.clasification = required;
    if(!Validator.isEmpty(data.clasification) && !Validator.isAlphanumeric(data.clasification)){
      errors.clasification = invalidData;
    }
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  // if(Validator.isEmpty(data.category)) {
  //   errors.category = required;
  //   if(!Validator.isEmpty(data.category) && !Validator.isAlphanumeric(data.category)){
  //     errors.category = invalidData;
  //   }
  // }
  if(Validator.isEmpty(data.genderAudience)) {
    errors.genderAudience = required;
    if(!Validator.isEmpty(data.genderAudience) && !Validator.isAlphanumeric(data.genderAudience)){
      errors.genderAudience = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function catalogsValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.category)) {
    errors.category = required;
    if(!Validator.isEmpty(data.category) && !Validator.isAlphanumeric(data.category)){
      errors.category = invalidData;
    }
  }
  if(Validator.isEmpty(data.type)) {
    errors.type = required;
    if(!Validator.isEmpty(data.type) && !Validator.isAlphanumeric(data.type)){
      errors.type = invalidData;
    }
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function courseValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  if(Validator.isEmpty(data.location)) {
    errors.location = required;
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.openCourse)) {
    errors.openCourse = required;
    if(!Validator.isEmpty(data.openCourse)){
      if(data.openCourse !== 'true' || 'false'){
        errors.openCourse = invalidData;
      }
    }
  }
  if(Validator.isEmpty(data.grade)) {
    errors.grade = required;
  }
  if(Validator.isEmpty(data.programId)) {
    errors.programId = required;
  }
  if(Validator.isEmpty(data.instructorId)) {
    errors.instructorId = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function gradeValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  if(Validator.isEmpty(data.location)) {
    errors.location = required;
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.level)) {
    errors.level = required;
    if(!Validator.isEmpty(data.level) && !Validator.isAlphanumeric(data.level)){
      errors.level = invalidData;
    }
  }
  if(Validator.isEmpty(data.programId)) {
    errors.programId = required;
  }
  if(Validator.isEmpty(data.instructorId)) {
    errors.instructorId = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function locationValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.address)) {
    errors.address = required;
    if(!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)){
      errors.address = invalidData;
    }
  }
  if(Validator.isEmpty(data.alias)) {
    errors.alias = required;
    if(!Validator.isEmpty(data.alias) && !Validator.isAlphanumeric(data.alias)){
      errors.alias = invalidData;
    }
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function privilegeValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.privilegeName)) {
    errors.privilegeName = required;
    if(!Validator.isEmpty(data.privilegeName) && !Validator.isAlphanumeric(data.privilegeName)){
      errors.privilegeName = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function studentValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.address)) {
    errors.address = required;
    if(!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)){
      errors.address = invalidData;
    }
  }
  // if(Validator.isEmpty(data.bornDate)) {
  //   errors.bornDate = required;
  //   if(!Validator.isEmpty(data.bornDate) && !isDate(data.bornDate)){
  //     errors.bornDate = invalidData;
  //   }
  // }
  if(Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if(!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)){
      errors.gender = invalidData;
    }
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = required;
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
      errors.email = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if(!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)){
      errors.firstName = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if(!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)){
      errors.firstLastname = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondName)) {
    errors.secondName = required;
    if(!Validator.isEmpty(data.secondName) && !Validator.isAlpha(data.secondName)){
      errors.secondName = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondLastname)) {
    errors.secondLastname = required;
    if(!Validator.isEmpty(data.secondLastname) && !Validator.isAlpha(data.secondLastname)){
      errors.secondLastname = invalidData;
    }
  }
  if(Validator.isEmpty(data.nacionality)) {
    errors.nacionality = required;
    if(!Validator.isEmpty(data.nacionality) && !Validator.isAlpha(data.nacionality)){
      errors.nacionality = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function studentContactValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.address)) {
    errors.address = required;
    if(!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)){
      errors.address = invalidData;
    }
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = required;
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
      errors.email = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if(!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)){
      errors.firstName = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if(!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)){
      errors.firstLastname = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondName)) {
    errors.secondName = required;
    if(!Validator.isEmpty(data.secondName) && !Validator.isAlpha(data.secondName)){
      errors.secondName = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondLastname)) {
    errors.secondLastname = required;
    if(!Validator.isEmpty(data.secondLastname) && !Validator.isAlpha(data.secondLastname)){
      errors.secondLastname = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function tutorValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.address)) {
    errors.address = required;
    if(!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)){
      errors.address = invalidData;
    }
  }
  // if(Validator.isEmpty(data.bornDate)) {
  //   errors.bornDate = required;
  // }
  if(Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if(!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)){
      errors.gender = invalidData;
    }
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = required;
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
      errors.email = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if(!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)){
      errors.firstName = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if(!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)){
      errors.firstLastname = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondName)) {
    errors.secondName = required;
    if(!Validator.isEmpty(data.secondName) && !Validator.isAlpha(data.secondName)){
      errors.secondName = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondLastname)) {
    errors.secondLastname = required;
    if(!Validator.isEmpty(data.secondLastname) && !Validator.isAlpha(data.secondLastname)){
      errors.secondLastname = invalidData;
    }
  }
  if(Validator.isEmpty(data.nacionality)) {
    errors.nacionality = required;
    if(!Validator.isEmpty(data.nacionality) && !Validator.isAlpha(data.nacionality)){
      errors.nacionality = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function userValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.address)) {
    errors.address = required;
    if(!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)){
      errors.address = invalidData;
    }
  }
  if(Validator.isEmpty(data.bornDate)) {
    errors.bornDate = required;
    if(!Validator.isEmpty(data.bornDate) && !isDate(data.bornDate)){
      errors.bornDate = invalidData;
    }
  }
  if(Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if(!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)){
      errors.gender = invalidData;
    }
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = required;
    if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
      errors.email = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if(!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)){
      errors.firstName = invalidData;
    }
  }
  if(Validator.isEmpty(data.firstLastName)) {
    errors.firstLastName = required;
    if(!Validator.isEmpty(data.firstLastName) && !Validator.isAlpha(data.firstLastName)){
      errors.firstLastName = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondName)) {
    errors.secondName = required;
    if(!Validator.isEmpty(data.secondName) && !Validator.isAlpha(data.secondName)){
      errors.secondName = invalidData;
    }
  }
  if(Validator.isEmpty(data.secondLastName)) {
    errors.secondLastName = required;
    if(!Validator.isEmpty(data.secondLastName) && !Validator.isAlpha(data.secondLastName)){
      errors.secondLastName = invalidData;
    }
  }
  if(Validator.isEmpty(data.nationality)) {
    errors.nationality = required;
    if(!Validator.isEmpty(data.nationality) && !Validator.isAlpha(data.nationality)){
      errors.nationality = invalidData;
    }
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = required;
  }
  if(Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = required;
  }
  if(!Validator.isEmpty(data.confirm_password) && !Validator.equals(data.password, data.confirm_password)){
    errors.confirm_password = passwordMatch;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function workshopValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  if(Validator.isEmpty(data.location)) {
    errors.location = required;
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.programId)) {
    errors.programId = required;
  }
  if(Validator.isEmpty(data.instructorId)) {
    errors.instructorId = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function categoriesValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function forgotPasswordValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.email)) {
    errors.email = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function divisionValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  if(Validator.isEmpty(data.location)) {
    errors.location = required;
  }
  if(Validator.isEmpty(data.description)) {
    errors.description = required;
    if(!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)){
      errors.description = invalidData;
    }
  }
  if(Validator.isEmpty(data.programId)) {
    errors.programId = required;
  }
  if(Validator.isEmpty(data.instructorId)) {
    errors.instructorId = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}

export function sectionsValidator(data){
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if(Validator.isEmpty(data.code)) {
    errors.code = required;
    if(!Validator.isEmpty(data.code) && !Validator.isAlphanumeric(data.code)){
      errors.code = invalidData;
    }
  }
  if(Validator.isEmpty(data.name)) {
    errors.name = required;
    if(!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)){
      errors.name = invalidData;
    }
  }
  if(Validator.isEmpty(data.jornada)) {
    errors.jornada = required;
    if(!Validator.isEmpty(data.jornada) && !Validator.isAlphanumeric(data.jornada)){
      errors.jornada = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {
    errors,
    isValid: isEmpty(errors)
  };

}
