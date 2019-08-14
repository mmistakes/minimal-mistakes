
# Verguts lab - website

[![online](https://img.shields.io/website/https/cogcomneurosci.github.io?down_color=red&down_message=offline&up_color=green&up_message=online)](https://img.shields.io/website/https/cogcomneurosci.github.io?down_color=red&down_message=offline&up_color=green&up_message=online)
[![commits](https://img.shields.io/github/last-commit/CogComNeuroSci/CogComNeuroSci.github.io)](https://img.shields.io/github/last-commit/CogComNeuroSci/CogComNeuroSci.github.io)
[![issues](https://img.shields.io/github/issues/CogComNeuroSci/CogComNeuroSci.github.io)](https://img.shields.io/github/issues/CogComNeuroSci/CogComNeuroSci.github.io)

## What is this GitHub page about?   

This GitHub page represents the code to keep the [Verguts lab website](https://cogcomneurosci.github.io/) online.
Mind that _everyone_ is able to contribute to this page.   
How?   
This is explained immediately below.

## Contributing to our website

Sometimes you want to help out, but you don't know where to start.   
Therefore, we write this small tutorial to make sure that you are able to suggest edits while at the same time preventing the site from breaking/crashing.

### Working on your own copy of the website

--- 

**Disclaimer   
We encourage you to work from a branch, as this reduces the chances that something weird happens to the website. Commiting changes from forks protects the master branch by checking compatibility first, while at the same time blocking force pushes (i.e. pushes that might introduce error).**

---

#### Click and play

This guide is for people who prefer working on the GitHub main page.
You don't have to download GitHub Desktop or Git to follow this guide.

- Go to the [GitHub root directory](https://github.com/CogComNeuroSci/CogComNeuroSci.github.io)
- Click on **Fork** in the upper right corner
- Select your own profile (in my case, that would be _phuycke_)
- Go to your newly made fork of the root directory on your own profile
- Make some changes on your personal fork
- Press **commit** in the lower right corner to confirm the changes
- Press **pull request**
- Press **create new pull request**
- Press **create new pull request**
- Write a message and comments
- Assign a **reviewer** to your pull request (right column)
- **Create pull request**
- You did it! :heart_eyes:

---
#### GitHub Desktop

No information available.

- No information available.
    - See [this issue](https://github.com/CogComNeuroSci/CogComNeuroSci.github.io/issues/10) if you are interested in helping us out!
---

#### Git for the first time

This tutorial is for users that aim to use [Git Bash](https://git-scm.com/).
Note that this tutorial allows you to work:
- On the master branch
- On your own personal fork

Actual tutorial:
- Install Git and [make sure that it works properly](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
- Go to a folder on your local computer where you want to store the code from the GitHub repository
- Open Git Bash in this directory
    - Right mouse click > open Git Bash
    - A command window will appear
- Type ```git clone git@github.com:CogComNeuroSci/CogComNeuroSci.github.io.git``` in the command window
    - A folder called 'CogComNeuroSci.github.io' will appear in your local folder
- Go inside this new directory
- Make some changes
- When all changes are done, type ```git add --all``` in the Git Bash console
- Type ```git commit -m "your message"``` in the Git Bash console
- type ```git push origin master``` in the Git Bash console
- You did it! :heart_eyes:

#### Note

If you suspect that changes have occured in the root folder since you started editing your local folder, do the following **before pushing your changes to the root directory**. **Pushing your edits from a branch that was not updated before will lead to data loss, or worse: conflict**.

- Go to the folder where the website code is stored and open Git Bash over there
- Type ```git fetch```
- Type ```git pull```
    - This makes sure that 'upstream' edits are synchronized with your local folder first
    - By doing so, you start from the most updated code
- ```git add --all```
- ```git commit -m "your message"```
- ```git push origin master```
