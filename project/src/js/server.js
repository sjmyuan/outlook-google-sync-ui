"use strict";

import path from 'path';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {render} from 'react-dom';
import {Router, Route, DefaultRoute, Redirect, NotFoundRoute, match, RouterContext} from 'react-router';
import routes from './routes';
import pkg from '../../package.json';
import configManager from './util/config-manager';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';

const app = express();

// compress all requests
app.use(compression());

app.use(cookieParser());

app.use(useragent.express());

//Static assets
app.use(`/email/assets`, function (req, res, next) {
  res.header("Cache-Control", "public, max-age=31536000");
  next();
});
app.use(`/email/assets`, express.static(path.join(__dirname, '/../../public/')));

//Access Logging
app.use(morgan('combined'));

const serverConfiguration = configManager.serverConfig;
const serverHost = serverConfiguration.appHost;

// Application Middleware
app.all('/*', (req, res) => {
  match({routes: routes, location: req.url}, async function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let resStatus = 200;
      if (renderProps.routes[renderProps.routes.length - 1].name === 'not-found') {
        resStatus = 404;
      }
      renderProps.params.configuration = serverConfiguration;
      fetchApiData(renderProps, appHost)
        .then(apiData => {
          apiData.status = resStatus;
          renderProps.params.apiData = apiData;
          const context = <RouterContext {...renderProps}/>;
          let html = serverSidePage(renderToString(context), serverConfiguration, apiData);
          res.status(resStatus).send(html);
        }).catch(err => {
          console.error(err);
          if(err.statusCode >= 400 && err.statusCode < 500) {
            renderProps.params.apiData = {status: 404};
          } else {
            renderProps.params.apiData = {status: 500};
          }
          const context = <RouterContext {...renderProps}/>;
          let html = serverSidePage(renderToString(context), serverConfiguration, renderProps.params.apiData);
          res.status(renderProps.params.apiData.status).send(html);
        });
    }
  });
});

//Startup Message
app.listen(configManager.serverConfig.listeningPort, configManager.serverConfig.listeningHost, () => {
  /* eslint-disable no-console */
  console.log(
    `${pkg.name} server listening on http://${configManager.serverConfig.listeningHost}:${configManager.serverConfig.listeningPort}`
  );
  /* eslint-enable no-console */
});
