var racci = require('../lib')

// var res0 = racci.Search.simple("full", "流星雨")

// console.log(res0)

// var name = "金泽"

// var res1 = racci.Search.simple("singer", name)

// console.log(res1)

// var res2 = racci.Search.simple("composer", name)

// console.log(res2)

// var res3 = racci.Search.full("cs", name)

// console.log(res3[0])

var res4 = racci.Search.do("full", "周杰伦", 1, 0)

console.log(res4[0])