require('babel-core/register')

var express = require('express'),
	React = require('react'),
	ReactDOMServer = require('react-dom/server'),
	ReactApp = React.createFactory(require('../components/app.jsx')),
	_ = require('lodash'),
	db = require('./db');

function returnThem(matches){
	return matches;
}

const server = global.server = express();
const port = process.env.PORT || 5000;


server.set('view engine', 'ejs');
server.set('port', port);
server.use(express.static(__dirname + '..frontend/public'))
server.set('views', __dirname);

db.getMatches({TableName: 'frankfurt'}).then(function(res){
	console.log(db.unPackData(res));
});


var reactString = ReactDOMServer.renderToString(ReactApp({message: 'alex'}));

server.get('/', function (req, res) {
	// var matches = db.getAllMatches(returnThem);

	//   db.scan({TableName: 'frankfurt', ProjectionExpression: 'id, seriesId, seqNumber,team1Id, team2Id, seriesType, startTime'}, function(err, data) {
	//     if (err) console.log(err);

	//     var matchArr = db.unPackData(data);

		res.render('index', {app: reactString});
	  // })
});

server.use('/tournament/:id', function (req, res, next) {
	console.log('Request Type:', req.method);
	next();
});

server.get('/tournament/:id', function (req, res, next) {
	console.log('ID:', req.params.id);
	res.render()
});

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});