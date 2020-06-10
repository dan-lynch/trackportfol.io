# Script for manually deploying project

# Frontend
docker login docker.pkg.github.com -u $GIT_USERNAME -p $GIT_TOKEN
docker pull docker.pkg.github.com/dan-lynch/trackportfol.io/client-prod:latest
docker run -dit --name client-prod -p 1337:1337 docker.pkg.github.com/dan-lynch/trackportfol.io/client-prod:latest

# Backend (note: ensure .env file populated and schema decrypted)
git fetch --all
git reset --hard origin/master
docker-compose -f docker-compose.backend.yml down
docker-compose -f docker-compose.backend.yml up -d --build
