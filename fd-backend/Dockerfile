# Node.js base image
FROM node:18-alpine

# Establish working directory
WORKDIR /app

# Copy necessary files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Build
RUN npm run build

# Running the application
CMD ["npm", "run", "start:prod"]