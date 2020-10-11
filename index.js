const axios = require('axios')
const fs = require('fs')

// 清空日志文件
fs.writeFileSync('./flie/logFile.txt', '')

function request(type, page) {
  axios({
    url: 'http://152.136.185.210:8000/api/w6/home/data',
    method: 'get',
    params: {
      type,
      page
    }
  }).then(res => {
    let list = res.data.data.list
    let allIid = []
    for (let i in list) {
      allIid.push(list[i].iid)
    }
    for (let i in allIid) {
      requestDetail(allIid[i])
    }
  })
}

let count = 1

function requestDetail(iid) {
  axios({
    url: 'http://152.136.185.210:8000/api/w6/detail',
    method: 'get',
    params: {
      iid
    }
  }).then(res => {
    fs.writeFileSync(`./flie/details/${res.data.iid}.json`, JSON.stringify(res.data))
    let file = fs.readFileSync('./flie/logFile.txt').toString()
    if (file.indexOf(iid) == -1) {
      let message = iid + '保存成功'
      fs.writeFileSync('./flie/logFile.txt', message + '\n', {'flag': 'a'})
    }
    console.log(count++);
  }).catch(err => {
    let message = iid + '保存失败'
    fs.writeFileSync('./flie/logFile.txt', message, {'flag': 'a'})
    console.log('err');
  })
}



function main(type) {
  let timer = 8
  for (let i = 1; i <= timer; i++) {
    request(type, i)
  }
}

main('new')
