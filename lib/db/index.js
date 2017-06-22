const low = require('lowdb')
const db = low(__dirname + '/model.json')
var fs = require("fs");

var wrapper = {
    set: set,
    get: get,
    state: db.getState()
}

function set(key, value) {
    var str = "{\"" + key + "\":" + JSON.stringify(value) + "}"
    db.defaults(JSON.parse(str))
        .write()
}

function get(key) {
    return db.get(key).value()
}

// function set(key,value){
//     obj[key] = value
// }

// function get(key){
//     return obj[key]
// }

module.exports = exports = wrapper