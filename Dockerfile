
# FROM node:14

FROM 099199746132.dkr.ecr.us-east-1.amazonaws.com/node-image-for-dockerfile:latest

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# FROM nginx:alpine

FROM 099199746132.dkr.ecr.us-east-1.amazonaws.com/nginx-image-for-dockerfile:latest

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
