###
 # @FilePath: \depoly.sh
 # @Author: xianghaifeng
 # @Date: 2020-04-14 10:40:49
 # @LastEditors: xianghaifeng
 # @LastEditTime: 2020-04-14 17:14:11
 ###
echo 'docker build'
docker image build -t nuxt-temp
echo 'docker run'
docker container run -p 8002:3000 -it nuxt-temp /bin/bash
