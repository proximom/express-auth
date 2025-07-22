# Use official Node.js image as base
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port (make sure it matches your Express port)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
