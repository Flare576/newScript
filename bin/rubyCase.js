module.exports = function (str) {
  return str
    .charAt(0).toUpperCase() +
    str.slice(1)
    .replace(/(\_\w)/g, (k) => k[1].toUpperCase())
}
