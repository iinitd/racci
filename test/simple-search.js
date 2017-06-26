var seagull = require('../lib')

var search = new seagull.Search()

var res1 = search.simple("赵雷", "singer", "commit_count")

console.log(res1)