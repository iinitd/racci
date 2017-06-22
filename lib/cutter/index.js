var stutter = require("nodejieba");
var Segment = require('segment');

var segment = new Segment();
segment.useDefault();

exports.cut = function(str){
    // var res = []
    // if(str.length<40) res = str.split(/[^\u4e00-\u9fa5]+/)
    // else 
    var res1 = stutter.cutForSearch(str.replace(/[^\u4e00-\u9fa5]/gi, ""))
    var res2 = segment.doSegment(str.replace(/[\u4e00-\u9fa5]/gi, ""), {
        simple: true
    })
    return res1.concat(res2)
}