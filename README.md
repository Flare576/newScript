# newScript
Quickly setup framework for new JS, PY, or SH script and associated brew formula

# How To

1. Create a new GitHub repo for your script (e.g., "world-peace")
1. Clone the repo
1. `cd` into the repo
1. Run `new script -l py "world-peace"`
1. Move your new `.rb` file to your `homebrew-scripts` project's **Formula** folder
1. Write your new script. I'll wait.....
1. Push it up to GitHub, create a new release, get the `tar`'s URL
1. Put the URL into the `.rb` file
1. do `brew install --build-from-source ./worldPeace.rb`
1. Copy the Sha256 hash into the `.rb` file
1. Push up the recipe

Also, fill in the other fields, and the readme, and whatever else; you'll figure it out.

# dev notes

Testing a new version? try this, updating the version as necessary
```
pushd ~/Projects/Personal/newScript;tar czvf dist/newScript.tar.gz --exclude={dist,.git} .;
cp dist/newScript.tar.gz $HOME/Library/Caches/Homebrew/newScript--0.0.3.tar.gz;popd;
brew reinstall --build-from-source ./Formula/newScript.rb
