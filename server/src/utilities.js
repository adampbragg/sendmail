import { htmlToText } from 'html-to-text';
import sanitizeHtml from 'sanitize-html';
import isHTML from 'is-html';
import interpolate from 'string-template';

export const constructMessage = (message, template) => {
  const constructed = {};
  for (let key in template) {
    constructed[key] = interpolate(template[key], message);
  }
  return constructed;
}

export const getBasicAuth = (user, pass) => {
  const credentials = btoa(`${user}:${pass}`);
}

export const cleanText = text => {
  let cleanedText = text;
  if (isHTML(text)) {
    cleanedText = sanitizeHtml(cleanedText);
    cleanedText = htmlToText(cleanedText);
  }
  return cleanedText;
}

export const isTemplate = str => (/{(.*?)\}/g).test(str);