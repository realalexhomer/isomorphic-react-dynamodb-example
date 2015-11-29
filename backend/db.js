var AWS = require('aws-sdk'),
    _ = require('lodash'),
  	Promise = require('bluebird'),
    Constants = require('./helpers/constants');

var db = new AWS.DynamoDB({
  	// endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    endpoint: "http://localhost:8000", 
  	region: 'us-east-1'
});

db.scan = Promise.promisify(db.scan);



db.getMatches = function(params){
  params = params || {};
  if (!params.ProjectionExpression){
    params.ProjectionExpression = Constants.AllTableParams;
  }
  return db.scan(params);
}

db.getAllMatches = function(cb) {
  db.scan({TableName: 'frankfurt', ProjectionExpression: 'id, seriesId, seqNumber,team1Id, team2Id, seriesType, startTime'}, function(err, res) {
    if (err) console.log(err);
    cb(res)
  })
}

db.unPackData = function(data){
  var arr = [];
  _.forEach(data.Items, function(value, key){
      _.forEach(value, function(innerValue, innerKey){
        var innerKeyKey = Object.keys(innerValue)[0];
        if (innerKeyKey === 'N' || innerKeyKey === 'S'){
          data.Items[key][innerKey] = data.Items[key][innerKey][innerKeyKey];
        }
      });
      arr.push(data.Items[key]);
  })
  return arr;

}




// Promise.promisifyAll(Object.getPrototypeOf(db));

module.exports = db;