import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
import { createReadStream, createWriteStream } from 'fs';
const fetch = require('node-fetch');
const request = require('request');
const querystring = require('querystring');
const path = require('path');
const cors = require('cors');
const proxy = require('express-http-proxy');

function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initializeMiddleWares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`hub-api - ${process.env.PORT}`);
    });

    this.app.use('/api', proxy('https://api.github.com', {
      proxyReqPathResolver: function (req) {
        const parts = req.url.split('?');
        const queryString = parts[1];
        const updatedPath = parts[0].replace(/api/, '');
        return updatedPath + (queryString ? '?' + queryString : '');
      }
    }));
    this.app.use('/auth-api', proxy('https://github.com',{
      proxyReqPathResolver: function (req) {
        const parts = req.url.split('?');
        const queryString = parts[1];
        const updatedPath = parts[0].replace(/auth-api/, '');
        return updatedPath + (queryString ? '?' + queryString : '');
      }
    }));

    this.app.use(express.static(path.join(__dirname, '../../../dist/apps/hub')));
    this.app.use('/*', express.static(path.join(__dirname, '../../../dist/apps/hub/index.html')))
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleWares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
    this.app.use('/', morgan('dev'));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
