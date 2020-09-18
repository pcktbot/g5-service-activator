FROM node:latest

# ARG NPM_TOKEN

RUN mkdir -p /usr/src/opex
WORKDIR /usr/src/opex

ENV BROWSER_URL=activator.ml

COPY . /usr/src/opex
RUN npm install
RUN npm run build

ENV PORT=8081
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD [ "npm", "start" ]
