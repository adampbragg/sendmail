import { constructMessage } from "./utilities.js";

const handleSendmailError = (error, config) => {
  // Internally thrown node errors like no network
  // handle and assign a new message matching the error
  // Javascript errors like type or syntax errors.
  // catch and assign an internal error message
  // API return errors
  // catch and rewrite the message according to the vendor config


  // check if it is an error that qualifies for service switching
  // return service switch boolean and the error.

  const networkErrorCodes = ['ECONNRESET', 'ECONNREFUSED'];
  const errorTemplate = config.error;
  let errorResp = {};
  let switchService = false;

  if (networkErrorCodes.some(code => code === error?.cause?.code)) { // network error
    switchService = true;
    errorResp.code = error.cause.code;
    errorResp.message = 'Network Error';
  } else { // normalize error
    errorResp = { ...errorResp, ...constructMessage(error.cause, errorTemplate) };
  }

  return [switchService, errorResp];
}

export { handleSendmailError };

// try { throw new Error(`mail failure`, {cause:{status: 400, statusText: 'the status text'}}) } catch(e) { console.log(e, e.cause)}