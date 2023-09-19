const validateEmail = email => (/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i).test(email);

const validateString = string => typeof string === 'string'

const validateRequired = (...validations) => {
  return function (val) {
    return val != undefined && validations.every(validation => validation(val));
  }
}

// const allowNull = (...validations) => {
//   return function (val) {
//     return val == undefined || validations.every(validation => validation(val));
//   }
// }

export { validateEmail, validateString, validateRequired/* , allowNull */ };