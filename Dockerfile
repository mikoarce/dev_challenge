FROM node:alpine

# Install git so webpack can include commit hash as a build identifier
RUN apk update && apk add git

# Create non-root user
RUN addgroup -S app && adduser -S -g app app

# Give ownership of app directory to app user
WORKDIR /app
RUN chown -R app:app .
USER app

# Install dependencies and add project files
COPY package*.json ./
RUN npm install
COPY . .

# Start server
CMD npm run client_dev
EXPOSE 8080

