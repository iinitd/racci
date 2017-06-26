var db = require('../db')

var cutter = require("../cutter");
var _ = require('underscore')
var db = require('../db')

function Parser(prefix, token_field, field_weight, type) {
    this.prefix = prefix || ""
    this.token_field = token_field || ""
    this.field_weight = field_weight || undefined
    this.type = type
}

Parser.prototype.tokenize = function() {
    var prefix = this.prefix
    var type = this.type
    var fields = []
    var weight = {}
    docs = db.get("_docs")
    fields.push(this.token_field)
    fields = _.flatten(fields)
    var weight_ = this.field_weight
    var tokenSet = _.mapObject(docs, (doc, key) => {
        var terms_ = _.flatten(fields.map(function(f) {
            var term_for_f = cutter.cut(doc[f])
            if (type == 0) {
                term_for_f.forEach((tff) => {
                    if (weight_[0] > 1 && tff.length > 1) {
                        if (!weight[key]) weight[key] = {}
                        if (!weight[key][tff]) weight[key][tff] = weight_[0]
                        else weight[key][tff] *= weight_[0]
                    }
                })
                weight_.push(weight_.shift())
            }
            return term_for_f
        }))
        return terms_
    })
    db.set(prefix + "_weight", weight)
    db.set(prefix + "_tokenSet", tokenSet)
}

Parser.prototype.cal_tf = function() {
    var prefix = this.prefix
    var tokenSet = db.get(prefix + '_tokenSet')
    var tf = _.mapObject(tokenSet, (ts, key) => {
        var tf_ = {}
        var factor = 1 / ts.length
        ts.forEach(function(t) {
            if (tf_[t]) tf_[t] += factor
            else {
                tf_[t] = factor
            }
        })
        return tf_
    })
    db.set(prefix + "_tf", tf)
}

Parser.prototype.invertedIndex = function() {
    var prefix = this.prefix
    var tokenSet = db.get(prefix + '_tokenSet')
    var index = {}
    var index_arr = []
    _.mapObject(tokenSet, (doc, key) => {
        doc.forEach(function(term) {
            if (index[term]) index[term].push(key)
            else {
                index[term] = []
                index[term].push(key)
            }
        })
    })
    for (t in index) {
        index[t] = _.uniq(index[t])
    }
    db.set(prefix + "_idx", index)
}

Parser.prototype.cal_idf = function() {
    var prefix = this.prefix
    var docs = db.get("_docs")
    var idx = db.get(prefix + "_idx")
    var idf = {}
    var total = _.allKeys(docs).length
    for (v in idx) {
        idf[v] = Math.log2(total / idx[v].length)
    }
    db.set(prefix + "_idf", idf)
}

Parser.prototype.cal_score = function() {
    var prefix = this.prefix
    var score = {}
    var tf = db.get(prefix + "_tf")
    var idf = db.get(prefix + "_idf")
    var weight = db.get(prefix + "_weight")
    _.mapObject(tf, (item, key) => {

        var obj = {}

        for (i in item) {
            var w = weight[key] ?
                (weight[key][i] ? weight[key][i] : 1) : 1
            obj[i] = item[i] * idf[i] * w
        }
        score[key] = obj
    })

    db.set(prefix + "_score", score)
}


Parser.prototype.field_score = function() {
    var prefix = this.prefix
    var weight = this.field_weight
    var score = {}
    var docs = db.get("_docs")
    _.mapObject(docs, (item, key) => {

        score[key] = item[weight]

    })
    console.log(weight)
    db.set(prefix + "_score", score)
}

Parser.init = function(prefix, fields, field_weight) {
    var type = Array.isArray(field_weight) ? 0 : 1
    var parser = new Parser(prefix, fields, field_weight, type)
    parser.tokenize()
    parser.invertedIndex()
    if (type == 0) {
        parser.cal_idf()
        parser.cal_tf()
        parser.cal_score()
    } else {
        parser.field_score()
    }

}
Parser.import = function(docs) {
    db.set("_docs", docs)
}


module.exports = Parser