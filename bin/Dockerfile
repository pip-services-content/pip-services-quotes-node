#Base image from Docker hub
FROM node:0.12.7

#Create work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Copy files to work directory
COPY ./bin /usr/src/app/bin
COPY ./config /usr/src/app/config
COPY ./data /usr/src/app/data
RUN mkdir -p /usr/src/app/logs

#Add/link binary files to avoid copying
ADD ./lib /usr/src/app/lib
ADD ./node_modules /usr/src/app/node_modules

#Give execution privilegies to Start/Stop command files
#RUN chmod +x /usr/src/app/bin/start
#RUN chmod +x /usr/src/app/bin/stop
RUN chmod +x /usr/src/app/bin/run

#Expose
EXPOSE  80002

#Define entry point
ENTRYPOINT [ "bin/run" ]

#Run service
#CMD [ "bin/start" ]