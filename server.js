require('babel-core/register');

var express = require('express'),
	React = require('react'),
	ReactDOMServer = require('react-dom/server'),
	_ = require('lodash'),
	db = require('./backend/db');

function returnThem(matches){
	return matches;
}

const server = global.server = express();
const port = process.env.PORT || 5000;

server.set('view engine', 'ejs');
server.set('port', port);
server.use(express.static(__dirname + '/public'));
server.set('views', __dirname);

server.get('/', function (req, res) {
	db.getMatches({TableName: 'frankfurt'})
	.then(function(data){
		var ReactApp = React.createFactory(require('./frontend/scripts/components/app.jsx'));
		var reactString = ReactDOMServer.renderToString(ReactApp({getData:function(){
			return data;
				},
			history: true
			})
		);
		res.render('index', {app: reactString});
	});
});

server.get('/tournament/:name', function(req, res) {
	db.getMatches({TableName: req.params.name})
	.then(function(data){
		var ReactApp = React.createFactory(require('./frontend/scripts/components/app.jsx'));
		var reactString = ReactDOMServer.renderToString(ReactApp({getData:function(){
			return data;
				},
			history: true
			})
		);
		res.render('index', {app: reactString});
	});
});

// server.use('/tournament/:id', function (req, res, next) {
// 	console.log('Request Type:', req.method);
// 	next();
// });

// server.get('/tournament/:id', function (req, res, next) {
// 	console.log('ID:', req.params.id);
// 	res.render()
// });

server.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});