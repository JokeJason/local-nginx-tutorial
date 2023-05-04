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

## Backend + Frontend

In this section, we test frontend container can cross-communicate with backend container.

Steps:
1. Comment out proxy container
2. Remove exposed of both containers, as we they don't need expose their ports to outside environment. We just want to test their cross-communication in the same docker network
   1. port 80 for frontend; 
   2. port 5000 for backend;
3. Run `docker compose build` & `docker compose up`
4. Create a network: `docker network create mynetwork`
5. Add containers into network
   1. `docker network connect mynetwork backend`
   2. `docker network connect mynetwork frontend`
6. Inspect `mynetwork` has containers `docker network inspect mynetwork`
7. Test network:
   1. Enter frontend container: `docker exec -it frontend /bin/sh`
   2. Make a request to backend: `curl http://backend:5000`
   3. Get response `{"version": "1.0.0"}`

# Proxy using nginx

In this section, we test we can reach both frontend and backend from proxy container or computer itself

Steps:
1. Uncomment all container in `docker-compose.yaml`
2. Build container and initiate them via `docker compose up`
3. These container are not in `mynetwork`
4. Enter proxy container via `docker exec -it proxy /bin/sh`
5. From the proxy container, try to reach other containers
   1. Frontend
      1. `curl http://frontend`
      2. `curl http://localhost` to visit port 80
   2. Backend
      1. `curl http://backend:5000`
      2. `curl http://localhost/api`
6. Exit the container; In normal terminal, we can still reach frontend and backend
   1. `curl http://localhost` to visit frontend
   2. `curl http://localhost/api` to visit backend