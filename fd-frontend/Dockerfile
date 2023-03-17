# Node.js base image
FROM node:18-alpine

# Establish working directory
WORKDIR /app

# Copy necessary files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Compile the application for production
RUN npm run build

# Exposing the port
EXPOSE 3000

# Define environment variable for port
ENV PORT=3000

# Running the application
CMD ["npm", "start"]