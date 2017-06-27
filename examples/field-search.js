var racci = require('../lib')
var fs = require('fs')

// 1. import
var docs = JSON.parse(fs.readFileSync("./docs/docs.json"))
racci.Parser.import(docs)

// 2. build model (once and for all)

racci.Parser.init("singer", "singer", "commit_count")

// 3. search!

var r1 = racci.Search.search("singer", "HUSH", 1, 0)

console.log(r1[0])