const low = require('lowdb')
const db = low(__dirname + '/model.json')
var fs = require("fs");

var wrapper = {
    set: set,
    get: get
}

function set(key, value) {
    db.set(key, value)
        .write()
}

function get(key) {
    return db.get(key).value()
}

module.exports = exports = wrapper