const axios = require('axios')
const fs = require('fs')

class downFile {
  // 清空日志文件
  clearLog() {
    fs.writeFileSync('./flie/logFile.txt', '')
  }

  // 发送axios请求数据
  down(config, saveName, saveAddress = undefined) {

    // 设置文件保存路径
    let path = saveAddress
    if (!saveAddress) {
      path = findSrc(__dirname)
      if (!fs.readdirSync(path).includes('downFile')) {
        fs.mkdirSync(path + '\\downFile')
      }
      path = path + '\\downFile'
    }

    // 发送请求
    axios({
      url: config.url,
      method: config.method,
      params: config.params
    }).then(res => {
      // 保存文件
      fs.writeFileSync(path + '\\' + saveName, JSON.stringify(res.data))
      console.log('ok');
    }).catch(err => {
      // 抛出异常
      throw err
    })
  }
}

// 获取项目src目录
function findSrc(path) {
  let files = fs.readdirSync(path)
  if (files.includes('src')) {
    return path + '/src'
  }
  return findSrc(path + '\\..\\')
}

function log() {
  console.log('loh');
}


module.exports = {
  downFile
}

export default downFile