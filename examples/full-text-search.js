var racci = require('../lib')
var fs = require('fs')

// 1. import
var docs = JSON.parse(fs.readFileSync("./docs/docs.json"))
racci.Parser.import(docs)

// 2. build model (once and for all)

racci.Parser.init("full", ["lyrics", "singer", "composer", 'songwritter', 'album'], [1, 20, 3, 2, 1])

// 3. search!

var r1 = racci.Search.search("full", "周杰伦", 1, 0)

var r2 = racci.Search.search("full", "方文山", 0, 1)

console.log(r1[0])

console.log(r2[0])