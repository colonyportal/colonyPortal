* container that can be deployed to a server (IPFS, git, script that can be run upon deployment [executes the config])
* configuration that defines (repository + branch to hook to, script to run upon new commit)
* script that pulls the latest, runs

steps:
1. Have this docker container automatically build and deploy upon changing in master.
2. Have server setup in azure that stays up to date with the container in the repo.
3. When container starts up, it pulls the repo, and listens to the repo's hooks.4. Upon init & upon commit, the container executes a script that (pulls & builds & deploys) 

future:
* investigate private repos?

