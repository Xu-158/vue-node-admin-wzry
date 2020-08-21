// api 返回 json 数据处理
function response(res, statusCode, msg, data = {}, token) {
  if (token) {
    res.json({ statusCode, msg, token, data })
  } else {
    res.json({ statusCode, msg, data })
  }
}

module.exports = response