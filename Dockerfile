FROM node as build
RUN npm install -g typescript

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
# COPY entrypoint.sh entrypoint.sh

RUN npm install

COPY . .
RUN tsc -p .


FROM node as runner

WORKDIR /app
COPY --from=build app/ .

RUN chmod 755 entrypoint.sh
COPY entrypoint.sh /usr/local/bin/
# RUN npx prisma migrate dev
# CMD [ "/bin/ls", "-l" ]
# CMD ["npx","prisma","migrate","deploy"]
# ENTRYPOINT ["node","dist/index.js"]
ENTRYPOINT [ "entrypoint.sh" ]