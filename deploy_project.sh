# Script for manually deploying project
# Ensure .env file populated and schema decrypted

cd trackportfol.io

git fetch --all

git reset --hard origin/master

docker-compose -f docker-compose.client.prod.yml down

docker-compose -f docker-compose.client.prod.yml up -d --build

docker-compose -f docker-compose.backend.yml down

docker-compose -f docker-compose.backend.yml up -d --build