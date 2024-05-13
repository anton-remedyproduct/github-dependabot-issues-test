# Use a lightweight Node.js image as base
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Build the Preact project
RUN npm run build

# Use nginx as the web server to serve the built Preact application
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]