###
 # @FilePath: \depoly.sh
 # @Author: xianghaifeng
 # @Date: 2020-04-14 10:40:49
 # @LastEditors: xianghaifeng
 # @LastEditTime: 2020-04-14 17:14:11
 ###
echo Deploy Project
echo git pull
git pull
echo yarn && yarn build
yarn && yarn build:nologin
echo stop && rm container
docker stop vue-docker
docker rm vue-docker
echo docker-build
docker build -t vue-docker .
docker run -p 8081:80 -d vue-docker
echo Deploy Project Finish