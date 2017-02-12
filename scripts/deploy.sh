#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="develop"
TARGET_BRANCH="master"


# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

echo "Starting to update master\n"

#copy data we're interested in to other place
cp -R --verbose _site $HOME/_site

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing master for this repo into out/
# Create a new empty branch if master doesn't exist yet (should only happen on first deply)
echo "cloning\n"
# Now let's go have some fun with the cloned repo
git clone --verbose $REPO $HOME/out
cd $HOME/out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..
# Clean out existing contents
echo "deleting\n"
rm --verbose -rf $HOME/out/**/* || exit
#go into directory and copy data we're interested in to that directory

cd $HOME/out
cp --verbose -Rf $HOME/_site/* .



git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
#if git diff --quiet; then
#    echo "No changes to the output on this push; exiting."
#    exit 0
#fi


# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
echo "adding\n"
git add --verbose -A .
echo "commit\n"
git commit   --verbose -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in /home/travis/build/jluccisano/jluccisano.github.io/deploy_key.enc -out /home/travis/build/jluccisano/jluccisano.github.io/deploy_key -d
chmod 600 /home/travis/build/jluccisano/jluccisano.github.io/deploy_key
eval `ssh-agent -s`
ssh-add /home/travis/build/jluccisano/jluccisano.github.io/deploy_key
#pwd

# Now that we're all set up, we can push.
echo "pushing\n"
git push --verbose $SSH_REPO $TARGET_BRANCH
