var Promise = require('bluebird'),
	Request = require('request-promise'),
	db = require('../db'),
	steamUtils = require('../steamUtils');

steamUtils.getMatches('3671')
.then(function(res){
	console.log(res);
})
.catch(function(error){
	console.log(error);
});