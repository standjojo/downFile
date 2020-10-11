const downFile =  require('./downFile')


let down = downFile.downFile

myDown = new down()

myDown.down({
  url: 'http://152.136.185.210:8000/api/w6/home/data',
  method: 'get',
  params: {
    type: 'new',
    page: 1
  }
}, 'test.json')


