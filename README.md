When we work or a feature or a bug we will start creating new branches for them

`git flow feature start F-1000` (a branch feature/F-1000 will be created based on develop)
`git flow bugfix start B-1000` (a branch bugfix/B-1000 will be created based on develop)


- `git branch` will tell you on which branch are you on
Always work on feature or bugfix branches
Commit to your feature or bugfix branch everyday (we do not know when our computer stops working it's better to push our code frequently to our branch)

Example I am working on a feature F-1000
`git add -A` to stage modified files
`git commit -m "F-1000 this is a new feature"` to commit changes to branch (comments must be sensible)`
`git push origin feature/FP-1000` to push changes to server


Once your are done with implementing your code for feature or bugfix
- Go to `https://github.com/MySchoolManager/webui` and create a PULL REQUEST
- Base branch must be `develop` compare branch must be `feature/F-1000` your feature branch or bugfix branch.
- Add relevant commnets to help the reviewer to review your code
- Never merge your own pull request let other do it.

Once we feel we can merge our branch to master we will merge develop to master