# We assume the "context" is the root of the repo

# Use the starting template for node v8
FROM node:8

# Set and create our tool's directory
ENV toolDir /usr/src/ipfs-auto-deploy/
RUN mkdir -p /usr/src/ipfs-auto-deploy/

# Set and create our app's directory
ENV appDir /usr/src/ipfs-auto-deploy/app/
RUN mkdir -p /usr/src/ipfs-auto-deploy/app/
RUN mkdir -p /usr/src/ipfs-auto-deploy/app/dist/

# Add the tool's source
WORKDIR ${toolDir}
ADD ./tools/ipfs-auto-deploy ${toolDir}

# Install the tool's packages
RUN npm install

# Add the app's source
WORKDIR ${appDir}
ADD ./dapp ${appDir}

# Install the app's packages
RUN npm install

# Build the app
RUN npm run-script build

# Start the tool, which will build and deploy our dapp
WORKDIR ${toolDir}
EXPOSE 8888
EXPOSE 4001
CMD npm start
