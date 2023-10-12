
FROM node:18
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY ./package*.json ./

# Install project dependencies
RUN npm install

# Copy the backend source code into the container
COPY . .

# Build TypeScript source code
RUN npm run build

# Expose the port your application will run on
EXPOSE 3002

# Define the command to start your application
CMD ["npm", "start"]