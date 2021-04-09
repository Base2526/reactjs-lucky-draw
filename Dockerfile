# # base image
# FROM node:9.11

# # set working directory
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app

# COPY . .

# # add `/usr/src/app/node_modules/.bin` to $PATH
# # ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # install and cache app dependencies
# COPY package.json /usr/src/app/package.json
# RUN npm install
# # RUN npm install react-scripts -g

# # start app
# CMD ["npm", "start"]

# pull official base image
FROM node

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

RUN npm install --silent

# start app
CMD ["npm", "start"]

# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
