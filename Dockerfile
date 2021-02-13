FROM node:lts-alpine

# Create a folder for the bot
WORKDIR /app
COPY package.json .
COPY package-lock.json .

# Install packages
RUN npm ci

# Copy remaining files except files in .dockerignore
COPY . .

# Build the site
RUN npm run build

# Set start command
CMD ["npm", "start"]
