# Github homepage

Chris' personal homepage

## Docker

### Build

Build the image via

```sh
cd .docker
docker-compose build website
```

Adding a new site might require a new build via 

### Local homepage

Spawn local homepage with

```sh
cd .docker
docker-compose run website
```

and go to http://0.0.0.0:4000 to show the website locally

