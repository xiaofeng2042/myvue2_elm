# VERSION 0.3
FROM  node

# App
ADD . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  8080
CMD cd /src; npm run start
