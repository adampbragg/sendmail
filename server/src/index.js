import Koa from 'koa';
import cors from '@koa/cors';
import { bodyParser } from '@koa/bodyparser';
import { validateMessage } from './messageValidator.js';
import sendmail from './sendmail.js';

const app = new Koa();
var corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'],
  allowHeaders: '*'
}
app.use(cors(corsOptions));
app.use(bodyParser());
// Check fields
app.use(async (ctx, next) => {
  const validMessage = validateMessage(ctx.request.body);
  ctx.assert.equal(validMessage, true, 400, JSON.stringify({ error: 'Message format or field is invalid', message: ctx.request.body }));
  await next();
})
app.use(async (ctx) => {
  const mailResp = await sendmail(ctx.request.body);
  ctx.body = mailResp;
})

app.listen(3001);