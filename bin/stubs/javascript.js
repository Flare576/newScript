const UglifyJS = require("uglify-js");
const { readFileSync }= require('fs');
const gitFormula = require('./gitFormula')

module.exports.formula = function (name) {
  return gitFormula(name, ['node'])
}

module.exports.stubs = function (name) {
  return {
    folders: [ 'bin' ],
    files: [{
      fileName: `bin/${name}`,
      exec: true,
      content: mainStub(),
    },{
      fileName: `README.md`,
      content: readmeSetup(name),
    }]
  }
}

function readmeSetup (name) {
  return `# ${name}

Description goes here

## Installation

\`\`\`
  brew install flare576/scripts/${name}
\`\`\`

## Usage`
}

function mainStub () {
  // const options = { mangle: { toplevel: true } }
  const options = {toplevel: true, compress: true,  mangle: true }
  // Since we're reading and not just importing, need absolute path
  const code = readFileSync(`${__dirname}/sideLoad.js`, 'utf-8')
  const content = UglifyJS.minify(code, options).code
  return `#!/bin/sh # START Boilerplate - see https://github.com/Flare576/scripts/tree/main/js
":" //;NODE_PATH=\$(npm -g root) exec node -- "\$0" "\$@"
${content} // END Boilerplate

const version = '0.0.1'
const usage = 'Hello World Stub'
const argv = require('yargs')
  .usage('$0 <isReq> [notReq]', usage, (yargs) => {
    yargs.positional('isReq', { describe: "required because angle" })
    yargs.positional('notReq', { describe: "not required because square" })
  })
  .version(version)
  .alias('version', 'v')
  .alias('help', 'h')
  .option('full', { alias: 'f', description: 'Example', type: 'string' })
.argv;

const {execSync, spawn} = require('child_process');

(async () => {
  console.log('Hello World')
})();

// vim: ft=javascript
`
}

