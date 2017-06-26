var cutter = require("../cutter");
var db = require('../db')
var _ = require('underscore')


function Search() {

}

function search(prefix, query, flag) {
    var idx = db.get(prefix + '_idx')
    var docs = db.get('_docs')
    var score = db.get(prefix + "_score")
    var query_token = cutter.cut(query)
    var unsorted_results = []
    query_token.forEach((qt) => {
        if (idx[qt]) unsorted_results.push(idx[qt])
    })
    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = _.map(unsorted_results, (ur) => {
            return {
                doc: flag == 0 ? ur : docs[ur],
                score: (_.isString(score[ur]) ? score[ur] : cal_score(ur, query_token, score))
            }
        }).sort((a, b) => b.score - a.score)
        // var results = unsorted_results.sort((ur1, ur2) => {
        //     return cal_score(ur2, query_token) - cal_score(ur1, query_token)
        // })
    return results
}



Search.simple = function(prefix, query) {
    return search(prefix, query, 0)
}

Search.full = function(prefix, query) {
    return search(prefix, query, 1)
}

Search.prototype.cal_score = cal_score

function cal_score(doc_id, query_token, score) {

    var rank = 0
    query_token.forEach((qt) => {
        if (score[doc_id]) {
            rank += score[doc_id][qt] ? qt.length * score[doc_id][qt] : 0
        }

    })
    return rank
}

module.exports = Search