The scripts in this folder are used to track downloads of the datasets' GitHub repositories.
The scripts are called on a daily basis by the workflows `track-clones.yml` and `update-dashboard.yml`.

We must define the environment variables `SECRET_TOKEN` and `EMAIL` in the repository secrets.
