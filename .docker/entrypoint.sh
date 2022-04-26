#!/bin/bash

npm install
npm run build
npx typeprm migration:run
npm run start:dev