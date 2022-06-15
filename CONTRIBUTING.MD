# Contributing

This document describes the workflow in Github as well as instructions for previewing and deploying the documentation.

## For the impatient

Once you've completed the steps above:
* In [https://fiqci.fi/](https://fiqci.fi/) go the the page you want to edit and scroll down to the bottom. Above the footer there should be a "Edit this page" button.
* (sign in GitHub) and edit then content
* Scroll down to commit changes (create a new branch) -> make a pull request
* Assign a reviewer

## Making changes

The fqci/dev repository uses the 'master' as the default
branch. You can make changes in web gui, command line or desktop application.

The fqci.github.io Master branch is protected. You cannot make changes to it directly, but you
must use pull requests.

**Note:** If you make bigger changes to the (main) categories / menu on the left, it might effect some links used on our webpages. Please communicate these changes to us. You can use either Github issues https://github.com/FiQCI/dev/issues or send us a message on chat.csc.fi.

### Adding a new post or publication

New posts or publications can be added directly into the `_posts` or `_publications` folders as either html or markdown. These will automatically be shown in the main publications page. Please see below for a style guide and tips. 

### Making pull requests in the web GUI

In the master branch, navigate to the page you want to edit, click the pen-logo at the top right and once ready, at the bottom choose "Create new branch from this commit and start a pull request". Note, that you can give the branch a descriptive name at this point. If you wish to edit already existing branch, first change to the correct branch in the "branch" button on upper left, next to the path to the file. If you found an error in the pull request of your own branch, you can commit to it directly instead of creating another pull request (the two choices at the bottom).

### Making pull requests on the command line

Overview:

 - Update local repository
 - Make a new branch from the master branch
 - Work and commit in your new branch
 - Push changes to github
 - Make a pull request to merge changes from your new branch into the develop branch
 - Ask a person to review and merge the changes

 To get a copy of the repository, you need a clone it. Make sure you clone the **dev** repository.

 ```bash
 git clone https://github.com/FiQCI/dev
 ```
 or (recommended) if you have ssh keys set up. 

 ```bash
 git clone git@github.com:FiQCI/dev.git
 ```

 All other Git commands are given inside the directory that you have
 cloned.

 ```bash
 cd dev
 ```

When you have cloned the repository, master branch is what you
see. If you are unsure which branch you are in, you can run `git branch`. The active branch can be changed with the `git checkout`
command.

Method:

```bash
git pull
git checkout master # switch to master branch
git checkout -b your_branch_name # create a new (temporary) branch and switch to it
# create some nice content, add files
git add example-file.md
git status # check the status
git commit -v
git push origin your_branch_name
```

Now you can ask a person to review and merge the changes. One can request
reviewers in the Github web interface.

After the PR has been merged, the branch on github can be deleted.

Tip 1. Git uses [Vim](https://www.vim.org) as the default editor for commit
messages. It is possible to change the default editor, but below are
the most important commands if you do not want to do it right now.

```
i    Enter insert mode
Esc  Exit insert mode
:wq  Save and exit
```

Tip 2. See instructions on [how to write a good Git commit
message](https://chris.beams.io/posts/git-commit/).

Tip 3. If pushing fails, the most probable reason is that somebody
else has made edits while you were editing. This situation is called a
conflict. (To be written: [How to resolve conflicts?](https://www.simplilearn.com/tutorials/git-tutorial/merge-conflicts-in-git)) 

### Making pull requests in the desktop application

[GitHub Desktop](https://desktop.github.com/) offers the third way to work
with the repository.

To clone the repository, do the following:
1. Click _Current repository_
1. Click _Add_ and select _Clone repository..._
1. Find `FiQI/dev` and click _Clone_

Pull requests can be created as follows:
1. Click _Pull origin_
1. Click _Current branch_ then _New branch_
1. Type the name of the new branch and click _Create branch_
1. Edit the files locally and commit the changes
1. Finally click _Publish branch_ and _Create Pull Request_
1. You are directed to web gui, where you click _Create pull request_

## Previewing the website using MkDocs

This user guide uses [Jekyll](http://jekyllrb.com/) with the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) theme to generate documentation
pages. For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

Building the website locally requires `ruby` and `jekyll`. Ruby is installed on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/).

You can start a preview web server from the command line while in the
root of the project directory.

Using the default configuration files: 

1. Run `bundle clean` to clean up the directory
2. `bundle install` installs the necessary packages such as `jekyll` etc.
3. `bundle exec jekyll serve`

If you get errors try deleting `Gemfile.lock`. 

This will start a web server on your computer listening on port
4000. Point your web server to [localhost:4000](http://localhost:4000)
to get a preview of the documentation.


### Using Docker

Ruby and it's different versions and environments can cause problems. A simple solution is to use Docker and install ruby inside it's own container. A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file given. 
