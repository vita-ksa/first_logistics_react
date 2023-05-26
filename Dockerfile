 #Stage 1: Build React app
FROM node:14-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Stage 2: Serve React app using Nginx
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]