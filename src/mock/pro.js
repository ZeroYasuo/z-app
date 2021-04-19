import Mock from 'mockjs'

const prolist =  Mock.mock({
  "data|10":[{
    "proid|+1":100,
    "proname":'@cparagraph(1,3)',
    "proimg":"@img('200*200','@color','#fff','@cname')",
    "price|1-1000.2":0
  }]
})
const seckilllist =  Mock.mock({
  "data|6":[{
    "proid|+1":100,
    "proname":'@cparagraph(1,3)',
    "proimg":"@img('200*200','@color','#fff','@cname')",
    "price|1-1000.2":0
  }]
})
export {prolist,seckilllist}