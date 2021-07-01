const rubyCase = require('rubyCase')

module.exports.formula = function (name) {
  const cased = rubyCase(name)
  return `class ${cased} < Formula
  include Language::Python::Virtualenv

  desc ""
  homepage "https://github.com/Flare576/${name}"
  url "https://files.pythonhosted.org/packages/....."
  sha256 ""
  license "MIT"

  depends_on "python@3.9"

  resource "resource1" do
    url "https://files.pythonhosted.org/packages/....."
    sha256 ""
  end

  def install
    # ENV.deparallelize  # if your formula fails when building in parallel
    virtualenv_install_with_resources
  end

  test do
  end
end`
}

module.exports.stubs = function (name) {
  return {
    folders: [ name ],
    files: [{
      exec: true,
      fileName: `${name}/__main__.`,
      content: mainStub(name),
    },{
      fileName: `${name}/VERSION.`,
      content: "__version__ = '0.0.1'",
    },{
      fileName: `${name}/__init__.`,
      content: '',
    },{
      fileName: 'project.toml',
      content: toml(),
    },{
      fileName: 'setup.cfg',
      content: setup(name),
    }],
  }
}

function setup (name) {
  return `[metadata]
name = ${name}
version = attr: ${name}.__version__
author = Flare576
author_email = flare576@gmail.com
description = Example Description
long_description = file: README.md
long_description_content_type = text/markdown
url = https://github.com/flare576/${name}
project_urls =
    Bug Tracker = https://github.com/flare576/${name}/issues
classifiers =
    Programming Language :: thon :: 3
    License :: OSI Approved :: MIT License
    Operating System :: OS Independent

[options]
packages =
  ${name}
thon_requires = >=3.9
install_requires=
  jq==1.1.3
  yaml==5.4.1

[options.entry_points]
console_scripts =
  ${name} = ${name}.__main__:main`
}

function toml () {
  return `[build-system]
requires = [
    "setuptools>=42",
    "wheel"
]
build-backend = "setuptools.build_meta"
`
}
function mainStub (name) {
  return `#!/usr/local/bin/thon3
from argparse import ArgumentParser
from VERSION import __version__
cmd_main_desc = 'Description of script'

def action (args):
    print('Hello World')

def main ():
    parser = ArgumentParser(prog = '${name}', description = cmd_main_desc)
    parser.add_argument( "--version", "-v", action='version',  version = f'%(prog)s v{__version__}' )
    args = parser.parse_args()
    action(args)

if __name__ == '__main__':
    main()`
}
