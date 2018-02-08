// Rest of the forms validations
import Validator from "validator"; //for validate data
import isEmpty from "lodash-es/isEmpty";

//Messages
const required = "Este campo es requerido";
const isEmail = "El email no es válido";
const passwordMatch = "Las contraseñas no coinciden";
const invalidData = "Invalid data";

function isDate(date) {
  try {
    new Date(date).toISOString();
    return true;
  } catch (error) {
    return false;
  }
}

export function emptyValidator(data) {

  let errors = {}; //errors star with an empty object

  //confirm password
  if (typeof data.confirm_password !== 'undefined') {
    if (!Validator.equals(data.password, data.confirm_password)) {
      errors.confirm_password = passwordMatch;
    }
  }

  for (var key in data) {
    if (data.hasOwnProperty(key)) {

      if (typeof data[key] === 'string') {
        //Verify if is empty
        if (Validator.isEmpty(data[key])) {
          errors[key] = required;
        }
        //verify if is email
        if (key == "email") {
          if (!Validator.isEmail(data[key])) {
            errors[key] = isEmail;
          }
        }

      }
    }
  }
  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function programActivationValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.temporality)) {
    errors.temporality = required;
    if (!Validator.isEmpty(data.temporality) && !Validator.isAlphanumeric(data.temporality)) {
      errors.temporality = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function programValidatorIndicator(data){
  let errors = {}; //errors star with an empty object
  if (Validator.isEmpty(data.programId)) {
    errors.programId = required;
    if (!Validator.isEmpty(data.programId) && !Validator.isAlphanumeric(data.programId)) {
      errors.programId = invalidData;
    }
  }
  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};
}
export function groupValidatorIndicator(data){
  let errors = {}; //errors star with an empty object
  if (Validator.isEmpty(data.groupId)) {
    errors.groupId = required;
    if (!Validator.isEmpty(data.groupId) && !Validator.isAlphanumeric(data.groupId)) {
      errors.groupId = invalidData;
    }
  }
  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};
}
export function programValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.audience)) {
    errors.audience = required;
    if (!Validator.isEmpty(data.audience) && !Validator.isAlphanumeric(data.audience)) {
      errors.audience = invalidData;
    }
  }
  if (Validator.isEmpty(data.clasification)) {
    errors.clasification = required;
    if (!Validator.isEmpty(data.clasification) && !Validator.isAlphanumeric(data.clasification)) {
      errors.clasification = invalidData;
    }
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = required;
    if (!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)) {
      errors.description = invalidData;
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.responsable.toString())) {
    errors.responsable = required;
    if (!Validator.isEmpty(data.responsable.toString()) && !Validator.isAlphanumeric(data.responsable.toString())) {
      errors.responsable = invalidData;
    }
  }
  if (Validator.isEmpty(data.monthsTotal.toString())) {
    errors.monthsTotal = required;
    if (!Validator.isEmpty(data.monthsTotal.toString()) && !Validator.isAlphanumeric(data.monthsTotal.toString())) {
      errors.monthsTotal = invalidData;
    }
  }
  if (Validator.isEmpty(data.evaluationType)) {
    errors.evaluationType = required;
    if (!Validator.isEmpty(data.evaluationType) && !Validator.isAlphanumeric(data.evaluationType)) {
      errors.evaluationType = invalidData;
    }
  }
  if (Validator.isEmpty(data.evaluationPeriod.toString())) {
    errors.evaluationPeriod = required;
    if (!Validator.isEmpty(data.evaluationPeriod.toString()) && !Validator.isAlphanumeric(data.evaluationPeriod.toString())) {
      errors.evaluationPeriod = invalidData;
    }
  }
  if (Validator.isEmpty(data.genderAudience)) {
    errors.genderAudience = required;
    if (!Validator.isEmpty(data.genderAudience) && !Validator.isAlphanumeric(data.genderAudience)) {
      errors.genderAudience = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function catalogsValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.category)) {
    errors.category = required;
    if (!Validator.isEmpty(data.category) && !Validator.isAlphanumeric(data.category)) {
      errors.category = invalidData;
    }
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = required;
    if (!Validator.isEmpty(data.type) && !Validator.isAlphanumeric(data.type)) {
      errors.type = invalidData;
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function courseValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.location.toString())) {
    errors.location = required;
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = required;
    if (!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)) {
      errors.description = invalidData;
    }
  }
  if (Validator.isEmpty(data.openCourse.toString())) {
    errors.openCourse = required;
    if (!Validator.isEmpty(data.openCourse.toString())) {
      if (data.openCourse.toString() !== 'true' || 'false') {
        errors.openCourse = invalidData;
      }
    }
  }
  if (Validator.isEmpty(data.programId.toString())) {
    errors.programId = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function gradeValidator(data) {
  console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = required;
    if (!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)) {
      errors.description = invalidData;
    }
  }
  if (Validator.isEmpty(data.level)) {
    errors.level = required;
    if (!Validator.isEmpty(data.level) && !Validator.isAlphanumeric(data.level)) {
      errors.level = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function locationValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.address)) {
    errors.address = required;
    if (!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)) {
      errors.address = invalidData;
    }
  }
  if (Validator.isEmpty(data.alias)) {
    errors.alias = required;
    if (!Validator.isEmpty(data.alias) && !Validator.isAlphanumeric(data.alias)) {
      errors.alias = invalidData;
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function privilegeValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.privilegeName)) {
    errors.privilegeName = required;
    if (!Validator.isEmpty(data.privilegeName) && !Validator.isAlphanumeric(data.privilegeName)) {
      errors.privilegeName = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function studentValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.documentType)) {
    errors.documentType = required;
    if (!Validator.isEmpty(data.documentType) && !Validator.isAlphanumeric(data.documentType)) {
      errors.documentType = invalidData;
    }
  }
  if (Validator.isEmpty(data.documentValue)) {
    errors.documentValue = required;
    if (!Validator.isEmpty(data.documentValue) && !Validator.isAlphanumeric(data.documentValue)) {
      errors.documentValue = invalidData;
    }
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = required;
    if (!Validator.isEmpty(data.department) && !Validator.isAlphanumeric(data.department)) {
      errors.department = invalidData;
    }
  }
  if (Validator.isEmpty(data.municipality)) {
    errors.municipality = required;
    if (!Validator.isEmpty(data.municipality) && !Validator.isAlphanumeric(data.municipality)) {
      errors.municipality = invalidData;
    }
  }
  if (Validator.isEmpty(data.community)) {
    errors.community = required;
    if (!Validator.isEmpty(data.community) && !Validator.isAlphanumeric(data.community)) {
      errors.community = invalidData;
    }
  }
  if (Validator.isEmpty(data.profession)) {
    errors.profession = required;
    if (!Validator.isEmpty(data.profession) && !Validator.isAlphanumeric(data.profession)) {
      errors.profession = invalidData;
    }
  }
  if (Validator.isEmpty(data.appCode)) {
    errors.appCode = required;
    if (!Validator.isEmpty(data.appCode) && !Validator.isAlphanumeric(data.appCode)) {
      errors.appCode = invalidData;
    }
  }
  if (Validator.isEmpty(data.colony)) {
    errors.colony = required;
    if (!Validator.isEmpty(data.colony) && !Validator.isAlphanumeric(data.colony)) {
      errors.colony = invalidData;
    }
  }
  if (Validator.isEmpty(data.zone)) {
    errors.zone = required;
    if (!Validator.isEmpty(data.zone) && !Validator.isAlphanumeric(data.zone)) {
      errors.zone = invalidData;
    }
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = required;
    if (!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)) {
      errors.address = invalidData;
    }
  }
  if (Validator.isEmpty(data.bornDate.toString())) {
    errors.bornDate = required;
    if (!Validator.isEmpty(data.bornDate) && !isDate(data.bornDate)) {
      errors.bornDate = invalidData;
    }
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if (!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)) {
      errors.gender = invalidData;
    }
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = required;
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
      errors.email = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if (!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)) {
      errors.firstName = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if (!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)) {
      errors.firstLastname = invalidData;
    }
  }
  if (Validator.isEmpty(data.nacionality)) {
    errors.nacionality = required;
    if (!Validator.isEmpty(data.nacionality) && !Validator.isAlpha(data.nacionality)) {
      errors.nacionality = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function studentContactValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.address)) {
    errors.address = required;
    if (!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)) {
      errors.address = invalidData;
    }
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = required;
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
      errors.email = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if (!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)) {
      errors.firstName = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if (!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)) {
      errors.firstLastname = invalidData;
    }
  }
  if (Validator.isEmpty(data.secondName)) {
    errors.secondName = required;
    if (!Validator.isEmpty(data.secondName) && !Validator.isAlpha(data.secondName)) {
      errors.secondName = invalidData;
    }
  }
  if (Validator.isEmpty(data.secondLastname)) {
    errors.secondLastname = required;
    if (!Validator.isEmpty(data.secondLastname) && !Validator.isAlpha(data.secondLastname)) {
      errors.secondLastname = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function tutorValidator(data) {
  // console.log(data);

  let errors = {}; // errors star with an empty object

  if (Validator.isEmpty(data.appCode)) {
    errors.appCode = required;
    if (!Validator.isEmpty(data.appCode) && !Validator.isAlphanumeric(data.appCode)) {
      errors.appCode = invalidData;
    }
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = required;
    if (!Validator.isEmpty(data.password) && !Validator.isAlphanumeric(data.password)) {
      errors.password = invalidData;
    }
  }
  if (Validator.isEmpty(data.colony)) {
    errors.colony = required;
    if (!Validator.isEmpty(data.colony) && !Validator.isAlphanumeric(data.colony)) {
      errors.colony = invalidData;
    }
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = required;
    if (!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)) {
      errors.address = invalidData;
    }
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = required;
    if (!Validator.isEmpty(data.department) && !Validator.isAlphanumeric(data.department)) {
      errors.department = invalidData;
    }
  }
  if (Validator.isEmpty(data.community)) {
    errors.community = required;
    if (!Validator.isEmpty(data.community) && !Validator.isAlphanumeric(data.community)) {
      errors.community = invalidData;
    }
  }
  if (Validator.isEmpty(data.profession)) {
    errors.profession = required;
    if (!Validator.isEmpty(data.profession) && !Validator.isAlphanumeric(data.profession)) {
      errors.profession = invalidData;
    }
  }
  if (Validator.isEmpty(data.municipality)) {
    errors.municipality = required;
    if (!Validator.isEmpty(data.municipality) && !Validator.isAlphanumeric(data.municipality)) {
      errors.municipality = invalidData;
    }
  }
  if (Validator.isEmpty(data.documentValue)) {
    errors.documentValue = required;
    if (!Validator.isEmpty(data.documentValue) && !Validator.isAlphanumeric(data.documentValue)) {
      errors.documentValue = invalidData;
    }
  }
  if (Validator.isEmpty(data.documentType)) {
    errors.documentType = required;
    if (!Validator.isEmpty(data.documentType) && !Validator.isAlphanumeric(data.documentType)) {
      errors.documentType = invalidData;
    }
  }
  if (Validator.isEmpty(data.privilege.toString())) {
    errors.privilege = required;
    if (!Validator.isEmpty(data.privilege.toString()) && !Validator.isAlphanumeric(data.privilege.toString())) {
      errors.privilege = invalidData;
    }
  }
  // if(Validator.isEmpty(data.bornDate)) {   errors.bornDate = required; }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if (!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)) {
      errors.gender = invalidData;
    }
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = required;
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
      errors.email = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if (!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)) {
      errors.firstName = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstLastname)) {
    errors.firstLastname = required;
    if (!Validator.isEmpty(data.firstLastname) && !Validator.isAlpha(data.firstLastname)) {
      errors.firstLastname = invalidData;
    }
  }
  if (Validator.isEmpty(data.nacionality)) {
    errors.nacionality = required;
    if (!Validator.isEmpty(data.nacionality) && !Validator.isAlpha(data.nacionality)) {
      errors.nacionality = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function userValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.cemproCode)) {
    errors.cemproCode = required;
    if (!Validator.isEmpty(data.cemproCode) && !Validator.isAlphanumeric(data.cemproCode)) {
      errors.cemproCode = invalidData;
    }
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = required;
    if (!Validator.isEmpty(data.address) && !Validator.isAlphanumeric(data.address)) {
      errors.address = invalidData;
    }
  }
  if (Validator.isEmpty(data.privilege.toString())) {
    errors.privilege = required;
    if (!Validator.isEmpty(data.privilege.toString()) && !Validator.isAlphanumeric(data.privilege.toString())) {
      errors.privilege = invalidData;
    }
  }
  if (Validator.isEmpty(data.profession)) {
    errors.profession = required;
    if (!Validator.isEmpty(data.profession) && !Validator.isAlphanumeric(data.profession)) {
      errors.profession = invalidData;
    }
  }
  if (Validator.isEmpty(data.documentType)) {
    errors.documentType = required;
    if (!Validator.isEmpty(data.documentType) && !Validator.isAlphanumeric(data.documentType)) {
      errors.documentType = invalidData;
    }
  }
  if (Validator.isEmpty(data.documentValue)) {
    errors.documentValue = required;
    if (!Validator.isEmpty(data.documentValue) && !Validator.isAlphanumeric(data.documentValue)) {
      errors.documentValue = invalidData;
    }
  }
  if (Validator.isEmpty(data.zone)) {
    errors.zone = required;
    if (!Validator.isEmpty(data.zone) && !Validator.isAlphanumeric(data.zone)) {
      errors.zone = invalidData;
    }
  }
  if (Validator.isEmpty(data.colony)) {
    errors.colony = required;
    if (!Validator.isEmpty(data.colony) && !Validator.isAlphanumeric(data.colony)) {
      errors.colony = invalidData;
    }
  }
  if (Validator.isEmpty(data.bornDate.toString())) {
    errors.bornDate = required;
    if (!Validator.isEmpty(data.bornDate) && !isDate(data.bornDate)) {
      errors.bornDate = invalidData;
    }
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = required;
    if (!Validator.isEmpty(data.gender) && !Validator.isAlphanumeric(data.gender)) {
      errors.gender = invalidData;
    }
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = required;
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
      errors.email = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = required;
    if (!Validator.isEmpty(data.firstName) && !Validator.isAlpha(data.firstName)) {
      errors.firstName = invalidData;
    }
  }
  if (Validator.isEmpty(data.firstLastName)) {
    errors.firstLastName = required;
    if (!Validator.isEmpty(data.firstLastName) && !Validator.isAlpha(data.firstLastName)) {
      errors.firstLastName = invalidData;
    }
  }
  if (Validator.isEmpty(data.nationality)) {
    errors.nationality = required;
    if (!Validator.isEmpty(data.nationality) && !Validator.isAlpha(data.nationality)) {
      errors.nationality = invalidData;
    }
  }
  if (Validator.isEmpty(data.municipality)) {
    errors.municipality = required;
    if (!Validator.isEmpty(data.municipality) && !Validator.isAlpha(data.municipality)) {
      errors.municipality = invalidData;
    }
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = required;
    if (!Validator.isEmpty(data.department) && !Validator.isAlpha(data.department)) {
      errors.department = invalidData;
    }
  }
  if (Validator.isEmpty(data.comunity)) {
    errors.comunity = required;
    if (!Validator.isEmpty(data.comunity) && !Validator.isAlpha(data.comunity)) {
      errors.comunity = invalidData;
    }
  }
  if (Validator.isEmpty(data.colony)) {
    errors.colony = required;
    if (!Validator.isEmpty(data.colony) && !Validator.isAlpha(data.colony)) {
      errors.colony = invalidData;
    }
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = required;
  }
  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function workshopValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = required;
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = required;
    if (!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)) {
      errors.description = invalidData;
    }
  }
  if (Validator.isEmpty(data.programId)) {
    errors.programId = required;
  }
  // if(Validator.isEmpty(data.instructorId)) {   errors.instructorId = required;
  // } IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function categoriesValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.description)) {
    errors.description = required;
    if (!Validator.isEmpty(data.description) && !Validator.isAlphanumeric(data.description)) {
      errors.description = invalidData;
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function forgotPasswordValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.email)) {
    errors.email = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function divisionValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.location.toString())) {
    errors.location = required;
  }
  if (Validator.isEmpty(data.programa.toString())) {
    errors.programa = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function sectionsValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.code)) {
    errors.code = required;
    if (!Validator.isEmpty(data.code) && !Validator.isAlphanumeric(data.code)) {
      errors.code = invalidData;
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = required;
    if (!Validator.isEmpty(data.name) && !Validator.isAlphanumeric(data.name)) {
      errors.name = invalidData;
    }
  }
  if (Validator.isEmpty(data.jornada)) {
    errors.jornada = required;
    if (!Validator.isEmpty(data.jornada) && !Validator.isAlphanumeric(data.jornada)) {
      errors.jornada = invalidData;
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function groupValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.instructor.toString())) {
    errors.instructor = required;
  }
  if (Validator.isEmpty(data.typeCategory)) {
    errors.typeCategory = required;
    if (!Validator.isEmpty(data.typeCategory) && !Validator.isAlphanumeric(data.typeCategory)) {
      errors.typeCategory = invalidData;
    }
  }
  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function ParticipantAdditionalFieldsValidator(data) {
  console.log(data);

  let errors = {}; //errors star with an empty object

  if (data.participantAditionalFieldsValues) {
    for (let additionalField of data.participantAditionalFieldsValues) {
      console.log("AAA", additionalField);
      if (Validator.isEmpty(additionalField.final_value)) {
        errors.additionalFields = required;
      }
    }
  }
  if (Validator.isEmpty(data.programId.toString())) {
    errors.programId = required;
  }
  if (Validator.isEmpty(data.calatog.toString())) {
    errors.calatog = required;
  }
  if (Validator.isEmpty(data.group.toString())) {
    errors.group = required;
  }
  if (Validator.isEmpty(data.period.toString())) {
    errors.period = required;
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function evaluationStructureValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.assistance.toString())) {
    errors.assistance = required;
  }
  if (Validator.isEmpty(data.approvalPercentage.toString())) {
    errors.approvalPercentage = required;
  }

  if(data.assistance === "true"){
    if (Validator.isEmpty(data.percentage.toString())) {
      errors.percentage = required;
    }
  }
  if (data.evaluateCategory.length === 0) {
    errors.evaluateCategory = "No has ingresado ninguna actividad para evaluar";
  }
  if (data.totaltotal !== 100) {
    errors.totalEvaluateCategory = "El total no es 100";
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function satisfactionStructureValidator(data) {
  // console.log(data);

  let errors = {}; //errors star with an empty object

  if (Validator.isEmpty(data.approvalPercentage.toString())) {
    errors.approvalPercentage = required;
  }
  if (Validator.isEmpty(data.maximumNote.toString())) {
    errors.maximumNote = required;
  }
  if (Validator.isEmpty(data.minimumNote.toString())) {
    errors.maximumNote = required;
  }
  if (data.evaluateCategory.length === 0) {
    errors.evaluateCategory = "Ingresa una categoria a evaluar";
  }
  if (data.totalEvaluateCategory !== 100) {
    errors.totalEvaluateCategory = "El total debe ser 100!";
  }
  if(!Validator.isEmpty(data.maximumNote.toString()) && !Validator.isEmpty(data.minimumNote.toString())){
    if(parseInt(data.maximumNote)<parseInt(data.minimumNote)){
      errors.minimumNote = "This should be less then Maximum Note!";
      errors.maximumNote = "This should be greater then Minimum Note!";
    }
  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};

}

export function evaluationActivityValidator(data) {
  // console.log(data);
  let errors = {};

  for(let act of data.evaluationActivityData){
    if(data.evaluationTypeId === 1){
      if(act.gradeFinal === 0){
        errors.evaluationActivityData = required;
      }
    }else{
      if(act.gradeFinal === 0 || act.gradeInitial === 0){
        errors.evaluationActivityData = required;
      }
    }

  }

  //IsValid is just a boolean who return is errors is empty
  return {errors, isValid: isEmpty(errors)};
}
