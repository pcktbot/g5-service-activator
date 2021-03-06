FROM node:12

ENV BROWSER_URL=activator.ml

RUN mkdir -p /usr/src/opex
WORKDIR /usr/src/opex

COPY . /usr/src/opex
RUN npm install
RUN npm run build

ENV PORT=8081
ENV HOST=0.0.0.0

EXPOSE ${PORT}

CMD [ "npm", "start" ]
