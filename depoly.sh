###
 # @FilePath: \depoly.sh
 # @Author: xianghaifeng
 # @Date: 2020-04-14 10:40:49
 # @LastEditors: xianghaifeng
 # @LastEditTime: 2020-04-14 17:04:31
 ###
echo ************************************
echo Deploy Project
echo ************************************
echo git pull
git pull
echo ************************************
echo yarn && yarn build
yarn && yarn build:nologin
echo ************************************
echo stop && rm container
echo ************************************
docker stop vue-docker
docker rm vue-docker
echo ************************************
echo docker-build
echo ************************************
docker build -t vue-docker .
echo ************************************
docker run -p 8888:80 -d vue-docker
echo Deploy Project Finish