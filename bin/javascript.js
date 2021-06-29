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
    }]
  }
}

function mainStub () {
  // const options = { mangle: { toplevel: true } }
  const options = {toplevel: true, compress: true,  mangle: true }
  const code = readFileSync(`${__dirname}/../resources/sideLoad.js`, 'utf-8')
  const content = UglifyJS.minify(code, options).code
  return `#!/bin/sh # START Boilerplate - see https://github.com/Flare576/scripts/tree/main/js
":" //;NODE_PATH=\$(npm -g root) exec node -- "\$0" "\$@"
${content} // END Boilerplate

const version = '0.0.1'
const usage = 'Hello World Stub'
const argv = require('yargs')
  .command("* [posOne]")
  .version(version)
  .alias('version', 'v')
  .alias('help', 'h')
  .usage(usage)
  .option('full', { alias: 'f', description: 'Example', type: 'string' })
.argv;

const {execSync, spawn} = require('child_process');

(async () => {
  console.log('Hello World')
})();

// vim: ft=javascript
`
}

