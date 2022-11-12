FROM node:18-alpine3.15
RUN apk update && apk add python3 alpine-sdk && apk add g++ make zsh curl

RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN mkdir /app

WORKDIR /app

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT ./entry-point.sh
