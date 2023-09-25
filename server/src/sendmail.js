import dotenv from 'dotenv';
import interpolate from 'string-template';
import { handleSendmailError } from './errors.js';
import { constructMessage, cleanText, isTemplate, getBasicAuth } from './utilities.js';

dotenv.config({ path: './.env.local' });
const mailServiceConfigurations = JSON.parse(process.env.MAIL_SERVICES);
let currentServiceIndex = parseInt(process.env.DEFAULT_MAIL_SERVICE_INDEX);
let currentMailServiceConfig = mailServiceConfigurations[currentServiceIndex];

const sendmail = async message => {
  let resp;
  try {
    resp = await postMail(message, currentMailServiceConfig);
  } catch (e) {
    const [switchServiceCheck, errorResp] = handleSendmailError(e, currentMailServiceConfig);
    if (switchServiceCheck && switchService()) {
      resp = sendmail(message, currentMailServiceConfig);
    } else if (switchServiceCheck) {
      resp = {
        error: {
          message: 'All services failed. Please try again later.'
        }
      }
    } else {
      resp = { error: errorResp };
    }
  }
  return resp;
}

const postMail = async (message, config) => {
  const { auth, parameters, contentType, endpoint } = config;
  const messageCopy = { ...message };
  messageCopy.text = cleanText(messageCopy.text);
  const messageConstructed = constructMessage(messageCopy, parameters);
  const messageToAttach = contentType === 'application/x-www-form-urlencoded'
    ? new URLSearchParams(messageConstructed).toString()
    : JSON.stringify(messageConstructed);
  const headers = {
    'Content-Type': contentType
  };

  switch (auth.type) {
    case 'header':
      switch (auth.method) {
        case 'basic':
          headers[auth.name] = `Basic ${getBasicAuth(auth.username, interpolate(auth.password, config))}`;
          break;
        case 'custom':
          headers[auth.name] = isTemplate(auth.value) ? interpolate(auth.value, config) : auth.value;
          break;
        default:
          throw new Error('No auth header method supplied.', { cause: { status: 400 } });
      }
      break;
    default:
      throw new Error('Unknown auth type supplied.', { cause: { status: 400 } });
  }

  const fetchConfig = {
    method: "POST",
    headers,
    body: messageToAttach
  }

  const mailResp = await fetch(endpoint, fetchConfig);
  const { status, statusText } = mailResp;
  const resp = {
    status,
    statusText
  }

  if (status >= 400) {
    throw new Error(`${config.name} post mail error`, { cause: resp });
  } else {
    resp.data = await mailResp.json();
  }
  return resp;
}

const switchService = () => {
  let serviceSwitchSuccess = true;
  if (currentServiceIndex + 1 < mailServiceConfigurations.length) {
    currentServiceIndex += 1;
    currentMailServiceConfig = mailServiceConfigurations[currentServiceIndex];
  } else {
    serviceSwitchSuccess = false;
  }
  return serviceSwitchSuccess;
}

export default sendmail;