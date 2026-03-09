# Étape 1 : Build Angular
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2 : Nginx pour servir Angular
#FROM nginx:alpine
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/dist/vasko-site/browser /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]