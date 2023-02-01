# Github homepage

![update-resume](https://github.com/cschindlbeck/cschindlbeck.github.io/actions/workflows/update-resume.yml/badge.svg)
![update-about](https://github.com/cschindlbeck/cschindlbeck.github.io/actions/workflows/update-about.yml/badge.svg)

Chris' personal homepage, visit [here](https://cschindlbeck.github.io/). 

## Docker

### Build

Build the image via

```sh
cd .docker
docker compose build
```

### Local homepage

Spawn local homepage with

```sh
cd .docker
docker compose up --detach
```

and go to http://0.0.0.0:4000 to show the website locally
