# Script for manually deploying project

# Frontend
docker login docker.pkg.github.com -u $GIT_USERNAME -p $GIT_TOKEN
docker pull docker.pkg.github.com/dan-lynch/trackportfol.io/client-prod:latest
docker run -dit --name client-prod -p 3000:3000 docker.pkg.github.com/dan-lynch/trackportfol.io/client-prod:latest

# Backend (note: ensure files are decrypted first - run decrypt_protected_files.sh if not)
git fetch --all
git reset --hard origin/master
docker-compose -f docker-compose.backend.yml down
docker-compose -f docker-compose.backend.yml up -d --build
