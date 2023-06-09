const rubyCase = require('./rubyCase')

module.exports = function (name, depends = ["dependency"]) {
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
    ohai "Yes, ohai is the real way of sending messages"
  end

  def caveats
    "Return a string of caveats/messages"
  end

  test do
    system "echo", "temp value for formula validation"
  end
end`
}
