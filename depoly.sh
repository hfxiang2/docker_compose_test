###
 # @FilePath: \depoly.sh
 # @Author: xianghaifeng
 # @Date: 2020-04-14 10:40:49
 # @LastEditors: xianghaifeng
 # @LastEditTime: 2020-04-14 17:14:11
 ###
git pull

#下载依赖、打包文件
docker run --rm \
  -v $PWD:/home \
  -w /home \
  node:10 sh -c "yarn && yarn build:nologin"

#删除容器
docker rm -f nuxt-temp &> /dev/null

# 运行容器
docker run -d --restart=on-failure:5 \
    -p 8087:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name nuxt-temp nginx:1.13
