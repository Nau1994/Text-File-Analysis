#!/bin/sh



npx prisma migrate deploy
npx prisma generate
node dist/index.js