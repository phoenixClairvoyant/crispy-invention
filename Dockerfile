FROM node:16-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 80
# Start the app
CMD [ "npm", "start" ]