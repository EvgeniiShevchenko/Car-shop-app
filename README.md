

> Nuxt.js project

## Build Setup (local)

``` bash

# copy .env.example to .env and add your api url
$ cp .env.example .env

# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Build Setup (production)

``` bash

# copy .env.example to .env and add your api url
$ cp .env.example .env

# go to nginx/default.conf and change carsell-front.utest.space to your domain

`docker run -v letsencrypt:/etc/letsencrypt \
-e http_proxy=$http_proxy \
-e domains="carsell-front.utest.space" \
-e email="alexander.k@unitspace.top" \
-p 80:80 -p 443:443 \
--rm pierreprinetti/certbot:latest
`

# run docker
$  docker-compose up --build -d

```
