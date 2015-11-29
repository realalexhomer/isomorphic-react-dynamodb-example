var CONSTANTS = require('.././constants'),
	_ = require('lodash');

steamHelpers = {
	findLastMatch: function(result){
		if (result.results_remaining > 0) {
		    var lastMatch = result.matches[(_.findLastKey(result.matches, 'match_id'))];
		    return lastMatch.match_id;
		} else {
			return false;
		}
	},
	combineResults: function (newResult, oldResult){
	    var obj1 = oldResult.matches,
	    	obj2 = newResult.matches,
	    	oldResultLength = Object.keys(oldResult.matches).length;
	    _.forEach(newResult.matches, function(value, key){
	        oldResult.matches[key + oldResultLength] = value;
	    })
	    newResult.matches = oldResult.matches;
	    return newResult;
	}
}

module.exports = steamHelpers;