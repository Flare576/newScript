const gitFormula = require('./gitFormula.js')

module.exports.formula = gitFormula
module.exports.stubs = function (name) {
  return {
    folders: [ 'bin' ],
    files: [{
      fileName: 'README.md',
      content: `# ${name}

Description goes here

## Installation

${name} is a bash script, so putting it anywhere in your $PATH is all you really need to do!

You can also do \`brew install flare576/scripts/${name}\`

## Setup`,
    },{
      fileName: `bin/${name}`,
      exec: true,
      content: `#!/bin/sh
version=0.0.1
usage="$(basename "$0") [-hvegw] [<name>]
Basic Description

-h[elp]       Prints this message, then exits
-v[ersion]    Prints this version info, then exits
-e[xit]       Prints message then exits
-g[reeting]   Defaults to 'Hello World', takes string
-w[elcome]    Will add welcome message
<name>        Name to stick on end of welcome
"

while getopts ':hvg:ews' option; do
  case "$option" in
    h) echo "$usage"
      exit
      ;;
    v) echo "version $version"
      exit
      ;;
    e) echo 'e iz for exit'
      exit
      ;;
    g) greeting="$OPTARG"
      ;;
    s) echo "you found the easter egg"
      ;;
    w) welcome="true"
      ;;
    *) echo "Unknown Option '$OPTARG', exiting"
      exit
      ;;
  esac
done
shift $((OPTIND -1))

if [ -n "$1" ]; then
  NAME=", $1"
fi

: \${greeting:=Hello World}
echo "$greeting"
if [ "$welcome" == "true" ] || [ -n "$NAME" ]; then
  echo "Welcome to the new script$NAME"
fi`
    }]
  }
}
