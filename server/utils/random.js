// randomNum(0,10) 随机0-10的整数 包含 min max

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + 1
}

module.exports = randomNum