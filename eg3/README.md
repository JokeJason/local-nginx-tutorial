# e.g. 3: Create an Ningx Reverse Proxy With Docker

[How To Run Multiple Docker Containers Under One URL](https://codingwithmanny.medium.com/create-an-nginx-reverse-proxy-with-docker-a1c0aa9078f1)

## Backend only

How to test it:
1. Comment all other containers
2. Run `docker compose build` & `docker compose up`
3. Test by `curl localhost:5000`, should return `{"version":"1.0.0"}`

## Frontend only

How to test it:
1. Comment all other containers
2. Run `docker compose build` & `docker compose up`
3. Test by `curl localhost`, should return a html file (as `/eg3/frontend/index.html`)