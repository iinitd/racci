exports.Parser = require('./parser')
exports.db = require('./db')
exports.Search = require('./search')
exports.cutter = require('./cutter')
exports.get = function(name) {
    return require('./db').get(name)
}