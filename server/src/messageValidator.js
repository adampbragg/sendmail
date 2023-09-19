import { validateEmail, validateRequired, validateString } from "./validations.js"
export const validateMessage = message => {
  const fields = {
    to: validateRequired(validateString, validateEmail),
    to_name: validateRequired(validateString),
    from: validateRequired(validateString, validateEmail),
    from_name: validateRequired(validateString),
    subject: validateRequired(validateString),
    text: validateRequired(validateString)
  }

  let valid = true;
  const fieldNames = Object.keys(fields);
  let fieldName;
  let fieldVal;
  let i = fieldNames.length;
  for (; i-- && valid;) {
    fieldName = fieldNames[i];
    fieldVal = message[fieldName];
    valid = fields[fieldName](fieldVal);
  }
  return valid;
}