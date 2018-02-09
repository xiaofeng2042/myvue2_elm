# VERSION 0.3
FROM  node

# App
ADD . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  3000
CMD ["node", "/src/build/dev-server.js"]
