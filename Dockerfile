FROM rockylinux:8

LABEL maintainer="fiqci"

# These need to be owned and writable by the root group in OpenShift
ENV ROOT_GROUP_DIRS='/var/run /var/log/nginx /var/lib/nginx'

ARG repo_branch=dev

RUN yum -y install epel-release &&\
    dnf module enable -y nginx:mainline &&\
    yum -y install nginx &&\
    yum -y install git &&\
    yum -y install findutils &&\
    yum -y install ruby ruby-devel &&\
    dnf -y group install "Development Tools" &&\
    yum clean all

RUN chgrp -R root ${ROOT_GROUP_DIRS} &&\
    chmod -R g+rwx ${ROOT_GROUP_DIRS}

COPY . /tmp

WORKDIR /tmp


RUN git clone --no-checkout https://github.com/FiQCI/fiqci.github.io git_folder && \
    mv git_folder/.git . && \
    rm -r git_folder && \
    git reset HEAD --hard && \
    git checkout -f $repo_branch 

RUN gem install jekyll bundler && gem install minima &&\
    jekyll build -d /usr/share/nginx/html

COPY nginx.conf /etc/nginx

EXPOSE 8000

CMD [ "/usr/sbin/nginx" ]
