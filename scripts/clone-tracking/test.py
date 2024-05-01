"""Test the workflow."""

import argparse
import os

from github import Github


def main():
    args = parse_args()
    # owner_name, repo_name = args.repo.split("/")
    token = os.environ.get("SECRET_TOKEN")
    g = Github(token)
    repo = g.get_repo(args.repo)

    clones = repo.get_clones_traffic()

    print(clones["clones"])


def parse_args():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "repo",
        metavar="REPOSITORY",
        help="Owner and repository. Must contain a slash. Example: owner/repository",
    )

    args = parser.parse_args()
    return args


if __name__ == "__main__":
    main()
