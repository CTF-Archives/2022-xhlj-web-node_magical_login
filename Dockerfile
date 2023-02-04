FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY ./app ./

# 若在大陆内网络环境进行编译，则使用下面一行
# RUN npm  install
RUN npm --registry https://registry.npm.taobao.org install


EXPOSE 80

ENTRYPOINT [ "/bin/sh" ,"./start.sh"]
