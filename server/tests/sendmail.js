import test from "ava";
import { valid as validMessage } from "./_mocks/messages.js";
import esmock from "esmock";
import { constructMessage } from "../src/sendmail.js";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });
const mailServiceConfigurations = JSON.parse(process.env.MAIL_SERVICES);
const defaultMailServiceConfig = mailServiceConfigurations[process.env.DEFAULT_MAIL_SERVICE_INDEX];

const sendmailPath = '../src/sendmail.js';
test('sendmail happy path', async t => {
  const mockConfig = {
    import: {
      fetch: async () => {
        const respPromise = new Promise((resolve, reject) => {
          const resolver = () => {
            resolve({ status: 200, json: async () => ({ success: true }) });
          }
          setTimeout(resolver, 200);
        });
        return respPromise;
      }
    }
  };
  const mockSendMail = await esmock(sendmailPath, mockConfig);
  const mailResp = await mockSendMail(validMessage);
  t.is(mailResp.status, 200);
});

test('sendmail remote 400 error', async t => {
  const mockConfig = {
    import: {
      fetch: async () => {
        const respPromise = new Promise((resolve, reject) => {
          const resolver = () => {
            resolve({ status: 400, json: async () => ({ success: false }) });
          }
          setTimeout(resolver, 200);
        });
        return respPromise;
      }
    }
  };
  const mockSendMail = await esmock(sendmailPath, mockConfig);
  const mailResp = await mockSendMail(validMessage);
  t.is(!!mailResp.error, true);
});

test('construct message', t => {
  const sampleMessage = {
    to: 'outbound@outbound.com',
    to_name: 'Outbound Name',
    from: 'sender@sender.com',
    from_name: 'Sender Name',
    subject: 'Test',
    text: '<div>Living in the new world<div>with an old soul</div></div>'
  }
  const constructed = constructMessage(sampleMessage, defaultMailServiceConfig.parameters);
  t.is(constructed.subject, 'Test');
})
