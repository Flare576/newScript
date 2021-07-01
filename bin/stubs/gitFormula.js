const rubyCase = require('./rubyCase')

module.exports = function (name, depends) {
  const cased = rubyCase(name)
  const dep_list = depends ? [ '', ...depends.map(d=>`  depends_on "${d}"`), '' ].join('\n') : ''

  return `class ${cased} < Formula
  desc ""
  homepage "https://github.com/Flare576/${name}"
  url ""
  sha256 ""
  license "MIT"
${dep_list}
  def install
    bin.install "bin/${name}"
  end

  test do
    system "echo", "temp value for formula validation"
  end
end`
}
