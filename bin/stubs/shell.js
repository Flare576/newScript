const gitFormula = require('./gitFormula.js')
/*
module.exports.formula = function (name) {
  return gitFormula(name, ['node'])
}
*/
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
usage="$(basename "$0") [-letrs] [targets]
Basic Description"

while getopts ':vhletr:s' option; do
  case "$option" in
    h) echo "$usage"
      exit
      ;;
    l) letterL="true"
      ;;
    e) echo 'e iz for exit'
      exit
      ;;
    t) letterT="true"
      exit
      ;;
    r) letterR="$OPTARG"
      ;;
    l) logToFile="true"
      ;;
    r) echo "you found the easter egg"
      ;;
    v) echo "version $version"
      exit
      ;;
  esac
done
shift $((OPTIND -1))

echo "Hello World"`
    }]
  }
}
