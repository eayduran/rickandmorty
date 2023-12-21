# Use Node.js
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code 
COPY . .

# Build the app
RUN npm run build

# Expose the port 
EXPOSE 3000

# Set the command to start the app in dev mode
CMD ["npm", "run","dev"]
