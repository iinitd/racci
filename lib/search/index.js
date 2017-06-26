var cutter = require("../cutter");
var db = require('../db')
var _ = require('underscore')


function Search(docs, identifier, field) {
    this.docs = docs || [],
        this.idnetifier = identifier || ""
    this.field = field || ""
}

module.exports = Search


Search.prototype.full = function(query) {
    var idx = db.get('_idx')
    var docs = db.get('_docs')
    var tfidf = db.get("_tfidf")
    var query_token = cutter.cut(query)
    var unsorted_results = []
    query_token.forEach((qt) => {
        if (idx[qt]) unsorted_results.push(idx[qt])
    })
    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = _.map(unsorted_results, (ur) => {

            return {
                doc_id: ur,
                score: cal_score(ur, query_token)
            }

        })
        // var results = unsorted_results.sort((ur1, ur2) => {
        //     return cal_score(ur2, query_token) - cal_score(ur1, query_token)
        // })
    return results
}

Search.prototype.cal_score = cal_score

function cal_score(doc_id, query_token) {
    var score = 0
    var tfidf = db.get("_tfidf")
    query_token.forEach((qt) => {
        console.log(tfidf[doc_id])
        if (tfidf[doc_id]) {
            console.log(tfidf[doc_id])
            score += tfidf[doc_id][qt] ? qt.length * tfidf[doc_id][qt] : 0
        }

    })
    return score
}

Search.prototype.simple = function(query, field, sorter) {

    var query_token = cutter.cut(query)

    var docs = db.get("_docs")

    var field_idx = db.get(field + "_idx")

    var unsorted_results = []

    query_token.forEach((qt) => {
        if (field_idx[qt]) unsorted_results.push(field_idx[qt])
    })

    // return _.uniq(_.flatten(results)).sort((a, b) => {
    //     return docs[b][sorter] - docs[a][sorter]
    // }).map((r) => {
    //     return docs[r]
    // })

    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = _.map(unsorted_results, (ur) => {

        return {
            doc_id: ur,
            score: docs[ur][sorter]
        }

    })
    return results
}