var racci = require('../lib')

var search = new racci.Search()

var res1 = search.simple("赵雷", "singer", "commit_count")

console.log(res1)