const path = require('path');
const express = require('express');
const helmet = require('helmet');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('../i18n');
const configService = require('./config_service');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  try {
    await configService.init();
  } catch (error) {
    console.log('Config service init error: ', error); // eslint-disable-line no-console
  }

  await app.prepare();
  const server = express();
  server.use(helmet());

  // Put markets, assets information in res object, so that it can be read in next app.
  server.use((req, res, _next) => {
    _next();
  });

  // next-i18n middleware
  server.use(nextI18NextMiddleware(nextI18next));

  // Static routing for manifest files.
  server.get('/service-worker.js', (req, res) => res.sendFile(path.resolve(`${__dirname}/../build/service-worker.js`)));
  server.get('/build-manifest.json', (req, res) => res.sendFile(path.resolve(`${__dirname}/../build/build-manifest.json`)));
  server.get('/prerender-manifest.json', (req, res) => res.sendFile(path.resolve(`${__dirname}/../build/prerender-manifest.json`)));
  server.get('/react-loadable-manifest.json', (req, res) => res.sendFile(path.resolve(`${__dirname}/../build/react-loadable-manifest.json`)));
  server.get('/routes-manifest.json', (req, res) => res.sendFile(path.resolve(`${__dirname}/../build/routes-manifest.json`)));

  server.get('*', (req, res) => {
    handle(req, res);
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
