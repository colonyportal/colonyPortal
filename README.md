# GithubColony

## Goal:
Build a dApp frontend that connects a Github organization and a Colony

## What is a Colony
[Colony](https://colony.io/) is a platform for open organizations. A Colony is a set of smart contracts on the Ethereum blockchain.

## Setup
  `# Give the setup.sh script execute permissions`  
  *`chmod +x ./setup.sh`*  
  `# Run the setup.sh script. This will install all dependencies.`  
  *`./setup.sh`*  

## Starting The dApp  
  *`cd ./dApp`*  
  *`elm-app start`*  

## Building For Production  
  *`elm-app build`*  

This project is using the `create-elm-app` boilerplate. More information can be found here in `./dApp/README.md` and on the repo https://github.com/halfzebra/create-elm-app.

## TODO  
more steps will be needed once we start using colony & when we're ready to deploy to IPFS.