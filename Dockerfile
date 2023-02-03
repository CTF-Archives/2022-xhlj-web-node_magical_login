FROM node:lts-alpine3.15

WORKDIR /usr/src/app

COPY ./app ./

# 若在大陆内网络环境进行编译，则将下面注释取消
# RUN npm --registry https://registry.npm.taobao.org install

EXPOSE 80

CMD ["./start.sh"]
