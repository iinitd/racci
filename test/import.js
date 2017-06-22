var seagull = require('../lib')
var fs = require('fs')

var docs = fs.readFileSync("./docs/docs.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        var obj = JSON.parse(doc).result
        obj.doc_id = pos
        return obj
    })

console.log(docs[0])

fs.writeFileSync("./docs/docs.json", JSON.stringify(docs))