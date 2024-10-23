#/bin/bash
RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" --data '{"email": "itziar@gmail.com", "password": "123456"}' http://localhost:3000/login)

TOKEN=$(echo $RESPONSE | jq -r .token)

echo $TOKEN

echo -e "First request"
curl -X POST http://localhost:3000/private

echo -e "Second request"
curl -X POST -H "Authorization: Bearer ${TOKEN}" http://localhost:3000/private
