module.exports = function (str) {
  return str
    .charAt(0).toUpperCase() +
    str.slice(1).toLowerCase()
    .replace(/(\_\w)/g, (k) => k[1]))
}
