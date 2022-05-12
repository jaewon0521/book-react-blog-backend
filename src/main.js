require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api/index';
import jwtMiddleware from './lib/jwtMiddleware';
import createFakeData from './createFakeData';

const app = new Koa();
const router = new Router();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MonggoDB');
  })
  .catch(e => {
    console.error(e);
  });



// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

//app 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listing to port 4000');
});