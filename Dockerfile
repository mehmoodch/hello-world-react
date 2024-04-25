# FROM node:14

FROM099199746132.dkr.ecr.eu-west-1.amazonaws.com/node-image-for-dockerfile:latest

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
