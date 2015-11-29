var CONSTANTS = require('./constants'),
	steamHelpers = require('./helpers/steam');
	_ = require('lodash'),
	Promise = require('bluebird'),
	Request = require('request-promise');

var steamUtils = {
	getMatches: function(tournamentId, lastMatchId){
		var resolver = Promise.defer();
		get();
		function get(prevResult, lastMatchId){
			var reqUrl = CONSTANTS.steam.baseURL + '/GetMatchHistory/V001/?league_id=' + tournamentId + '&key=' 
				+ CONSTANTS.steam.key;
			if (prevResult && lastMatchId !== undefined){
				reqUrl = reqUrl +'&start_at_match_id=' 
				+ lastMatchId.toString();
			}
			Request(reqUrl)
			.then(function(res, err){
				var result = JSON.parse(res).result,
					lastMatchToQuery = steamHelpers.findLastMatch(result);
				if (prevResult){
					result = steamHelpers.combineResults(result, prevResult);
				}
				if (!lastMatchToQuery) {
					resolver.resolve(result);
				} else {
					get(result, lastMatchToQuery);
				}
			});
		};
		return resolver.promise;
	}
};

module.exports = steamUtils;