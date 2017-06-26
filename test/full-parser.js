var racci = require('../lib')
var fs = require('fs')

var docs = JSON.parse(fs.readFileSync("./docs/docs.json"))

var parser = racci.Parser.init(docs, "doc_id", ["lyrics", "singer", "composer", 'songwritter', 'album'], [1, 20, 3, 2, 1])