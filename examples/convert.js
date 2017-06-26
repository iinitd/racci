var racci = require('../lib')
var fs = require('fs')

var docs = {}

var i = 0

fs.readFileSync("./docs/docs.txt")
    .toString('utf-8')
    .split("\n")
    .forEach((doc) => {
        docs[i++] = JSON.parse(doc).result
    })

fs.writeFileSync("./docs/docs.json", JSON.stringify(docs))