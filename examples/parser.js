var racci = require('../lib')
var fs = require('fs')

var docs = JSON.parse(fs.readFileSync("./docs/docs.json"))

racci.Parser.import(docs)

racci.Parser.init("full", ["lyrics", "singer", "composer", 'songwritter', 'album'], [1, 20, 3, 2, 1])

racci.Parser.init("singer", "singer", "commit_count")

racci.Parser.init("composer", "composer", "commit_count")

racci.Parser.init("cs", ["singer", "composer"], "commit_count")