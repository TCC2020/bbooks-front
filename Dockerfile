FROM node:latest as bbooksAngular
WORKDIR /bbooksAngular
COPY package.json /bbooksAngular
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=bbooksAngular bbooksAngular/dist/bbooks /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

#docker build -t bbooks-angular .
#docker run run -p 3000:80 bbooks-angular