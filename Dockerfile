FROM ubuntu:latest 

LABEL maintainer="CSC Service Desk <servicedesk@csc.fi>"

# These need to be owned and writable by the root group in OpenShift
ENV ROOT_GROUP_DIRS='/var/run /var/log/nginx /var/lib/nginx'

COPY . /tmp

WORKDIR /tmp

RUN apt-get -y update &&\
    apt-get -y install nginx &&\
    apt-get -y install software-properties-common &&\
    add-apt-repository universe &&\
    add-apt-repository multiverse &&\
    apt-get -y install build-essential ruby ruby-dev &&\
    gem install jekyll bundler &&\
    gem install minima &&\
    jekyll build -d /usr/share/nginx/html &&\
    apt-get clean 

RUN chgrp -R root ${ROOT_GROUP_DIRS} &&\
    chmod -R g+rwx ${ROOT_GROUP_DIRS}




COPY nginx.conf /etc/nginx

EXPOSE 8000

CMD [ "/usr/sbin/nginx" ]
