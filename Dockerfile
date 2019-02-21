FROM node:chakracore

WORKDIR /usr/src/smart-brain-app-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]