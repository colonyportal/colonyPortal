# !/setup.sh
# Setup your computer to run this project

installYarn()
{
  # install yarn
  sudo apt-get install yarn

  # add to the path
  YARN_DIR=$(yarn global bin)
  export PATH=$PATH:${!YARN_DIR}

  # let the user know we did that, and suggest they
  # do it for not just this shell instance
  echo "WARNING: We've added $YARN_DIR to the PATH, but it's just for this terminal instance."
  echo "Please add it to the global path."
}

installElm()
{
  # install the elm boilerplate app we're using
  sudo yarn global add create-elm-app
}

installDeps()
{
  if hash elm-app 2>/dev/null;
  then
    echo "All dependencies installed. Please read the README.md for next steps."
  elif hash yarn 2>/dev/null;
  then
    installElm
  else
    installYarn
    installElm
  fi
}

main()
{
  #install of our dependencies
  installDeps
}

# execute main
main