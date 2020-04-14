###
 # @FilePath: \depoly.sh
 # @Author: xianghaifeng
 # @Date: 2020-04-14 10:40:49
 # @LastEditors: xianghaifeng
 # @LastEditTime: 2020-04-14 11:45:54
 ###
echo Deploy Project
echo git pull
git pull
echo yarn && yarn build
yarn && yarn build:nologin
echo docker-compose down
docker-compose down
echo docker-compose up -d --force-recreate --build
docker-compose up -d --force-recreate --build
echo Deploy Project Finish