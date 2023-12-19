# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Set the command to start the app
CMD ["npm", "run","dev"]
