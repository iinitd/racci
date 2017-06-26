var racci = require('../lib')
var fs = require('fs')

racci.Parser.simple("singer", "doc_id", ["singer", "composer"])

console.log(racci.get("singer_idx"))

//Parser.field_idx("composer","large_docs","doc_id",["composer"],"commit_count")
//Parser.field_idx("writer","large_docs","doc_id",["songwritter"],"commit_count")