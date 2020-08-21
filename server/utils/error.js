// 处理async await 的工具、 
// 用法:
//  const [err, data] = await awaitResult(Model.findById(id))
// if(err){
//  res.status(422).send('错误') 
//  return;
// }
//  res.status(200).send('ok')
// 

function awaitResult(promise) {
  return promise.then(data => [null, data]).catch(err => [err, null])
}

module.exports = awaitResult