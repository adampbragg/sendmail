import dotenv from 'dotenv';
import { htmlToText } from 'html-to-text';
import sanitizeHtml from 'sanitize-html';
import isHTML from 'is-html';
import interpolate from 'string-template';

dotenv.config({ path: './.env.local' });
const mailServiceConfigurations = JSON.parse(process.env.MAIL_SERVICES);
let currentServiceIndex = parseInt(process.env.DEFAULT_MAIL_SERVICE_INDEX);
let currentMailServiceConfig = mailServiceConfigurations[currentServiceIndex];

const sendmail = async message => {
  let resp;
  try {
    resp = await postMail(message, currentMailServiceConfig);
  } catch (e) {
    if (e?.cause?.code === 'ECONNRESET' || e?.cause?.status === 401) {
      if (switchService()) {
        resp = sendmail(message, currentMailServiceConfig);
      } else {
        resp = {
          error: {
            message: 'All services failed. Please try again later.'
          }
        }
      }
    } else {
      resp = {
        error: {
          message: e.message || 'Unknown error.'
        }
      }
    }
  }
  // if it fails, rotate to the next service
  // when we hit the end of the services, return a fatal error message
  return resp;
}

const postMail = async (message, config) => {
  const { auth, parameters, contentType, endpoint } = config;
  const messageConstructed = constructMessage(message, parameters);
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
          throw new Error('No auth header method supplied.');
      }
      break;
    default:
      throw new Error('Unknown auth type supplied.');
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

  if (status === 401) {
    throw new Error('Unauthorized', { cause: { status, statusText } });
  } else if (status === 200) {
    resp.data = await mailResp.json();
  } else {
    resp.error = await mailResp.json();
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

export const constructMessage = (message, paramsTemplate) => {
  const constructed = {};
  const messageCopy = { ...message };
  messageCopy.text = cleanText(message.text);
  for (let key in paramsTemplate) {
    constructed[key] = interpolate(paramsTemplate[key], messageCopy);
  }
  return constructed;
}

const cleanText = text => {
  let cleanedText = text;
  if (isHTML(text)) {
    cleanedText = sanitizeHtml(cleanedText);
    cleanedText = htmlToText(cleanedText);
  }
  return cleanedText;
}

const getBasicAuth = (user, pass) => {
  const credentials = btoa(`${user}:${pass}`);
}

// Should be refactored to a utility.
const isTemplate = str => (/{(.*?)\}/g).test(str);

export default sendmail;