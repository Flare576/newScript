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
      fileName: `bin/${name}`,
      exec: true,
      content: `#/bin/sh
version=11.0.0
usage="$(basename "$0") [-letrs] [targets]
Basic Description"

while getopts ':hletr:s' option; do
  case "$option" in
    h) echo "$usage"
      exit
      ;;
    l) letterL="true"
      ;;
    e) echo 'e iz for exit'
      exit
      ;;
    t) letterE="true"
      exit
      ;;
    r) letterT="$OPTARG"
      ;;
    l) logToFile="true"
      ;;
    r) echo "you found the easter egg"
      ;;
  esac
done
shift $((OPTIND -1))

echo "Hello World"`
    }]
  }
}