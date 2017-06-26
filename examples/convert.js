var racci = require('../lib')
var fs = require('fs')

var docs = {}

var i = 0

fs.readFileSync("./docs/docs.txt")
    .toString('utf-8')
    .split("\n")
    .forEach((doc) => {
        var obj = JSON.parse(doc).result
        obj.doc_id = i
        docs[i++] = obj
    })

fs.writeFileSync("./docs/docs.json", JSON.stringify(docs))